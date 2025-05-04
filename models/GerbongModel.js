import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Kereta from "./KeretaModel.js";

const { DataTypes } = Sequelize;

const Gerbong = db.define('gerbong', {
    nama_gerbong: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    kuota: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    keretaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    }
}, {
    freezeTableName: true
})

Kereta.hasMany(Gerbong, { as: 'gerbongs' });
Gerbong.belongsTo(Kereta, { as: 'kereta', foreignKey: 'keretaId' });

export default Gerbong;