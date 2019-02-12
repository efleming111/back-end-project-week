const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile');

const server = express();
const db = knex(knexConfig.development);

server.use(express.json());

const PORT = 3000;

server.get('/api/notes', (req, res)=>{
    res.status(200).json({message: 'Return all notes'});
})

server.get('/api/notes/:id', (req, res)=>{
    res.status(200).json({message: 'Return note by id'});
})

server.post('/api/notes', (req, res)=>{
    res.status(200).json({message: 'Add note return id'})
})

server.put('/api/notes/:id', (req, res)=>{
    res.status(200).json({message: 'Edit note return id'})
})

server.delete('/api/notes/:id', (req, res)=>{
    res.status(200).json({message: 'Delete note return id'})
})

server.listen(PORT, function(){
    console.log(`Server listening on port: ${PORT}`);
})