const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes.js");
const { argv } = require("process");

// console.log(process.argv);
/**
 * console.log(process.argv)
 * node app.js add --title="foo" --body="bar"
 * node app.js read --title="foo" 
 * node app.js remove --title="foo"
 * node app.js list
 * node app.js inspect add --title="foo" --body="bar"
 */

yargs.version("1.1.0");

yargs.command({
	command: "add",
	describe: "Add a new note",
	builder: {
		title: {
			describe: "Note title",
			demandOption: true,
			type: "string",
		},
		body: {
			describe: "Note body",
			demandOption: true,
			types: "string",
		},
	},
	handler(argv) {
		console.log("Title: " + argv.title);
		console.log("Body: " + argv.body);
		notes.addNote(argv.title, argv.body);
	},
});

yargs.command({
	command: "remove",
	describe: "Remove a note",
	builder: {
		title: {
			describe: "Note title",
			demandOption: true,
			type: "string",
		},
	},
	handler(argv) {
		console.log("Removing the note!");
		console.log("Title: " + argv.title);
		notes.removeNote(argv.title);
	},
});

yargs.command({
	command: "list",
	describe: "List all the notes!",
	handler() {
		console.log("List all the notes!");
		notes.listNotes();
	},
});

yargs.command({
	command: "read",
	describe: "Read a file",
	builder: {
		title: {
			describe: "Note title",
			demandOption: true,
			type: "string",
		},
	},
	handler(argv) {
		console.log("Read a note!");
		notes.readNote(argv.title);
	},
});

yargs.parse();

