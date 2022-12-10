/* eslint-disable no-undef */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('temp_role_temp_permission', {
    id: 'id',

    temp_role_id: { type: 'integer', notNull: true, references: 'template_roles' },
    temp_permission_id: { type: 'integer', notNull: true, references: 'template_permissions' },

    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
};

exports.down = pgm => {
  pgm.dropTable('temp_role_temp_permission');
};
