/* eslint-disable no-undef */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('services', {
    pib: { type: 'integer', notNull: true },

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
  }, {
    inherits: 'entities'
  })
};

exports.down = pgm => {
  pgm.dropTable('services');
};
