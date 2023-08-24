const { messages } = require("../helpers");
const { cartService } = require("../services");

async function addItem(req, res) {
    try {
        const { id } = req.account;
        const { id_product } = req.body;
        const result = await cartService.addItem(id, id_product);
        res.status(result.status).json(messages.response(result));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getItems(req, res) {
    try {
        const { id } = req.account;
        const result = await cartService.getItems(id);
        res.status(result.status).json(messages.response(result));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function editItem(req, res) {
    try {
        const { id_cart_item, id_product, qty } = req.body;
        const result = await cartService.editItem(
            id_cart_item,
            id_product,
            +qty
        );
        res.status(result.status).json(messages.response(result));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function deleteItem(req, res) {
    try {
        const { id } = req.params;
        const result = await cartService.deleteItem(id);
        res.status(result.status).json(messages.response(result));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function resetCart(req, res) {
    try {
        const { id } = req.account;
        const result = await cartService.resetCart(id);
        res.status(result.status).json(messages.response(result));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getTotal(req, res) {
    try {
        const { id } = req.account;
        const result = await cartService.getTotal(id);
        res.status(result.status).json(messages.response(result));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    addItem,
    getItems,
    editItem,
    deleteItem,
    resetCart,
    getTotal,
};
