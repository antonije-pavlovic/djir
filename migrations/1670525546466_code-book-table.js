/* eslint-disable no-undef */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('code_book', {
    id: 'id',
    name: { type: 'varchar(100)'},
    temp_role_id: { type: 'integer', notNull: true, references: 'template_roles'},
  })
};

exports.down = pgm => {
  pgm.dropTable('code_book');
};
