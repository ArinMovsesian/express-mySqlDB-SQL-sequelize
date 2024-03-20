const path = require("path");
const express = require("express");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const bodyParser = require("body-parser");
const errorController = require("./controllers/error");
// const expressHbs = require("express-handlebars");

const sequelize = require("./utils/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const cartItem = require("./models/cart-item");
const Order = require("./models/order");
const orderItem = require("./models/order-item");

const app = express();

// app.engine("hbs", expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'})); //-------> handlebars templateEngine implementation
// app.set("view engine", "hbs"); //-------> handlebars templateEngine implementation
//app.set("view engine", "pug"); //-------> pug templateEngine implementation
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);

app.use(shopRoutes);

app.use(errorController.get404);

//One-To-Many
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
//This states that a One-to-One or One-to-Many relationship exists between Product and User with foreign key defined in Product
User.hasMany(Product);
//This states that a One-to-Many relationship exists between User and Product with foreign key defined in Product

// One-To-Many
// User.hasOne(Cart);
Cart.belongsTo(User);
//This states that a One-to-One or One-to-Many relationship exists between Cart and User with foreign key defined in Cart
User.hasMany(Cart);
//This states that a One-to-One relationship exists between User and Cart with foreign key defined in Cart

//Many-To-Many
Cart.belongsToMany(Product, { through: cartItem });
//This states that a Many-to-Many relationship exists between Cart and Product a junction table cartItem
Product.belongsToMany(Cart, { through: cartItem });
//This states that a Many-to-Many relationship exists between Product and Cart a junction table cartItem

// One-To-Many
Order.belongsTo(User);
User.hasMany(Order);

//Many-To-Many
Order.belongsToMany(Product, {through: orderItem});
Product.belongsToMany(Order, {through: orderItem});

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    return User.findByPk(1);
    // console.log(result);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: "Arin",
        email: "arin.movsesian@gmail.com",
      });
    }
    // return Promise.resolve(user);
    return user; //--> automatically create promise
  })
  .then((user) => {
    // console.log('user:', user);
    return user.createCart();
  })
  .then((cart) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
