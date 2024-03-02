import { DataTypes, Model } from 'sequelize';
import { User } from '../../../../Domain/Entitys/User';
import sequelize from '../../../../../Database/Config/MySQL/database';

export class UserModel extends Model {
    public id!: string;
    public name!: string;
    public lastName!: string;
    public cellphone!: string;
    public email!: string;
    public password!: string;
    public token!: string | null;
    public activationToken!: string | null;
    public verifiedAt!: Date | null;
}

UserModel.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cellphone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
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
    activationToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    verifiedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
});

export default User;