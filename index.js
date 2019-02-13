const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile');
const cors = require('cors');

const server = express();
const db = knex(knexConfig.development);

server.use(express.json());
server.use(cors());

const PORT = 4000;

server.get('/api/notes', (req, res)=>{
    db('notes')
    .then(notes=>{
        res.status(200).json({notes: notes});
    })
    .catch(error=>{
        res.status(500).json({error: 'Failed to retrieve notes'});
    })
})

server.get('/api/notes/:id', (req, res)=>{
    const {id} = req.params;
    db('notes')
    .where('id', Number(id))
    .then(note=>{
        if(note.length){
            res.status(200).json({note: note});
        }
        else{
            res.status(404).json({errorMessage: 'Note not found'});
        }
    })
    .catch(error=>{
        res.status(500).json({error: 'Failed to retrieve note'});
    })
})

server.post('/api/notes', (req, res)=>{
    const note = req.body;
    if(note.note_title){
        db('notes')
        .insert(note)
        .then(id=>{
            res.status(201).json({id: id[0]});
        })
        .catch(error=>{
            res.status(500).json({error: 'Failed to add note to database'});
        })
    }
    else{
        res.status(400).json({errorMessage: 'Please include the title of the note'});
    }
})

server.put('/api/notes/:id', (req, res)=>{
    const {id} = req.params;
    const note = req.body;
    db('notes')
    .where('id', Number(id))
    .update(note)
    .then(count=>{
        if(count){
            db('notes')
            .where('id', Number(id))
            .then(note=>{
                res.status(200).json({note: note[0]});
            })
        }
        else{
            res.status(404).json({errorMessage: 'Note not found'});
        }
    })
    .catch(error=>{
        res.status(500).json({error: 'Failed to update note'});
    })
})

server.delete('/api/notes/:id', (req, res)=>{
    const {id} = req.params;
    db('notes')
    .where('id', Number(id))
    .del()
    .then(count=>{
        if(count){
            res.status(200).json({id: id});
        }
        else{
            res.status(404).json({errorMessage: 'Note not found'});
        }
    })
    .catch(error=>{
        res.status(500).json({error: 'Failed to delete note'});
    })
})

server.listen(PORT, function(){
    console.log(`Server listening on port: ${PORT}`);
})