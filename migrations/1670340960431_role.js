/* eslint-disable no-undef */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('roles', {
    id: 'id',

    temp_role_id: { type: 'integer', notNull: true, references: 'template_roles'},
    // This can be an ID of service, moto club ID, etc
    refers_to: { type: 'integer', notNull: true },

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
  pgm.dropTable('roles');
};
