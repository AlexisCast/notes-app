const { default: chalk } = require("chalk");
const fs = require("fs");

const getNotes = () => {
	return "Your notes...";
};

const listNotes = () => {
	const notes = loadNotes();
	console.log(chalk.gray.inverse("Your Notes"));
	notes.forEach((note) => {
		console.log(note.title);
	});
};

const readNote = (title) => {
	const notes = loadNotes();
	const note = notes.find((note) => {
		return note.title === title;
	});
	if (note) {
		console.log(chalk.green.italic(note.title));
		console.log(chalk.green.dim(note.body));
	} else {
		console.log(chalk.red.inverse("No Note found"));
	}
};

const addNote = (title, body) => {
	const notes = loadNotes();
	const duplicateNote = notes.find((note) => {
		return note.title === title;
	});

	if (!duplicateNote) {
		notes.push({
			title: title,
			body: body,
		});
		console.log(chalk.green.inverse("Note Added"));
		saveNotes(notes);
	} else {
		console.log(chalk.red.inverse("Note Title Taken"));
	}
};

const removeNote = (title) => {
	console.log("remove note with title: ", title);
	const notes = loadNotes();
	const notesToKeep = notes.filter((note) => {
		return note.title !== title;
	});
	if (notes.length > notesToKeep.length) {
		console.log(chalk.green.inverse("Note Removed"));
		saveNotes(notesToKeep);
	} else {
		console.log(chalk.red.inverse("Note Not Removed"));
	}
};

const loadNotes = () => {
	try {
		const dataBuffer = fs.readFileSync("notes.json");
		const dataJSON = dataBuffer.toString();
		return JSON.parse(dataJSON);
	} catch (e) {
		return [];
	}
};

const saveNotes = (notes) => {
	const dataJSON = JSON.stringify(notes);
	fs.writeFileSync("notes.json", dataJSON);
};

module.exports = {
	getNotes: getNotes,
	addNote: addNote,
	removeNote: removeNote,
	listNotes: listNotes,
	readNote: readNote,
};
