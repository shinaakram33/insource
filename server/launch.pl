#!/usr/bin/perl

$command = $cmd_file = shift;

if ($cmd_file =~ /\.\w+$/) {
  process_command_file($cmd_file);
}
else {
  process_command($command, \@ARGV);
}

# ======================================================================================================================

sub process_command_file() {
  my $cmd_file = shift || "commands.txt";
  open($file, $cmd_file) || die "Could not open $cmd_file.";
  while (my $cmd_line = <$file>) {
    chomp($cmd_line);
    my @cmd_parts = split(/\s+/, $cmd_line);
    my $command = shift(@cmd_parts);
    process_command($command, \@cmd_parts);
  }
  close($file);
}

sub process_command() {
  my $command = shift;
  my $params = shift;
  my $name = $package = $domain = shift(@$params);
  my $port = shift(@$params);
  my $account = shift(@$params);
  if ($command eq "start-daemon") {
    load_server_daemon();
  }
  elsif ($command eq "kill-daemon") {
    kill_daemon();
  }
  elsif ($command eq "start-server") {
    load_server();
  }
  elsif ($command eq "stop-server") {
    stop_server();
  }
  elsif ($command eq "start-cron") {
    start_cron();
  }
  elsif ($command eq "create-cert") {
    create_cert($domain, $port, $account);
  }
  elsif ($command eq "stop-nginx") {
    stop_nginx();
  }
  elsif ($command eq "reset-nginx-config") {
    reset_nginx_to_only_https();
  }
  elsif ($command eq "restart-nginx") {
    restart_nginx();
  }
  elsif ($command eq "nginx-error") {
    show_nginx_error();
  }
  elsif ($command eq "create-user") {
    create_user($name);
  }
  elsif ($command eq "copy-files") {
    copy_files($name);
  }
  elsif ($command eq "package-install") {
    package_install($package);
  }
  elsif ($command eq "package-remove") {
    package_remove($package);
  }
  elsif ($command eq "snap-install") {
    snap_install($package);
  }
  elsif ($command eq "snap-remove") {
    snap_remove($package);
  }
  elsif ($command eq "node-package-install") {
    node_package_install($package);
  }
  elsif ($command eq "delete-user") {
    delete_user($name);
  }
  else {
    print "Invalid command $command.\n";
  }
}

sub kill_daemon() {
  system("pkill -9 -f daemon");
}

sub load_server_daemon() {
    system("node daemon.js &");
}

sub load_server() {
    system("node server.js &");
}

sub stop_server() {
    system("pkill -9 -f server");
}

sub start_cron() {
    system("crontab &");
}

sub create_cert() {
    my $domain = shift || die "Domain required.";
    my $port = shift || 3000;
    my $name = shift || "dev";
    # Creating the certificate.
    system("certbot certonly --nginx --register-unsafely-without-email -d $domain");
    # Configuring the server of Nginx.
    my $nginx_config_data = "

server {
    server_name $domain; # managed by Certbot
    # listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/$domain/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/$domain/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    # ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
    location / {
        index sv.html;
        proxy_set_header   X-Forwarded-For \$remote_addr;
        proxy_set_header   Host \$http_host;
        proxy_pass         \"https://127.0.0.1:$port\";
        root /home/$name/;
    }
}";
    open(my $file, ">>", '/etc/nginx/sites-available/default') || die "Could not save $file.";
    print $file $nginx_config_data;
    close($file);
    system("cp /etc/letsencrypt/live/$domain/fullchain.pem ..");
    system("cp /etc/letsencrypt/live/$domain/privkey.pem ..");
    system("cd .. && chown dev *.*");
    # Restarting Nginx.
    # restart_nginx();
}

sub reset_nginx_to_only_https() {
  my $nginx_config_data = "
server {
    listen 80 default_server;
    server_name _;
    return 301 https://\$host\$request_uri;
}";
  open(my $file, ">", '/etc/nginx/sites-available/default') || die "Could not save $file.";
  print $file $nginx_config_data;
  close($file);
}

sub restart_nginx() {
    system("systemctl restart nginx");
}

sub stop_nginx() {
    system("systemctl stop nginx");
}

sub show_nginx_error() {
  system("systemctl status nginx.service");
}

sub create_user() {
  my $name = shift || "dev";
  system("useradd $name");
  system("usermod -s /bin/bash $name");
  system("usermod -d /home/$name $name");
  system("usermod -a -G sudo $name");
  system("mkdir /home/$name");
  system("passwd $name");
}

sub copy_files() {
  my $name = shift || "dev";
  system("mkdir /home/$name/www");
  system("mkdir /home/$name/www/img");
  system("mkdir /home/$name/www/js");
  system("mkdir /home/$name/www/css");
  system("mkdir /home/$name/www/mod");
  system("cp *.* /home/$name");
  system("cp index.html /home/$name/www");
}

sub package_install() {
  my $package_file = shift || "packages.txt";
  open(my $file, $package_file) || die "Could not open $package_file";
  system("apt update");
  while (my $package = <$file>) {
    chomp($package);
    system("apt install $package -y");
  }
  close($file);
}

sub package_remove() {
  my $package_file = shift || "packages.txt";
  open(my $file, $package_file) || die "Could not open $package_file";
  system("apt update");
  while (my $package = <$file>) {
    chomp($package);
    system("apt remove $package -y");
  }
  close($file);
}

sub snap_install() {
  my $package_file = shift || "snap.txt";
  open(my $file, $package_file) || die "Could not open $package_file";
  # system("apt update");
  while (my $package = <$file>) {
    chomp($package);
    if ($package eq "core") {
      system("snap install $package");
      system("snap refresh $package");
    } 
    elsif ($package eq "certbot") {
      system("snap install --classic $package");
      system("ln -s /snap/bin/certbot /usr/bin/certbot");
    } 
    else {
      system("snap install $package");
    }
  }
  close($file);
}

sub snap_remove() {
  my $package_file = shift || "snap.txt";
  open(my $file, $package_file) || die "Could not open $package_file";
  while (my $package = <$file>) {
    chomp($package);
    system("snap remove $package --purge");
  }
  close($file);
}

sub node_package_install() {
  my $package_file = shift || "npm.txt";
  open(my $file, $package_file) || die "Could not open $package_file";
  while (my $package = <$file>) {
    chomp($package);
    system("npm install $package");
  }
  close($file);
}

sub delete_user() {
  my $name = shift;
  system("userdel -r $name");
}
