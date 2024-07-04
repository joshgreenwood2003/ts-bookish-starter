import { DataTypes, Model, ModelCtor, Sequelize } from "sequelize";
import { sqlController } from "../controllers/sqlController";


export class BookModel{
    static Book:ModelCtor<Model<any, any>>;

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


