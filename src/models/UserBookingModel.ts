import { DataTypes, Model, ModelCtor } from "sequelize";
import { sqlController } from "../controllers/sqlController";
import { BookModel } from "./BookModel";
import { UserModel } from "./UserModel";

export class UserBookingModel{
    static UserBooking:ModelCtor<Model<any, any>>;

    static onConnect(){
        UserBookingModel.UserBooking = sqlController.sequelize.define('UserBooking', {
            Due_Back: {
                type: DataTypes.DATE
            },
            ISBN: {
                type: DataTypes.STRING,
                primaryKey: true,
                references:{
                    model: BookModel.Book,
                    key: 'ISBN'
                }
            },
            UserID: {
                type: DataTypes.INTEGER,
                primaryKey:true,
                references:{
                    model: UserModel.User,
                    key: 'UserID'
                }
            } 
        },
            {
                timestamps: false,
                tableName: 'UserBookings'
            }
        );
    }
}


