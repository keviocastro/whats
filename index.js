const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();

client.on('qr', async (qr) => {
    qrcode.generate(qr, { small: true }, function (qrcode) {
        console.log(qrcode);
    });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('xablau');
    }
});

app.get('/send', async (req, res) => {

    const chatId = `${req.body.number}@c.us`;
    const message = await client.sendMessage(chatId, req.body.message);
    res.json({ message });
});

client.initialize();