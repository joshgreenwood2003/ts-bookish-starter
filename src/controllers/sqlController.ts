import { Sequelize } from 'sequelize';
import { ConnectionConfiguration } from 'tedious';
import { Connection } from 'tedious';
import { BookModel } from '../models/BookModel';







// const sequelize = new Sequelize("mssql://BookishUser:£3.40MealDeal@Bookish.database.windows.net:1433");
// sequelize.query('');
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
    public static sequelize:Sequelize;
    public static Connect() {



        sqlController.sequelize = new Sequelize('Bookish', 'BookishUser', '£3.40MealDeal', {
            host: 'localhost',       // or your server IP/hostname
            dialect: 'mssql',
            dialectOptions: {
              options: {
                encrypt: true,       // Use this if you're connecting to Azure SQL Database
                trustServerCertificate: true // Use this if you're connecting to a local SQL Server instance without SSL
              }
            },
            logging: false           // Disable logging; default: console.log
          });
          
          // Test the connection
          (async () => {
            try {
              await sqlController.sequelize.authenticate();
              sqlController.connected = true;
              await this.sequelize.sync({force:true});
              BookModel.onConnect();
              console.log('Connection has been established successfully.');
            } catch (error) {
              console.error('Unable to connect to the database:', error);
            }
          })();
        
        
          return;











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