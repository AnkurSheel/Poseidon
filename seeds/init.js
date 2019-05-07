const faker = require("faker");
const moment = require("moment");

faker.seed(123);

const createFakeEntry = () => {
    let fakeEntry = {
        date: moment(faker.date.between("2014-01-01", "2016-12-12"), "YYYY-MM").format("YYYY-MM-01"),
        name: faker.name.firstName() + faker.name.lastName(),
        type: faker.random.arrayElement(["Asset", "Debt"]),
    };
    if (fakeEntry.type === "Asset") {
        fakeEntry.amount = faker.finance.amount(500, 1000, 2);
    } else {
        fakeEntry.amount = faker.random.number(-500, 0, 2);
    }
    return fakeEntry;
};

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex("networth")
        .del()
        .then(async function() {
            const fakeEntries = [];
            const desiredFakeEntries = 1000;
            for (let i = 1; i <= desiredFakeEntries; i++) {
                fakeEntries.push(createFakeEntry());
                if (fakeEntries.length % 100 === 0) {
                    await knex("networth").insert(fakeEntries);
                    console.log(fakeEntries.length);
                    fakeEntries.splice(0, fakeEntries.length);
                    console.log(fakeEntries.length);
                }
            }
            await knex("networth").insert(fakeEntries);
        });
};
