/* eslint-disable no-undef */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('user_role', {
    id: 'id',

    user_id: { type: 'integer', notNull: true, references: 'users' },
    role_id: { type: 'integer', notNull: true, references: 'roles' },

    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
};

exports.down = pgm => {
  pgm.dropTable('user_role');
};
