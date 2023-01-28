import Sequelize from "sequelize";
import DataTypes from "sequelize";

const sequelize = new Sequelize("sys", "root", "euamoskate", {
  host: "localhost",
  dialect: "mysql",
});

sequelize.authenticate()
  .then((user) => {
    console.log("Connection OK");
  })
  .catch((err) => {
    console.log("Connection its not working ", err);
  });

const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIcrement: true,
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
