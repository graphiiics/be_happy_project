// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

const FeelController = require('../controllers/FeelController')

router.get('/feel', (req, res) => {
	const filters = req.query

	FeelController.get(filters)
	.then(data => {
		res.json({
			confirmation: 'sucess',
			data: data
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

router.post('/feel', (req,res) => {
	const newFeel = req.body

	FeelController.post(newFeel)
	.then(data => {
		/*res.json({
			confirmation: 'sucess',
			data: data
		})*/
		if(data.exists){
			res.render('new_feel', { data: data })
		}else{
			res.redirect('/records')
		}
		
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

router.get('/march', (req, res) => {
	//const filters = req.query

	FeelController.getByMonth()
	.then(data => {
		res.json({
			confirmation: 'sucess',
			data: data
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})




module.exports = router
