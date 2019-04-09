// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

const emojis = require('emojis')
const FeelController = require('../controllers/FeelController')


router.get('/', (req, res) => {
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
	res.render('new_feel', {
		sucessful: true,
		data: { display: "none" }
	})
})


module.exports = router
