/* eslint-disable no-undef */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('moto_clubs', {
    logo: { type: 'varchar(255)', notNull: true },

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
  pgm.dropTable('moto_clubs');
};
