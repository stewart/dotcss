require 'erb'

desc "Install dotcss"
task :install => "install:all"

DAEMON_INSTALL_DIR = "/usr/local/bin"

namespace :install do
  task :all => [:prompt, :daemon, :create_dir, :agent, :chrome, :done]

  task :prompt do
    puts ""
    puts "  dotcss"
    puts "  ------"
    puts "  I will install:"
    puts "  1. The `dotcss` Chrome extension"
    puts "  2. dcssd(1) in #{DAEMON_INSTALL_DIR}"
    puts "  3. com.averagestudios.dotcss in ~/Library/LaunchAgents"
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

  desc "Install launch agent"
  task :agent do
    plist = "com.averagestudios.dotcss.plist"
    agent_dir = File.expand_path("~/Library/LaunchAgents/")
    agent = File.join(agent_dir, plist)
    Dir.mkdir(agent_dir) unless File.exists?(agent_dir)

    File.open(agent, "w") do |f|
      f.puts ERB.new(IO.read(plist)).result(binding)
    end

    puts "starting dcssd..."
    sh "launchctl load -w #{agent}"

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
    sh "open -a 'Google Chrome' builds/dotcss.crx &"
  end
end

desc "Uninstall dotcss"
task :uninstall => "uninstall:all"

namespace :uninstall do
  task :all => [:prompt, :daemon, :agent, :chrome, :done]

  task :prompt do
    puts ""
    puts "  I will remove:", ""
    puts "  1. dcssd(1) from #{DAEMON_INSTALL_DIR}"
    puts "  2. com.averagestudios.dotcss from ~/Library/LaunchAgents"
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
    if system("curl http://localhost:1243 &> /dev/null")
      puts ""
      puts "  dotcss uninstall failed!"
      puts "  dcssd is still running."
    else
      puts ""
      puts "  dotcss uninstall worked!"
      puts "  your ~/.css was not touched."
    end
  end

  desc "Uninstall launch agent"
  task :agent do
    plist = "com.averagestudios.dotcss.plist"
    agent = File.expand_path("~/Library/LaunchAgents/#{plist}")
    sh "launchctl unload #{agent}"
    rm agent, :verbose => true
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
