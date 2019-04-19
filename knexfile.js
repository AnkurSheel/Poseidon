// Update with your config settings.

module.exports = appData => {
    console.log(appData);
    return {
        development: {
            client: "sqlite3",
            connection: {
                filename: `${appData}/newt-dev.sqlite3`,
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
                filename: `${appData}/newt-test.sqlite3`,
            },
            useNullAsDefault: true,
        },

        production: {
            client: "sqlite3",
            connection: {
                filename: `${appData}/newt.sqlite3`,
            },
            useNullAsDefault: true,
        },
    };
};
