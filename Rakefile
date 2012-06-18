require 'erb'

desc "Install dotcss"
task :install => "install:all"

DAEMON_INSTALL_DIR = "/usr/local/bin"

is_linux = RUBY_PLATFORM.downcase.include?("linux")
is_sudo = true if ENV['SUDO_USER']

namespace :install do
  task :all => [:prompt, :daemon, :create_dir, :autostart, :chrome, :done]

  task :prompt do
    puts ""
    puts "  dotcss"
    puts "  ------"
    puts "  I will install:"
    puts "  1. The `dotcss` Chrome extension"
    puts "  2. dcssd(1) in #{DAEMON_INSTALL_DIR}"
    if is_linux
      puts "  3. dotcss.desktop in ~/.config/autostart"
    else
      puts "  3. com.averagestudios.dotcss in ~/Library/LaunchAgents"
    end
    puts ""
    print "  Ok? (y/n) "

    begin
      until %w( k ok y yes n no ).include?(answer = $stdin.gets.chomp.downcase)
        puts "(psst... please type y or n)"
        puts "Install dotcss? (y/n)"
      end
    rescue Interrupt
      exit 1
    end

    exit 1 if answer =~ /n/
  end

  task :done do
    if system("curl http://localhost:1243 &> /dev/null")
      puts ""
      puts "  dotcss installation worked!"
      puts "  drop files like github.com.css in ~/.css and have fun tweaking the web!"
    else
      puts ""
      puts "  dotcss installation failed!"
      puts "  check console.app or open an issue on GitHub."
    end
  end

  desc "Install launch agent or Linux launcher"
  task :autostart do
    if is_linux
      desktop_file = "dotcss.desktop"
      launcher_dir = File.expand_path("~/.config/autostart/")
      launcher = File.join(launcher_dir, desktop_file)
      Dir.mkdir(launcher_dir) unless File.exists?(launcher_dir)

      File.open(launcher, "w") do |f|
          f.puts ERB.new(IO.read(desktop_file)).result(binding)
      end
      if is_sudo
        sh "chown #{ENV['SUDO_USER']}:#{ENV['SUDO_USER']} #{launcher}"
      end

      puts "starting dcssd..."
      command = "exo-open #{launcher} > /dev/null 2> /dev/null &"

      if is_sudo
        sh "sudo -u #{ENV['SUDO_USER']} #{command}"
      else
        sh "#{command}"
      end

    else
      plist = "com.averagestudios.dotcss.plist"
      agent_dir = File.expand_path("~/Library/LaunchAgents/")
      agent = File.join(agent_dir, plist)
      Dir.mkdir(agent_dir) unless File.exists?(agent_dir)

      File.open(agent, "w") do |f|
          f.puts ERB.new(IO.read(plist)).result(binding)
      end

      puts "starting dcssd..."
      sh "launchctl load -w #{agent}"
    end

    # wait for server to start
    sleep 5
  end

  desc "Install dotcss daemon"
  task :daemon => :install_dir_writeable do
    cp "bin/dcssd", DAEMON_INSTALL_DIR, :verbose => true, :preserve => true
  end

  desc "Create ~/.css"
  task :create_dir do
    if !File.directory? css_dir = File.join(ENV['HOME'], ".css")
      mkdir css_dir
      chmod 0755, css_dir
    end
  end

  desc "Install Google Chrome extension"
  task :chrome do
    puts "Installing Google Chrome extension..."
    if is_linux
      command = "google-chrome builds/dotcss.crx > /dev/null &"
      if is_sudo
        sh "sudo -u #{ENV['SUDO_USER']} #{command}"
      else
        sh "#{command}"
      end
    else
      sh "open -a 'Google Chrome' builds/dotcss.crx >/dev/null 2>&1 | open -a Chromium builds/dotcss.crx &"
    end
  end
end

desc "Uninstall dotcss"
task :uninstall => "uninstall:all"

namespace :uninstall do
  task :all => [:prompt, :daemon, :autostart, :chrome, :done]

  task :prompt do
    puts ""
    puts "  I will remove:", ""
    puts "  1. dcssd(1) from #{DAEMON_INSTALL_DIR}"
    if is_linux
      puts "  2. dotcss.desktop from ~/.config/autostart"
    else
      puts "  2. com.averagestudios.dotcss from ~/Library/LaunchAgents"
    end
    puts "  3. The 'dotcss' Google Chrome Extension"
    puts ""
    puts "  I will not remove:", ""
    puts "  1. ~/.css"
    puts ""
    print "  Ok? (y/n) "

    begin
      until %w( k ok y yes n no ).include?(answer = $stdin.gets.chomp.downcase)
        puts "(psst... please type y or n)"
        puts "Uninstall dotcss? (y/n)"
      end
    rescue Interrupt
      exit 1
    end

    exit 1 if answer =~ /n/
  end

  task :done do
    if system("curl http://localhost:1243 2> /dev/null > /dev/null")
      puts ""
      puts "  dotcss uninstall failed!"
      puts "  dcssd is still running."
    else
      puts ""
      puts "  dotcss uninstall worked!"
      puts "  your ~/.css was not touched."
    end
  end

  desc "Uninstall launch agent or Linux launcher"
  task :autostart do
    if is_linux
      desktop_file = "dotcss.desktop"
      launcher = File.expand_path("~/.config/autostart/#{desktop_file}")
      sh "kill $(ps aux | grep '^#{ENV['SUDO_USER']}' | grep '.*dcssd' | awk '{print $2}') 2> /dev/null; true"
      rm launcher, :verbose => true
    else
      plist = "com.averagestudios.dotcss.plist"
      agent = File.expand_path("~/Library/LaunchAgents/#{plist}")
      sh "launchctl unload #{agent}"
      rm agent, :verbose => true
    end
  end

  desc "Uninstall dotcss daemon"
  task :daemon => :install_dir_writeable do
    rm File.join(DAEMON_INSTALL_DIR, "dcssd"), :verbose => true
  end

  desc "Uninstall Google Chrome extension"
  task :chrome do
    puts "\e[1mplease uninstall the google chrome extension manually:\e[0m"
    puts "google chrome > window > extensions > dotcss > uninstall"
  end
end

# Check write permissions on DAEMON_INSTALL_DIR
task :install_dir_writeable do
  if not File.writable?(DAEMON_INSTALL_DIR)
    abort "Error: Can't write to #{DAEMON_INSTALL_DIR}. Try again using `sudo`."
  end
end
