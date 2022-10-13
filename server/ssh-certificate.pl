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
  my $host = $port = shift(@$params);
  my $ca = $account = shift(@$params);
  my $id = shift(@$params);
  my $principals = shift(@$params);
  my $validity = shift(@$params);

  if ($command eq "setup-ca") {
    setup_ca($name);
  }
  elsif ($command eq "setup-host") {
    setup_host($name, $host);
  }
  elsif ($command eq "generate-user-cert") {
    generate_user_cert($name, $host, $ca, $id, $principals, $validity);
  } 
  elsif ($command eq "view-cert") {
    view_cert($name, $host);
  }
  else {
    print "Invalid command $command.\n";
  }
}

sub setup_ca() {
  my $name = shift || "user_ca";
  system("ssh-keygen -t rsa -b 4096 -f ~/.ssh/$name");
}

sub setup_host() {
  my $name = shift || "user_ca";
  my $host = shift;
  system("scp ~/.ssh/$name.pub root\@$host:/etc/ssh/");
  # Mark the key as trusted in the host server
  # edit the /etc/ssh/sshd_config file and add the following line
  # TrustedUserCAKeys /etc/ssh/user_ca.pub
  # then restart ssh
  # service sshd restart
}

sub generate_user_cert() {
  my $user = shift || "user";
  my $host = shift || "host";
  my $ca = shift || "user_ca";
  my $id = shift || "user";
  my $principals = shift || "dev";
  my $validity = shift || "+1d";

  system("mkdir ~/.ssh/$user-$host");
  
  system("ssh-keygen -t rsa -b 4096 -f ~/.ssh/$user-$host/$user-$host-key");

  system("ssh-keygen -s ~/.ssh/$ca -I $id -n $principals -V $validity ~/.ssh/$user-$host/$user-$host-key.pub")
}

sub view_cert() {
  my $user = shift || "user";
  my $host = shift || "host";
  system("ssh-keygen -L -f ~/.ssh/$user-$host/$user-$host-key-cert.pub");
}