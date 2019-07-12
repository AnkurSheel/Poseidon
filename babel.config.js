module.exports = api => {
    api.cache(true); //new babel 7 feature
    return {
        presets: [
            [
                '@babel/env',
                {
                    targets: {
                        electron: '5',
                    },
                },
            ],
            '@babel/typescript',
            '@babel/react',
        ],
        plugins: ['@babel/proposal-class-properties', 'react-hot-loader/babel'],
    };
};
