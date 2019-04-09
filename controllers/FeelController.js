const Feel = require('../models/Feel')
const emojis = require('emojis')
const monthsData = [
    ['january', 1],
    ['february', 2],
    ['march', 3],
    ['april', 4],
    ['may', 5],
    ['june', 6],
    ['july', 7],
    ['august', 8],
    ['september', 9],
    ['october', 10],
    ['november', 11],
    ['december', 12]
]
const monthsMap = new Map(monthsData)
const moment = require('moment')

module.exports = {
    get: (params) => {
        return new Promise((resolve, reject) => {
            Feel.find(params)
            .then(data => {
                let smiley = emojis.unicode(':smiley:')
                let neutral = emojis.unicode(':neutral_face:')
                let  disappointed = emojis.unicode(':disappointed:')
                data.map(obj => {
                    switch(obj.emoji){
                        case ':smiley:':
                            obj.emoji = smiley
                            break;
                        case ':neutral_face:':
                            obj.emoji = neutral
                            break;
                        case ':disappointed:':
                            obj.emoji = disappointed
                            break;
                    }
                    //data.date = new Date(obj.date).toDateString()
                })

                let feelings = []
                data.map(obj => { 
                    var utc = new Date(obj.date).toDateString()
                    
                    feelings.push({
                        feel: obj.feel,
                        emoji: obj.emoji,
                        date: utc
                    })

                })
                
                resolve(feelings)
            })
            .catch(err => {
                reject(err)
            })
        })
    },

    getCharts: (params) => {
        return new Promise((resolve, reject) => {
            Feel.find()
            .then(data => {
                let smiley = data.filter(obj => obj.emoji == ':smiley:')
                let neutral_face = data.filter(obj => obj.emoji == ':neutral_face:')
                let disappointed = data.filter(obj => obj.emoji == ':disappointed:')
                resolve({
                    smiley:smiley.length,
                    neutral_face: neutral_face.length,
                    disappointed: disappointed.length
                })
            })
            .catch(err => {
                reject(err)
            })
        })
    },

    getChartsByMonth: (params) => {
        return new Promise((resolve, reject) => {
            let monthValue = monthsMap.get(params)
            Feel.aggregate([
                {$addFields: {  "month" : {$month: '$date'}}},
                {$match: { month: monthValue}}
              ])
            .then(data => {
                let smiley = data.filter(obj => obj.emoji == ':smiley:')
                let neutral_face = data.filter(obj => obj.emoji == ':neutral_face:')
                let disappointed = data.filter(obj => obj.emoji == ':disappointed:')
                resolve({
                    smiley:smiley.length,
                    neutral_face: neutral_face.length,
                    disappointed: disappointed.length
                })
            })
            .catch(err => {
                reject(err)
            })
        })
    },

    post: (params) => {
        const today = moment().startOf('day')
        return new Promise((resolve, reject) => {
            Feel.findOne({
                date: {
                  $gte: today.toDate(),
                  $lte: moment(today).endOf('day').toDate()
                }
              })
            .then(data =>{
                if(!data){
                    Feel.create(params)
                    .then(data =>{
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    })
                }else{
                  resolve({
                      message: "¡You ready registered your mood today!",
                      display: "block",
                      exists: true 
                  })  
                }
            })
            .catch(err => {
                reject(err)
            })
        })
    },

    getRecordsByMonth: (params) => {
        return new Promise((resolve, reject) => {
            let monthValue = monthsMap.get(params)
            Feel.aggregate([
                {$addFields: {  "month" : {$month: '$date'}}},
                {$match: { month: monthValue}}
              ])
            .then(data => {
                let smiley = emojis.unicode(':smiley:')
                let neutral = emojis.unicode(':neutral_face:')
                let  disappointed = emojis.unicode(':disappointed:')
                data.map(obj => {
                    switch(obj.emoji){
                        case ':smiley:':
                            obj.emoji = smiley
                            break;
                        case ':neutral_face:':
                            obj.emoji = neutral
                            break;
                        case ':disappointed:':
                            obj.emoji = disappointed
                            break;
                    }
                    //data.date = new Date(obj.date).toDateString()
                })

                let feelings = []
                data.map(obj => { 
                    var utc = new Date(obj.date).toDateString()
                    
                    feelings.push({
                        feel: obj.feel,
                        emoji: obj.emoji,
                        date: utc
                    })

                })
                
                resolve(feelings)
            })
            .catch(err => {
                reject(err)
            })
        })
    }
}