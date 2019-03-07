const Feel = require('../models/Feel')

module.exports = {
    get: (params) => {
        return new Promise((resolve, reject) => {
            Feel.find(params)
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err)
            })
        })
    },

    post: (params) => {
        return new Promise((resolve, reject) => {
            Feel.create(params)
            .then(data =>{
                resolve(data)
            })
            .catch(err => {
                reject(err)
            })
        })
    }
}