import { DataTypes, Model, ModelCtor } from "sequelize";
import { sqlController } from "../controllers/sqlController";


export class UserModel{
    static User:ModelCtor<Model<any, any>>;

    static onConnect(){
        UserModel.User = sqlController.sequelize.define('User', {
            Username: {
                type: DataTypes.STRING
            },
            Password: {
                type: DataTypes.STRING
            },
            UserID:{
                type: DataTypes.INTEGER,
                primaryKey: true
            }
        },
            {
                timestamps: false,
                tableName: 'Users'
            }
        )
    }
}


