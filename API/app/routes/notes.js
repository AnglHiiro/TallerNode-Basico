const express = require('express')
const router = express.Router()
router.use(express.json())
const fs = require('fs')
const db = require('../../db/queries')
const uuid = require('uuid')

router.post('/user/create', async (req, res) => {
    try {
        let result = await db.users.createUser()
        res.json({
            stauts: 200, 
            message: 'El usuario ha sido creado con exito',
            body: result.body[0]
        })
    } catch (error) {
        res.json({status: 500, error: error.message})
    }
})

// ---------------------------------

router.get('/notes/:id', async (req, res) => {
    try {
        if(req.params.id){
            let result = await db.notes.getNotes(req.params.id)
            res.json({
                stauts: 200, 
                message: 'Se han encontrado notas',
                body: result.body
            })
        }else{
            res.json({status: 500, menssage: 'No se recibio un ID'})
        }
    } catch (error) {
        res.json({status: 500, error: error.message})
    }
})

router.post('/notes/create', async (req, res) => {
    try {
        if(Object.keys(req.body).length === 0){
            res.json({
                status: 401,
                message: 'No se ha redcibido informacion'
            })
        }else{
            req.body.uuid = uuid.v4()
            let result = await db.notes.createNotes(req.body)
            console.log(result);
            res.json({
                stauts: 200,
                message: 'La nota ha sido creada correctamente',
                body: [{uuid: req.body.uuid}]
            })
        }
    } catch (error) {
        res.json({status: 500, error: error.message})
    }
})

router.post(`/notes/edit`, async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            res.json({
                status: 401,
                message: 'Todos los campos son requeridos'
            });
        } else {
            let result = await db.notes.updateNotes(req.body)
            res.json({
                status: 200,
                message: "La nota ha sido actualizada con exito",
            })

        }
    } catch (err) {
        res.status(500).json({status: 500, error: err.message });
    }
})


router.post(`/notes/delete`, async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            res.json({
                status: 401,
                message: 'Todos los campos son requeridos'
            });
        } else {
            let result = await db.notes.deleteNotes(req.body)
            res.json({
                status: 200,
                message: "La nota ha sido eliminada con exito"
            })

        }
    } catch (err) {
        res.json({status: 500, error: err.message });
    }
})

module.exports = router