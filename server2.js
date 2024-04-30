import { createServer } from 'http';
import 'dotenv/config';
import logger from './middleware/logger.js';
import jsonMiddleware from './middleware/jsonMiddleware.js';
const PORT = process.env.PORT;

const users = [
    { id: 1, name: 'And Sune' },
    { id: 2, name: 'Rew Rgos' }
];

// Route handler for GET /api/users
const getUsersHandler = (req, res) => {
    res.write(JSON.stringify(users));
    res.end();
}

// Route handler for GET /api/users/:id
const getUserByIdHandler = (req, res) => {
    const id = req.url.split('/')[3];
    const user = users.find((user) => user.id === parseInt(id));

     if (user) {
        res.write(JSON.stringify(user));
    } else {
        res.statusCode = 404;
        res.write(JSON.stringify({ message: 'User not found' }));
    }
    res.end();
}

// Not found handler
const notFoundHandler = (req, res) => {
    res.statusCode = 404;
    res.write(JSON.stringify({ message: 'Route not found' }));
    res.end();
}

// Route handler for POST /api/requests
const createUserHandler = (req, res) => {
    let body = '';
    // listen for data
    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const newUser = JSON.parse(body);
        users.push(newUser);
        res.statusCode = 201;
        res.write(JSON.stringify(newUser));
        res.end();
    })
}

const server = createServer((req, res) => {
    logger(req, res, () => {
     jsonMiddleware(req, res, () => {
        if (req.url === '/api/users' && req.method === 'GET') {
            getUsersHandler(req, res);
        } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET') {
            getUserByIdHandler(req, res);
        } else if (req.url === '/api/users' && req.method === 'POST') {
            createUserHandler(req, res);
        } else {
            notFoundHandler(req, res);
        }
        });
    });
});

server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});