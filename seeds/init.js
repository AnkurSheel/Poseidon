exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex("networth")
        .del()
        .then(function() {
            // Inserts seed entries
            return knex("networth").insert([
                {
                    date: "2019-03-01",
                    name: "Checking Account",
                    type: "Asset",
                    amount: 100,
                },
                {
                    date: "2019-03-01",
                    name: "Savings Account",
                    type: "Asset",
                    amount: 400,
                },
                {
                    date: "2019-03-01",
                    name: "Credit Card",
                    type: "Debt",
                    amount: 200,
                },
                {
                    date: "2019-04-01",
                    name: "Checking Account",
                    type: "Asset",
                    amount: 200,
                },
                {
                    date: "2019-04-01",
                    name: "Savings Account",
                    type: "Asset",
                    amount: 500,
                },
                {
                    date: "2019-04-01",
                    name: "Credit Card",
                    type: "Debt",
                    amount: 100,
                },
            ]);
        });
};
