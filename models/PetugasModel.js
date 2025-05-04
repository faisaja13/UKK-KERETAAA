import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";

const {DataTypes} = Sequelize;

const Petugas = db.define('petugas',{
    name_petugas:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    alamat:{
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    telepon:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    refresh_token: {
        type: DataTypes.TEXT
    }
},{
    freezeTableName: true
}) 

User.hasMany(Petugas, { as: 'petugass' });
Petugas.belongsTo(User, { as: 'user', foreignKey: 'userId' });

export default Petugas;