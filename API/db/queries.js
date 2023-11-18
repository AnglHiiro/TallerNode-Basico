const {pool} = require('./connection')
const util = require('util')

const query = util.promisify(pool.query).bind(pool)

const users = {
    createUser: async () => {
        try {
            const res = await query(`INSERT INTO USERS (TIMESTAMP) VALUES (NOW());`)
            return {
                body: res
            }
        } catch (error) {
            return {
                body: [error]
            }
        }
    }
}

const notes = {
    createNotes: async (data) => {
        try {
            const res = await query(`INSERT INTO NOTES (UUID, ID_USER, TITLE, CONTENT, TIMESTAMP, TYPE, COLOR) VALUES (?, ?, ?, ?, NOW(), ?, ?);`, 
            [data.uuid, data.id, data.title, data.content, data.type, data.color])
            console.log(res);
            return {
                body: res
            }
        } catch (error) {
            return {
                body: [error]
            }
        }
    },
    updateNotes: async (data) => {
        try {
            const res = await query(`UPDATE NOTES SET TITLE = ?, CONTENT = ?, TYPE = ?, COLOR = ? WHERE UUID = ?;`, 
            [data.title, data.content, data.type, data.color, data.uuid])
            return {
                body: res
            }
        } catch (error) {
            return {
                body: [error]
            }
        }
    },
    deleteNotes: async (data) => {
        try {
            const res = await query(`DELETE FROM NOTES WHERE UUID = ?`, 
            [data.uuid])
            return {
                body: res
            }
        } catch (error) {
            return {
                body: [error]
            }
        }
    },
    getNotes: async (id) => {
        try {
            const res = await query(`SELECT UUID, TITLE, CONTENT, TIMESTAMP, TYPE, COLOR FROM NOTES WHERE ID_USER = ?`, 
            [id])
            return {
                body: res
            }
        } catch (error) {
            return {
                body: [error]
            }
        }
    }
}


module.exports = {
    users,
    notes
}