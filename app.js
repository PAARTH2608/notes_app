const { argv } = require('yargs');
const yargs = require('yargs');
const notes = require('./notes.js');

yargs.command({
    command: 'Add',
    describe: 'Add a new note',
    builder: {
        title:{ 
            describe: 'Note Title',
            demandOption: true, 
            type: 'string' 
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.addNote(argv.title, argv.body)
    }
});
yargs.command({
    command: 'Remove',
    describe: 'Remove a command',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.removeNote(argv.title)
    }
});
yargs.command({
    command: 'List',
    describe: 'List your notes',
    handler: function () {
        notes.listNotes()
    }
});
yargs.command({
    command: 'Read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.readNote(argv.title);
    }
});
console.log(yargs.argv)