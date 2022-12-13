/* eslint-disable no-undef */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('permissions', {
    id: 'id',

    temp_permission_id: { type: 'integer', notNull: true, references: 'template_permissions'},

    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },

    update_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
};

exports.down = pgm => {
  pgm.dropTable('permissions');
};
