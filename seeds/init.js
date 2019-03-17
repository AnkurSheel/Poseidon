exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex("networth")
        .del()
        .then(function() {
            // Inserts seed entries
            return knex("networth").insert([
                {
                    date: new Date(Date.UTC(2018, 03, 01)),
                    name: "Checking Account",
                    type: "Asset",
                    amount: 100,
                },
                {
                    date: new Date(Date.UTC(2018, 03, 01)),
                    name: "Savings Account",
                    type: "Asset",
                    amount: 400,
                },
                {
                    date: new Date(Date.UTC(2018, 03, 01)),
                    name: "Credit Card",
                    type: "Asset",
                    amount: 200,
                },
                {
                    date: new Date(Date.UTC(2018, 04, 01)),
                    name: "Checking Account",
                    type: "Asset",
                    amount: 200,
                },
                {
                    date: new Date(Date.UTC(2018, 04, 01)),
                    name: "Savings Account",
                    type: "Asset",
                    amount: 500,
                },
                {
                    date: new Date(Date.UTC(2018, 04, 01)),
                    name: "Credit Card",
                    type: "Asset",
                    amount: 100,
                },
            ]);
        });
};
