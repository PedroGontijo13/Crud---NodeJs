import Sequelize from "sequelize";
import DataTypes from "sequelize";
import dotenv from 'dotenv'

dotenv.config()

const sequelize = new Sequelize("sys", "root", `${process.env.DB_PASSWORD}`, {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then((user) => {
    console.log("Connection OK");
  })
  .catch((err) => {
    console.log("Connection its not working ", err);
  });

const User = sequelize.define("users", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("User table created!");
  })
  .catch((err) => {
    console.log("Unable to create ", err);
  });

export default User;
