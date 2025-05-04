import {Sequelize} from "sequelize"

const db = new Sequelize ('ukk_kereta', 'root', '', {
    host: "localhost",
    dialect: "mysql"
})

export default db;