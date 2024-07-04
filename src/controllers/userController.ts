import { UserModel } from '../models/UserModel';
import { Router, Request, Response } from 'express';
import { sqlController } from './sqlController';
import { UserBookingModel } from '../models/UserBookingModel';

class BookController {
    router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/checkedout', this.checkedOut.bind(this));
        //this.router.get('/:id', this.getBook.bind(this));
        //this.router.post('/', this.createBook.bind(this));
    }

    async checkedOut(req: Request, res: Response) {
        if (sqlController.connected) {
            try{
                const user = await UserBookingModel.UserBooking.findAll({
                    attributes:['ISBN','Due_Back'],
                    where: {
                        UserID: req.query.id,
                    },
                });
                return res.status(200).json(user);
            }
            catch (e) {
                return res.status(500).json({
                    error: 'server_error',
                    error_description: 'Unspecified error: ' + e,
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
