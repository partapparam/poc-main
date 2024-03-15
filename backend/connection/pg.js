import pg from 'pg';
import { environment } from '../environments/environment.js';

const { Client } = pg;

let connectionConfig = {};
let serverName = "";

// Change accordingly
connectionConfig = {
    host     : environment.host,
    user     : environment.user,
    password : environment.password,
    database : environment.database,
    port     : environment.port,
    ssl: {
        rejectUnauthorized: false,
        },
};
serverName = "development"


export const connection = new Client(connectionConfig);

connection.connect((err) => {
    if (err) {
        console.error('Connection error', err.stack, connectionConfig);
    } else {
        console.log('Connected to '+ serverName + ' database');
    }
});
