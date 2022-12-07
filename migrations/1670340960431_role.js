/* eslint-disable no-undef */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('role', {
    id: 'id',

    name: { type: 'varchar(255)', notNull: true },
    temp_role_id: { type: 'integer', notNull: true, references: 'template_role'},

    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
};

exports.down = pgm => {
  pgm.dropTable('role');
};
