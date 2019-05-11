// Update with your config settings.

module.exports = {
    development: {
        client: "sqlite3",
        connection: {
            filename: `newt-dev.sqlite3`,
        },
        seeds: {
            directory: "./seeds",
        },
        useNullAsDefault: true,
        debug: true,
    },

    staging: {
        client: "sqlite3",
        connection: {
            filename: `newt-test.sqlite3`,
        },
        useNullAsDefault: true,
    },

    production: {
        client: "sqlite3",
        connection: {
            filename: `newt.sqlite3`,
        },
        useNullAsDefault: true,
    },
};
