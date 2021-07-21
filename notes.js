const fs = require('fs');
const chalk = require('chalk')

const addNote = function(title, body){
    const notes = loadNotes();
    // const duplicateNotes = notes.filter(note => note.title === title); // returns an array.
    const duplicateNote = notes.find(note => note.title === title); 

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log('New Note Added!')
    }else {
        console.log('Already Taken')
    }
    
}
const saveNotes = function (notes){
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}
const loadNotes = function (){
    try{ 
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch(e){
        return []
    }   
}
// removing notes
const removeNote = function (title) {
    const notes = loadNotes();
    const notesToKeep = notes.filter(note => note.title !== title);

    if(notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note Removed!'));
        saveNotes(notesToKeep);
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
}
// list notes.
const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.inverse('Your Notes'));
    notes.forEach(note => {
        console.log(chalk.blueBright(" |_ ") + chalk.cyan(note.title))
    })
}
// read note.
const readNote = title => {
    const notes = loadNotes();
    const note = notes.find(note => note.title === title)

    if(note){
        console.log(chalk.cyan.inverse("Title") + (" -> ") + chalk.inverse(note.title));
        console.log(chalk.greenBright.inverse("Body") + (" -> ") + note.body);
    } else{
        console.log(chalk.red.inverse('Note not found!'))
    }
}
module.exports = {
    addNote:addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}