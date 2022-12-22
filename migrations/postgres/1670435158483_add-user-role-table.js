/* eslint-disable no-undef */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('user_role', {
    user_id: { type: 'integer', notNull: true, references: 'users' },
    role_id: { type: 'integer', notNull: true, references: 'roles' },

    deleted: { type: 'bool', default: false },

    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },

    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
};

exports.down = pgm => {
  pgm.dropTable('user_role');
};
