// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

const emojis = require('emojis')
const FeelController = require('../controllers/FeelController')


router.get('/', (req, res) => {
	let smile = emojis.unicode(':smiley:')
	console.log(smile);
	Promise.all(FeelController.getAllData())
	.then(data => {
		console.log(data);
		
		res.render('index', {
			emoji: smile,
			smiley: data[0].length,
			neutal: data[1].length,
			bad : data[2].length
		})
	})
})

router.get('/charts', (req, res) => {
	FeelController.getCharts()
	.then(data => {
		console.log("----charts-----",data)
		res.render('charts', {
			sucessful: true,
			data: data
		})
	})
	.catch(err => {
		res.render('charts', {
			sucessful: false,
			data: []
		})
	})
})

router.get('/records', (req, res) => {
	FeelController.get()
	.then(data => {
		
		
		console.log(data)
		res.render('records', {
			sucessful: true,
			data: data
		})
	})
	.catch(err => {
		res.render('records', {
			sucessful: false,
			data: []
		})
	})
})

router.get('/records/:month', (req, res) => {
	var month = req.params.month
	//res.json({month: month})
	FeelController.getRecordsByMonth(month)
	.then(data => {
		console.log(data)
		res.render('records', {
			sucessful: true,
			data: data
		})
	})
	.catch(err => {
		res.render('records', {
			sucessful: false,
			data: []
		})
	})
})

router.get('/charts/:month', (req, res) => {
	var month = req.params.month
	//res.json({month: month})
	FeelController.getChartsByMonth(month)
	.then(data => {
		console.log(data)
		res.render('charts', {
			sucessful: true,
			data: data
		})
	})
	.catch(err => {
		res.render('charts', {
			sucessful: false,
			data: []
		})
	})
})

router.get('/new-feel', (req, res) => {
	let smiley = emojis.unicode(':smiley:')
	let neutral = emojis.unicode(':neutral_face:')
	let  disappointed = emojis.unicode(':disappointed:')
	res.render('new_feel', {
		sucessful: true,
		smiley: smiley
	})
})


module.exports = router
