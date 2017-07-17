module.exports = {
    parser:'postcss-scss',
    plugins: {
        'precss': {},
        'autoprefixer': {},
        'postcss-pxtorem': {
            rootValue: 100,
            propWhiteList: [],
        }
    }
}