
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
  	table.increments();
  	table.string('email');
  	table.string('endpoint'); // In the future replace this with related table for multiple endpoints
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
