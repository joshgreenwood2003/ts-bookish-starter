import { ConnectionConfiguration } from 'tedious';
import { Connection } from 'tedious';
//const { Sequelize } = require('sequelize');

const config: ConnectionConfiguration = {
    'server': 'DESERTTORTOISE',
    'authentication': {
        'type': 'default',
        'options': {
            'userName': 'BookishUser',
            'password': '£3.40MealDeal'
        }
    },
    'options': {
        'port': 1433,
        'database': 'Bookish',
        'trustServerCertificate': true
    }
};



export class sqlController {
    public static connection = new Connection(config);
    public static connected = false;

    public static Connect() {
        sqlController.connection.on('connect', function (err) {
            if (err) {
                console.log('Error: ', err);
            }
            sqlController.connected = true;
            console.log('Connected!');
        });
        sqlController.connection.connect();
    }



}