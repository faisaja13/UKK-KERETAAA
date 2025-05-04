import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import OrderTicket from "./OrderTicketModel.js";
import Kursi from "./KursiModel.js";

const {DataTypes} = Sequelize;

const OrderDetail = db.define('order_detail',{
    nik:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [16, 16]
        }
    },
    nama_penumpang:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    orderTicketId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    kursiId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
},{
    freezeTableName: true
}) 

OrderTicket.hasMany(OrderDetail, { as: 'order_details' });
OrderDetail.belongsTo(OrderTicket, { as: 'order_ticket', foreignKey: 'orderTicketId' });

Kursi.hasMany(OrderDetail, { as: 'order_details' });
OrderDetail.belongsTo(Kursi, { as: 'kursi', foreignKey: 'kursiId' });

export default OrderDetail;