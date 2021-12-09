const express = require("express");
const router = express.Router();
const Cart = require("../schemas/cart");

const existValid = async (name, tmp, res) => {
    if (tmp == null || tmp == undefined) {
        await res.status(400).send({ errorMessage: `${name} doesn't exist` });

        return;
    }
};

// get all carts
router.get("/carts", async (req, res) => {
    const carts = await Cart.find({}).exec();

    res.send({ payload: carts, message: "get carts success" });
});

// create cart
router.post("/carts", async (req, res) => {
    const { product_id, seller_id, buyer_id } = req.body;
    console.log(req.body);
    existValid("product_id", product_id, res);
    existValid("seller_id", seller_id, res);
    existValid("buyer_id", buyer_id, res);

    const cartExist = await Cart.find({
        $and: [
            { productId: product_id },
            { buyerId: buyer_id },
            { sellerId: seller_id },
        ],
    }).exec();
    console.log(cartExist);
    if (cartExist.length) {
        res.status(400).send({ message: "carts already exists" });
        return;
    }

    const cart = new Cart({
        productId: product_id,
        sellerId: seller_id,
        buyerId: buyer_id,
    });
    await cart.save();

    res.send({ message: "create cart success" });
});

// get carts by user(buyer)
router.get("/carts/users/:buyerId", async (req, res) => {
    const { buyerId } = req.params;
    const cartsByUser = await Cart.find({ buyerId }).exec();
    if (!cartsByUser)
        res.status(400).send({
            message: "get carts by user fail",
        });

    res.send({
        payload: cartsByUser,
        message: "get carts by user success",
    });
});

// cart check
router.post("/carts/check", async (req, res) => {
    console.log("체크!");
    const { product_id, buyer_id, seller_id } = req.body;
    const cartCheck = await Cart.find({
        $and: [
            { productId: product_id },
            { buyerId: buyer_id },
            { sellerId: seller_id },
        ],
    }).exec();
    if (cartCheck.length === 0) {
        res.send({
            message: "cart item doesn't exist",
            payload: {
                checked: false,
            },
        });
        return;
    }
    res.send({
        payload: {
            ...cartCheck,
            checked: true,
        },
        message: "cart item exist",
    });
});

//cart delete
router.delete("/carts/:cartId", async (req, res) => {
    const { cartId } = req.params;
    let cart = null;
    try {
        cart = await Cart.findById(cartId).exec();

        // console.log(cart);
        await cart.delete();
        res.send({ message: "delete cart success" });
    } catch {
        res.status(400).send({
            message: "cart delete fails",
        });
    }
});

//cart by user delete
router.delete("/carts/user/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        await Cart.deleteMany({ buyerId: userId }).exec();
        res.send({ message: "delete cart success" });
    } catch {
        res.status(400).send({
            message: "cart delete fails",
        });
    }
});

//cart by product
router.delete("/product/:productId/carts", async (req, res) => {
    const { productId } = req.params;
    let cart = null;
    try {
        cart = await Cart.deleteMany({ productId }).exec();
        res.send({ message: "delete cart success" });
    } catch {
        res.status(400).send({
            message: "cart delete fails",
        });
    }
});

module.exports = router;
