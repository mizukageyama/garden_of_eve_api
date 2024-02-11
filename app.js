require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const authRouter = require("./api/auth/auth.router");
const tokenRouter = require("./api/app_token/token.router");
const userRouter = require("./api/users/user.router");
const productRouter = require("./api/products/products.router");
const cartRouter = require("./api/cart/cart.router");
const discountRouter = require("./api/discounts/discounts.router");
const categoryRouter = require("./api/categories/categories.router");
const orderItemRouter = require("./api/order_details/order_details.router");
const orderRouter = require("./api/orders/order.router");
const favoritesRouter = require("./api/favorites/favorites.router");
const userAddrRouter = require("./api/delivery_address/delivery_addr.router");
const imageUploadRouter = require("./api/product_images/prod_img.router");

// for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/token", tokenRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/discounts", discountRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/order_items", orderItemRouter);
app.use("/api/orders", orderRouter);
app.use("/api/favorites", favoritesRouter);
app.use("/api/user_address", userAddrRouter);
app.use("/api/upload_images", imageUploadRouter);

//Start listen to the server
app.listen(process.env.APP_PORT || 3000, () => {
    console.log('Connected to Localhost: ', process.env.APP_PORT);
});