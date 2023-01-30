import Sequelize from "sequelize";
import DataTypes from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize("sys", "root", `${process.env.DB_PASSWORD}`, {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection OK");
  })
  .catch((err) => {
    console.log("Connection its not working ", err);
  });

const Comment = sequelize.define("comments", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Comments table created!");
  })
  .catch((err) => {
    console.log("Unable to create ", err);
  });

export default Comment;
