/* eslint-disable no-undef */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('permissions', {
    id: 'id',

    name: { type: 'varchar(255)', notNull: true },
    temp_permission_id: { type: 'integer', notNull: true, references: 'template_permissions'},

    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
};

exports.down = pgm => {
  pgm.dropTable('permissions');
};
