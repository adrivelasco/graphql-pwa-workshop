const shell = require('shelljs');

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}

process.stdout.write('Cleanup started...');

// Cleanup build folder/
shell.rm('-rf', 'build');

shell.echo('\nCleanup done.');
