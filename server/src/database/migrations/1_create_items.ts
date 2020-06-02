import knexType from 'knex'

export async function up(knex: knexType){
    return knex.schema.createTable('items', table => {
        table.increments('id').primary(),
        table.string('image').notNullable(),
        table.string('title').notNullable()
    })
}

export async function down(knex: knexType){
    return knex.schema.dropTable('items')
}