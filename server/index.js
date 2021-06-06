const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => { console.log(`server listen on port ${PORT}`)})

app.ws('/', (ws, request) => {
    ws.on('message', (msg) => {
        let message = JSON.parse(msg)
        switch(message.method){
            case 'connection':
                connectionHandler(ws, message)
                break
        }
    })
})

const connectionHandler = (ws, msg) => {
    ws.id = msg.id
    broadcastConnection(ws, msg)
}

const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach(client => {
        if(client.id === msg.id){
            client.send(`Пользователь ${msg.username} подключился`)
        }
    })
}