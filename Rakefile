require 'erb'

desc 'Install dotcss'
task :install => 'install:all'

DAEMON_INSTALL_DIR = '/usr/local/bin'

is_linux = true if RUBY_PLATFORM.downcase =~ /linux/
is_sudo  = true if ENV['SUDO_USER']

namespace :install do
  task :all => [:prompt, :daemon, :create_dir, :autostart, :chrome, :done]

  task :prompt do
    puts ''
    puts '  dotcss'
    puts '  ------'
    puts "  With your permission, I'll install:"
    puts "    1. The dcssd daemon in #{DAEMON_INSTALL_DIR}"
    if is_linux
      puts "    2. dotcss.desktop in ~/.config/autostart"
    else
      puts "    2. ca.stwrt.dotcss.plist in ~/Library/LaunchAgents"
    end
    puts ''
    puts '  Ok? (y|n)'

    begin
      until %w( k ok y yes n no ).include?(answer = $stdin.gets.chomp.downcase)
        puts '  Please type y/yes or n/no.'
        puts '  Install dotcss? (y|n)'
      end
    rescue Interrupt
      exit 1
    end

    exit 1 if answer =~ /n/
  end

  task :done do
    puts ''
    if system 'curl http://localhost:1243 &> /dev/null'
      puts '  dotcss installation worked!'
      puts '  Drop files like github.com.css in ~/.css and have fun tweaking the web!'
    else
      puts '  dotcss installation failed!'
      puts '  Check Console.app or open an issue on GitHub'
    end
  end

  desc 'Install launch agent'
  task :autostart do
    if is_linux
      autorun_script = 'dotcss.desktop'
      install_dir = File.expand_path('~/.config/autostart')
      launcher = File.join(install_dir, autorun_script)
    else
      autorun_script = 'ca.stwrt.dotcss.plist'
      install_dir = File.expand_path('~/Library/LaunchAgents')
    end

    launcher = File.join(install_dir, autorun_script)

    File.open(launcher, 'w') do |file|
      file.puts ERB.new(IO.read(autorun_script)).result(binding)
    end

    if is_linux && is_sudo
      system "chown #{ENV['SUDO_USER']}:#{ENV['SUDO_USER']} #{launcher}"
    end

    puts '  starting dcssd...'

    if is_linux
      command = "exo-open #{launcher} > /dev/null 2> /dev/null &"
    else
      command = "launchctl load -w #{launcher}"
    end

    system command

    # wait for server to get started
    sleep 5
  end

  desc 'Install dotcss daemon'
  task :daemon => :install_dir_writeable do
    cp 'bin/dcssd', DAEMON_INSTALL_DIR, :verbose => true, :preserve => true
  end

  desc 'Create ~/.css'
  task :create_dir do
    if !File.directory? css_dir = File.join(ENV['HOME'], '.css')
      mkdir css_dir
      chmod 0755, css_dir
    end
  end

  desc 'Install Chrome/Chromium extension'
  task :chrome do
    puts "  Now you need to install the dotcss extension for Chrome."
    puts "  You can get it here: http://stwrt.ca/dotcss"
  end
end

desc 'Uninstall dcssd daemon'
task :uninstall => 'uninstall:all'

namespace :uninstall do
  task :all => [:prompt, :daemon, :autostart, :chrome, :done]

  task :prompt do
    puts ''
    puts '  I will remove:'
    puts "    1. dcssd(1) from #{DAEMON_INSTALL_DIR}"
    if is_linux
      puts "    2. dotcss.desktop from ~/.config/autostart"
    else
      puts "    2. ca.stwrt.dotcss.plist from ~/Library/LaunchAgents"
    end
    puts ''
    puts '  I will not remove:'
    puts '    1. ~/.css'
    puts '    2. The dotcss Chrome extension'
    puts ''
    print '  Ok? (y|n)'

    begin
      until %w( k ok y yes n no ).include?(answer = $stdin.gets.chomp.downcase)
        puts '  Please type y/yes or n/no.'
        puts '  Install dotcss? (y|n)'
      end
    rescue Interrupt
      exit 1
    end

    exit 1 if answer =~ /n/
  end

  task :done do
    puts ''
    if system 'curl http://localhost:1243 2> /dev/null > /dev/null'
      puts '  dotcss uninstall failed!'
      puts '  dcssd is still running.'
    else
      puts '  dotcss uninstall worked!'
      puts '  Your ~/.css folder was not touched.'
    end
  end

  desc "Uninstall launch agent or Linux launcher"
  task :autostart do
    if is_linux
      launcher = File.expand_path('~/.config/autostart/dotcss.desktop')
      system "kill $(ps aux | grep '^#{ENV['SUDO_USER']}' | grep '.*dcssd' | awk '{print $2}') 2> /dev/null; true"
    else
      launcher = File.expand_path('~/Library/LaunchAgents/ca.stwrt.dotcss.plist')
      system "launchctl unload #{launcher}"
    end

    rm launcher, :verbose => true
  end

  desc 'Uninstall dotcss daemon'
  task :daemon => :install_dir_writeable do
    rm File.join(DAEMON_INSTALL_DIR, 'dcssd'), :verbose => true
  end

  desc 'Uninstall Chrome extension'
  task :chrome do
    puts ''
    puts "  Please uninstall the chrome extension manually:"
    puts '  Chrome > Window > Extensions > dotcss > Uninstall.'
  end
end

# Check write permissions on DAEMON_INSTALL_DIR
task :install_dir_writeable do
  if not File.writable?(DAEMON_INSTALL_DIR)
    abort "  Error: Can't write to #{DAEMON_INSTALL_DIR}. Try again using `sudo`."
  end
end
