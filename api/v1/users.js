const express = require('express');

const router = express.Router();

const knex = require('../../db/knex');

router.get('/', (req, res, next) => {
	const query = knex
		.select('*')
		.from('users')
		.whereIn('id', req.query.ids.split(','));

	query.then(users => res.json(users));
})

module.exports = router;
