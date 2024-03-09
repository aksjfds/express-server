const express = require('express')
const app = express()
const STD = require('./test').STD

const std = new STD()


std.then('请输入要发送文件的地址：', path => {
    path = path.replace(/"/g, '')
    path = path.slice(3)

    app.get('/getfile', (req, res) => {
        console.log('有新的访问, 访问者ip为:' + req.ip);
        res.download('../../../../../' + path)
    })



    std.resolve()
}).then('请输入要监听的端口号,如3002', port => {
    app.listen(port, () => {
        console.log('开始监听, 端口: ' + port);
        console.log('请将下列地址发给你的朋友:');
        console.log(getIPAdress() + ':' + port + '/getfile');
    })

    std.resolve()
}).run()



function getIPAdress() {
    const os = require('os');

    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}