const path = require('path');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

module.exports = module.exports = Merge(CommonConfig, {
    output: {
        pathinfo: true
    },
    devServer: {
        host: "0.0.0.0",
        port: 8081,
        publicPath: '/',
        proxy: require(path.resolve(__dirname, 'localsproxy/index.js')),
        allowedHosts: ['cppm.local.com'], //允许访问devServer的域名白名单(注意：disableHostCheck这个属性必须设置为false),需要配电脑配hosts
        open: true, //打开默认浏览器
        openPage: 'login.html', //指定自动打开的页面
        disableHostCheck: true, //设置server绕过host检查(默认情况下只有与host属性一致才会通过,这导致用自己的ip都无法访问)
        useLocalIp: true, //打开浏览器去时使用本机Ip(注意：disableHostCheck属性必须设置为true)
    }
});