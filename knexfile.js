// Update with your config settings.

module.exports = {
    development: {
        client: "sqlite3",
        connection: {
            filename: "./dev.sqlite3",
        },
        seeds: {
            directory: "./seeds",
        },
        useNullAsDefault: true,
    },

    staging: {
        client: "sqlite3",
        connection: {
            filename: "./dev.sqlite3",
        },
        useNullAsDefault: true,
    },

    production: {
        client: "sqlite3",
        connection: {
            filename: "./dev.sqlite3",
        },
        useNullAsDefault: true,
    },
};
