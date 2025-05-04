import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Kereta from "./KeretaModel.js";

const { DataTypes } = Sequelize;

const Jadwal = db.define('jadwal', {
    asal_keberangkatan: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }

    },
    tujuan_keberangkatan: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    tanggal_berangkat: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    tanggal_kedatangan: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    harga: {
        type: DataTypes.DOUBLE,
        validate: {
            min: 0
        }
    },
    keretaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    }
}, {
    freezeTableName: true
})

Kereta.hasMany(Jadwal, { as: 'jadwals' });
Jadwal.belongsTo(Kereta, { as: 'kereta', foreignKey: 'keretaId' });

export default Jadwal;