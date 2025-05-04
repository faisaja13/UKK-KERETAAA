import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Pelanggan from "./PelangganModel.js";
import Jadwal from "./JadwalModel.js";

const {DataTypes} = Sequelize;

const OrderTicket = db.define('order_ticket',{
    order_date:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        validate: {
            isDate: true,
        }
    },
    pelangganId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    jadwalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
},{
    freezeTableName: true
}) 

Pelanggan.hasMany(OrderTicket, { as: 'order_tickets' });
OrderTicket.belongsTo(Pelanggan, { as: 'pelanggan', foreignKey: 'pelangganId' });

Jadwal.hasMany(OrderTicket, { as: 'order_tickets' });
OrderTicket.belongsTo(Jadwal, { as: 'jadwal', foreignKey: 'jadwalId' });

export default OrderTicket;