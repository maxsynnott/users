const express = require('express');

const router = express.Router();

const knex = require('../../db/knex');

router.get('/:id', (req, res, next) => {
	const query = knex
		.select('*')
		.from('users')
		.where('id', req.params.id)
		.limit(1)
		.first()

	query.then((user) => {
		if (user) {
			res.json(user);
		} else {
			next();
		}
	})
})

module.exports = router;
