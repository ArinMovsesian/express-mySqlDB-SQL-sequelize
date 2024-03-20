const path = require("path");
const express = require("express");
const adminController = require("../controllers/admin");
const router = express.Router();

// const rootDir = require("../utils/path");

// /admin/add-product => GET
router.get("/add-product", adminController.getAppProduct);

// /admin/products
router.get("/products", adminController.getProducts);

// /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);

router.get("/edit-product/:productId", adminController.getEditProduct);

router.post("/edit-product", adminController.postEditProduct);

router.post("/delete-product", adminController.postDeleteProduct);
module.exports = router;
