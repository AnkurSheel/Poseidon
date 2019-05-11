exports.up = function(knex, Promise) {
    let migration = knex.schema.createTable("accounts", function(t) {
        t.increments("id").primary();
        t.string("name", 255)
            .unique()
            .notNull();
        t.enum("type", ["Asset", "Debt"]).notNullable();
        t.timestamps(false, true);
    });

    let seed = knex
        .table("accounts")
        .insert([
            { name: "Checking Account", type: "Asset" },
            { name: "Savings Account", type: "Asset" },
            { name: "Emergency Account", type: "Asset" },
            { name: "Fixed Deposit", type: "Asset" },
            { name: "Retirement Account", type: "Asset" },
            { name: "Shares", type: "Asset" },
            { name: "Credit Card", type: "Debt" },
        ]);

    return migration.then(() => seed);
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("accounts");
};
