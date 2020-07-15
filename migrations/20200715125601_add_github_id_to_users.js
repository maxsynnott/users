
exports.up = function(knex) {
  return knex.schema.table('users', (table) => {
  	table.string('github_id');
  })
};

exports.down = function(knex) {
	return knex.schema.table('users', (table) => {
		table.dropColumn('github_id');
	})
};
