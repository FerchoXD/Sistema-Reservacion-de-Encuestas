import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../../Database/Config/MySQL/database';
import { User } from "../../../Domain/Entities/User";

export class UserModel extends Model {
    public id!: string;
    public name!: string;
    public password!: string;
    public token!: string | null;
}

UserModel.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token:{
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
});

export default User;