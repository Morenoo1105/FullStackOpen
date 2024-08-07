/*
require("dotenv").config();
const { Sequelize, QueryTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, { logging: false });

const main = async () => {
  try {
    await sequelize.authenticate();
    const blogs = await sequelize.query("SELECT * FROM blogs", {
      type: QueryTypes.SELECT,
    });
    blogs.forEach((blog) => {
      const { author, title, likes } = blog;
      console.log(`${author}: '${title}', ${likes} likes`);
    });
    sequelize.close();
  } catch (error) {
    console.error("Unable to close database: ", error);
  }
};
*/
