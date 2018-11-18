const express = require('express')
const { Search } = require('../models')

const router = express.Router()

router.post('/search', async (req, res, next) => {
	try {
		const {	text } = req.body
		const email  = req.user.email
		const result = await Search.create({
			text,
			email
		})
		res.send({
			status: true,
			data: result,
		})
	} catch (error) {
		next(error)
	}
})

router.post('/list', async (req, res, next) => {
  try {
		console.log(req.session)
		const email  = req.user ? req.user.email : req.session.user.email
    const result = await Search.findAll({
			limit: 5,
			where: {
				email
			},
			order: [ [ 'updatedAt', 'DESC' ]]
		})
    res.send({
      status: true,
      data: result,
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router