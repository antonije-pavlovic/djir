/* eslint-disable no-undef */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('permissions', {
    id: 'id',

    temp_permission_id: { type: 'integer', notNull: true, references: 'template_permissions'},
    // This can be an ID of service, moto club ID, etc
    entity_id: { type: 'integer', references: 'entities' },

    name: { type: 'varchar(100)', notNull: true },

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
