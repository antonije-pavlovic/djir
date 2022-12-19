/* eslint-disable no-undef */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('user_entity', {
    user_id: { type: 'integer', notNull: true, references: 'users' },
    entity_id: { type: 'integer', notNull: true, references: 'entities' },

    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
};

exports.down = pgm => {
  pgm.dropTable('user_entity');
};
