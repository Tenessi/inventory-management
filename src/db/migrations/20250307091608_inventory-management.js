exports.up = function(knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());
      table.string('name').notNullable();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.string('role').notNullable();
    })
    .createTable('products', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());
      table.string('name').notNullable();
      table.string('description');
      table.integer('price').notNullable();
    })
    .createTable('warehouses', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());
      table.string('name').notNullable();
      table.integer('capacity').defaultTo(0).notNullable();
    })
    .createTable('warehouseProducts', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());
      table.integer('quantity').defaultTo(0).notNullable();
      table.uuid('productId').references('id').inTable('products').onDelete('CASCADE');
      table.uuid('warehouseId').references('id').inTable('warehouses').onDelete('CASCADE');
    })
    .createTable('transactions', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());
      table.timestamp('date').defaultTo(knex.fn.now());
      table.integer('quantity').defaultTo(0).notNullable();
      table.uuid('userId').references('id').inTable('users').onDelete('CASCADE');
      table.uuid('productId').references('id').inTable('products').onDelete('CASCADE');
      table.uuid('warehouseId').references('id').inTable('warehouses').onDelete('CASCADE');
    })
    .createTable('accountingRecords', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());
      table.timestamp('recordDate').defaultTo(knex.fn.now());
      table.integer('quantity').defaultTo(0).notNullable();
      table.uuid('transactionId').references('id').inTable('transactions').onDelete('CASCADE');
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('accountingRecords')
    .dropTable('transactions')
    .dropTable('warehouseProducts')
    .dropTable('warehouses')
    .dropTable('products')
    .dropTable('users')
};
