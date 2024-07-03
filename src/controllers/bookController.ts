import { Book } from '../classes/Book';


import { Router, Request, Response } from 'express';
import { sqlController } from './sqlController';
const SQLRequest = require('tedious').Request;


class BookController {
    router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/all', this.getAll.bind(this));
        this.router.get('/:id', this.getBook.bind(this));

        this.router.post('/', this.createBook.bind(this));
    }

    getBook(req: Request, res: Response) {
        // TODO: implement functionality


        return res.status(500).json({
            error: 'server_error',
            error_description: 'Endpoint not implemented yet.',
        });
    }

    getAll(req: Request, res: Response) {
        // TODO: implement functionality
        if (sqlController.connected) {
            const books: Book[] = [];

            const SQLCode = new SQLRequest('SELECT * FROM Books', function (err) {
                if (err) {
                    console.log(err);
                }
            });

            SQLCode.on('row', function (columns) {
                books.push(new Book(columns[0].value, columns[1].value, columns[2].value, columns[3].value));
            });

            SQLCode.on('requestCompleted', function (rowCount) {
                return res.status(200).json({ rows: rowCount, books: books });
            });
            SQLCode.on('error', function (e) {
                console.log(e);
            });

            sqlController.connection.execSql(SQLCode);

        }


    }


    createBook(req: Request, res: Response) {
        // TODO: implement functionality
        return res.status(500).json({
            error: 'server_error',
            error_description: 'Endpoint not implemented yet.',
        });
    }
}

export default new BookController().router;
