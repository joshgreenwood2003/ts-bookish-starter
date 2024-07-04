import { BookModel } from '../models/BookModel';
import { Router, Request, Response } from 'express';
import { sqlController } from './sqlController';
import { UserBookingModel } from '../models/UserBookingModel';


class BookController {
    router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/all', this.getAll.bind(this));
        this.router.get('/bookstatus/:id', this.bookStatus.bind(this));
        this.router.get('/:id', this.getBook.bind(this));
        this.router.get('/author/:name', this.searchByAuthor.bind(this));
        this.router.get('/title/:name', this.searchByTitle.bind(this));
        this.router.post('/', this.createBook.bind(this));
  }

    

    async getBook(req: Request, res: Response) {
        if (sqlController.connected) {
            try {
                const book = await BookModel.Book.findOne({
                    where: {
                        ISBN: req.params.id,
                    },
                })
                return res.status(200).json(book);

            }
            
            catch {
                return res.status(500).json({
                    error: 'server_error',
                    error_description: 'Unknown error',
                });
            }
        }
        else {
            return res.status(500).json({
                error: 'server_error',
                error_description: 'Could not connect to database.',
            });
        }

    }

    async getAll(req: Request, res: Response) {
        if (sqlController.connected) {
            try {
                const books = await BookModel.Book.findAll({order:[['Title','ASC']]});
                return res.status(200).json(books);
            }
            catch (e) {
                return res.status(500).json({
                    error: 'server_error',
                    error_description: 'Unknown error: ' + e,
                });
            }
        }
        else {
            return res.status(500).json({
                error: 'server_error',
                error_description: 'Could not connect to database',
            });
        }
    }

    async searchByTitle(req: Request, res: Response) {
        if (sqlController.connected) {
            try {
                const books = await BookModel.Book.findAll({ where: {
                    Title: req.params.name,
                },order:[['Title','ASC']]});
                return res.status(200).json(books);
            }
            catch (e) {
                return res.status(500).json({
                    error: 'server_error',
                    error_description: 'Unknown error: ' + e,
                });
            }
        }
        else {
            return res.status(500).json({
                error: 'server_error',
                error_description: 'Could not connect to database',
            });
        }
    }
    async searchByAuthor(req: Request, res: Response) {
        if (sqlController.connected) {
            try {
                const books = await BookModel.Book.findAll({ where: {
                    Author: req.params.name,
                },order:[['Title','ASC']]});
                return res.status(200).json(books);
            }
            catch (e) {
                return res.status(500).json({
                    error: 'server_error',
                    error_description: 'Unknown error: ' + e,
                });
            }
        }
        else {
            return res.status(500).json({
                error: 'server_error',
                error_description: 'Could not connect to database',
            });
        }
    }

    async createBook(req: Request, res: Response) {
        if (sqlController.connected) {
            const newBook = BookModel.Book.build(req.body);
            try {
                await newBook.save();
                return res.status(200).json({ msg: "Saved successfully" })
            }
            catch (e) {
                return res.status(500).json({
                    error: 'server_error',
                    error_description: 'Unknown error: ' + e,
                })
            };

        }
        else {
            return res.status(500).json({
                error: 'server_error',
                error_description: 'Could not connect to database',
            });
        }

    }

    async bookStatus(req: Request, res: Response) {
        if (sqlController.connected) {
            try {
                const book:any = await BookModel.Book.findOne({
                    attributes:['Num_Owned'],
                    where: {
                        ISBN: req.params.id,
                    },
                })
                const bookingsOfBook:any = await UserBookingModel.UserBooking.findAll({
                    attributes:['Due_Back','UserID'],
                    where: {
                        ISBN: req.params.id,
                    },
                })
                return res.status(200).json({totalNumber:book.Num_Owned,bookings:bookingsOfBook,totalAvailable:book.Num_Owned-bookingsOfBook.length});

            }
            
            catch(e) {
                console.log(e)
                return res.status(500).json({
                    error: 'server_error',
                    error_description: 'Unknown error',
                });
            }
        }
        else {
            return res.status(500).json({
                error: 'server_error',
                error_description: 'Could not connect to database.',
            });
        }

    }



}

export default new BookController().router;
