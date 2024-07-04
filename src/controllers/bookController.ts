import { BookModel } from '../models/BookModel';
import { Router, Request, Response } from 'express';
import { sqlController } from './sqlController';

class BookController {
    router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/all', this.getAll.bind(this));
        this.router.get('/:id', this.getBook.bind(this));
        this.router.post('/', this.createBook.bind(this));
    }

    getBook(req: Request, res: Response) {
        if (sqlController.connected){
            try{}
            catch{
                return res.status(500).json({
                    error: 'server_error',
                    error_description: 'Unknown error',
                });
            }
        }
        else{
            return res.status(500).json({
                error: 'server_error',
                error_description: 'Could not connect to database.',
            });
        }

    }

    async getAll(req: Request, res: Response) {
        if (sqlController.connected) {
            try{
                const books = await BookModel.Book.findAll();
                return res.status(200).json(books);
            }
            catch{
                return res.status(500).json({
                    error: 'server_error',
                    error_description: 'Could not connect to database.',
                });
            }   
        }
        else{
            return res.status(500).json({
                error: 'server_error',
                error_description: 'Could not connect to database',
            });
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
