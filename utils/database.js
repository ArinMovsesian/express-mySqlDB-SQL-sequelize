//********* sequelize *********/

const Sequelize = require("sequelize");
const sequelize = new Sequelize("node-complete", "root", "Arin@1992", {
  dialect: "mysql",
  host: "localhost",
});
module.exports = sequelize;