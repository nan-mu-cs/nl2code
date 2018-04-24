/**
 * Created by kai on 2018/4/21.
 */
var path = require('path');
 var webpack = require('webpack');
 var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

 module.exports = {
     entry: './lang/sql/ast_to_sql.js',
     output: {
         path: path.resolve(__dirname, 'build'),
         filename: 'ast.js'
     },
     target:"node",
     externals: nodeModules,
     module: {
         loaders: [
             {
                 test: /\.js$/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015']
                 }
             }
         ]
     }
 };