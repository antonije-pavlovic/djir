/* eslint-disable no-undef */
/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('accounts', {
    id: 'id',

    name: { type: 'varchar(1000)', notNull: true },
    last_name: { type: 'varchar(1000)', notNull: true },
    email: { type: 'varchar(1000)', notNull: true },
    phone: { type: 'varchar(1000)', notNull: true },

    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
};

exports.down = pgm => {
  pgm.dropTable('accounts');
};
