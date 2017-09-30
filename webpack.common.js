const path = require('path');
const webpack = require('webpack');
const extractTextPlugin = require('extract-text-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const glob = require('glob');

const ASSET_PATH = process.env.ASSET_PATH || '/';
const publish_path = path.resolve(__dirname, 'dist/');

let config = {
    entry: {
        jquery: path.join(__dirname, '/vendors/jquery.min.js'),
        url: path.join(__dirname, '/vendors/url.min.js'),
        layer: [path.join(__dirname, '/vendors/layer/layer.js'), path.join(__dirname, '/vendors/layer/skin/default/layer.css')]
    },
    context: path.resolve(__dirname, "pages"),
    output: {
        filename: 'assets/js/[name].[chunkhash].bundle.js',
        path: publish_path, //告诉webpack将文件生成到这个路径下
        sourceMapFilename: '[file].map',
        publicPath: ASSET_PATH //告诉webpack-dev-server静态资源的存放路径
    },
    module: {
        rules: [{
            test: path.join(__dirname, '/vendors/jquery.min.js'),
            loader: 'expose-loader?$!expose-loader?jQuery'
        },{
            test: require.resolve('react'),
            loader: 'expose-loader?React'
        }, {
            test: require.resolve('react-dom'),
            loader: 'expose-loader?ReactDOM'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        }, {
            test: /\.less$/,
            use: extractTextPlugin.extract(['css-loader', 'less-loader'])
        }, {
            test: /\.css$/,
            use: extractTextPlugin.extract(['css-loader'])
        }, {
            test: /\.(png|svg|jpg|jpeg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 1000
                }
            }]
        }, {
            test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
            use: [{
                loader: "file-loader?name=assets/fonts/[name].[hash].[ext]"
            }]
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'React': 'react',
            'ReactDOM': 'react-dom'
        }),
        new copyWebpackPlugin([{ 
            from: path.resolve(__dirname, "vendors"),
            to: path.resolve(publish_path, 'assets/vendors/')
        }]),
        new extractTextPlugin('assets/css/[name].[contenthash].bundle.css'),
        new webpack.DefinePlugin({
            'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
        })
    ],
    resolve: {
        alias: {
            'components': path.join(__dirname, 'components'),
            'vendors': path.join(__dirname, 'vendors')
        }
    },
    devtool: 'cheap-module-source-map',
}

//业务入口文件所在的目录
let chunknames = [];
let entries = [];
let entryDir = path.join(__dirname, 'pages/');
glob.sync(entryDir + '*').forEach(function (entry) {
    let basename = path.basename(entry);
    if(basename !== 'admin'){
        chunknames.push(basename);
        entries.push({
            name: basename,
            path: entry
        });
    }
});
// let adminEntryDir = path.join(__dirname, 'pages/admin/');
// glob.sync(adminEntryDir + '*').forEach(function (entry) {
//     let basename = path.basename(entry);
//     chunknames.push('admin/' + basename);
//     entries.push({
//         name: 'admin/' + basename,
//         path: entry
//     });
// });

entries.forEach(function (entry) {
    //添加entry
    config.entry[entry.name] = [path.join(entry.path, 'index.js')];
    //生成html
    config.plugins.push(new htmlWebpackPlugin({
        filename: entry.name + '.html',
        template: entry.path + '/template.html',
        favicon: __dirname + '/favicon.ico',
        chunks: ['jquery', 'url', 'layer', 'common', entry.name],
        chunksSortMode: 'manual',
        hash: true,
        minify: {
            removeComments: true,
            collapseWhitespace: true
        }
    }));
});

config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    minChunks: 2, //只要有两个以上的模块包含同样的模块就提取到公共js中
    chunks: chunknames
}));

module.exports = config;