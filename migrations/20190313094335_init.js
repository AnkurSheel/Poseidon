exports.up = function(knex, Promise) {
    return knex.schema.createTable("networth", function(t) {
        t.increments("id");
        t.date("date").notNullable();
        t.string("name").notNullable();
        t.enum("type", ["Asset", "Debt"]).notNullable();
        t.decimal("amount").notNullable();
        t.timestamps(false, true);
        t.unique(["date", "name"]);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("networth");
};
