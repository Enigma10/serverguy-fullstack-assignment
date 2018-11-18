const express = require('express')
const { User } = require('../models')

const router = express.Router()

router.post('/signup', async (req, res, next) => {
	try {
		const {
			username,
			email,
			password
		} = req.body
		await User.create({
			username,
			email,
			password
		})
		// res.redirect('http://localhost:3001/projects')
		// res.redirect('http://localhost:3001/')
		res.send({
			status: true,
			data: 'User created successfully.',
		})
	} catch (error) {
		next(error)
	}
})

router.get('/list', async (_, res, next) => {
  try {
    const users = await User.findAll()
    res.send({
      status: true,
      data: users,
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router