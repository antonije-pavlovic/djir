/* eslint-disable no-undef */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('accounts', {
    id: 'id',

    name: { type: 'varchar(1000)', notNull: true },
    last_name: { type: 'varchar(1000)', notNull: true },
    email: { type: 'varchar(1000)', notNull: true },
    phone: { type: 'varchar(1000)', notNull: true },
    password: { type: 'varchar(1000)', notNull: true },

    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
};

exports.down = pgm => {
  pgm.dropTable('accounts');
};
