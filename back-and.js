const http = require('http')
const fs = require('fs')

const server = http.createServer((request, response) => {
    switch (request.url) {
        case '/': {
            response.statusCode = 200
            response.setHeader('Content-Type', 'text/html')
            response.end('Hello Roman!')
            break
        }
        case '/home': {
            response.statusCode = 200
            response.setHeader('Content-Type', 'text/plain')
            response.end(JSON.stringify('HOME'))
            break
        }
        case '/about': {
            response.statusCode = 200
            response.setHeader('Content-Type', 'text/plain')
            response.end(JSON.stringify('ABOUT'))
            break
        }
        case '/tables': {
            response.statusCode = 200
            response.setHeader('Content-Type', 'application/json')
            response.end(JSON.stringify([
                {tables1: 'ROMAN'},
                {tables2: 'NIKITA'},
                {tables3: 'LIZA'},
            ]))
            break
        }
        case '/users': {
            response.statusCode = 200
            response.setHeader('Content-Type', 'application/json')
            response.end(JSON.stringify([
                {user1: 'ROMAN', age: 25},
                {user2: 'NIKITA', age: 25},
                {user3: 'LIZA', age: 21}
            ]))
            break
        }
        case '/account': {
            response.statusCode = 200
            response.setHeader('Content-Type', 'text/plain')
            response.end(JSON.stringify('100 limit'))
            break
        }
        case '/comment': {
            response.statusCode = 400
            response.setHeader('Content-Type', 'text/plain')
            response.end(JSON.stringify({error: 'invalid lenght text'}))
            break
        }
        case '/feedback': {
            response.statusCode = 400
            response.setHeader('Content-Type', 'text/plain')
            response.end(JSON.stringify({error: 'invalid lenght text'}))
        }
        default: {
            response.end()
        }
    }
})


server.listen(3000)
