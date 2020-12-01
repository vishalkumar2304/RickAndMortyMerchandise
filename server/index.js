require ('ignore-styles');

require ('@babel/register')({
    ignore: [/(node_modeules)/],
    presets: ['@babel/preset-env', '@babel/preset-react']
})

require('./server');