import { DataTypes } from "sequelize";
import { sqlController } from "../controllers/sqlController";


export class BookModel{
    static Book;

    static onConnect(){
        BookModel.Book = sqlController.sequelize.define('Book', {
            Title: {
                type: DataTypes.STRING
            },
            Author: {
                type: DataTypes.STRING
            },
            ISBN: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            Num_Owned: {
                type: DataTypes.INTEGER
            } 
        },
            {
                timestamps: false,
                tableName: 'Books'
            }
        )
    }
}


