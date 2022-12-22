/* eslint-disable no-undef */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('role_permission', {
    role_id: { type: 'integer', notNull: true, references: 'roles' },
    permission_id: { type: 'integer', notNull: true, references: 'permissions' },

    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
};

exports.down = pgm => {
  pgm.dropTable('role_permission');
};
