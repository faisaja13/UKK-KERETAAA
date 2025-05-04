import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Gerbong from "./GerbongModel.js";

const {DataTypes} = Sequelize;

const Kursi = db.define('kursi',{
    no_kursi:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }

    },
    gerbongId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
},{
    freezeTableName: true
}) 

Gerbong.hasMany(Kursi, { as: 'kursis' });
Kursi.belongsTo(Gerbong, { as: 'gerbong', foreignKey: 'gerbongId' });

export default Kursi;