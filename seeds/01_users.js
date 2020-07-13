
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { email: 'user@example.com', endpoint: 'http://localhost:2687/move' },
        { email: 'user_2@example.com', endpoint: 'http://localhost:2687/move' },
      ]);
    });
};
