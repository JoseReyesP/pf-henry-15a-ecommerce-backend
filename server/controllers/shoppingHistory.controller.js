const {ShoppingHistory} = require('../models/shoppingHistory.model.js') ;
const {
  shoppingRecord,
  historyUser,
  readAllPurchase,
} = require('../helpers/shoppingHistory.services.js');


const create = async (req, res) => {
  const { userId, products, totalAmount } = req.body;
  try {
    if (!userId || !products || !totalAmount) {
      res
        .status(400)
        .json({ error: "Por favor complete todos los campos requeridos" });
    }
    const register = await shoppingRecord(req.body);
    res.status(200).json(register);
  } catch (error) {
    res.status(500).json({ error: "Error al registrar la compra: " + error });
  }
};

const list = async (req, res) => {
  try {
    const history = await readAllPurchase();
    res.status(200).json(history);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const historyById = async (req, res) => {
    const {id}= req.params;
  try {
    const history = await historyUser(id);
    res.status(200).json(history);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports ={
    list,
    historyById,
    create
}