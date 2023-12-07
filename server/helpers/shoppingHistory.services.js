import ShoppingHistory from '../models/shoppingHistory.model'

const shoppingRecord = async (
    userId,
    products,
    totalAmount,
) => {
  try {
    const buys = await ShoppingHistory.create({
      userId,
      products,
      totalAmount,
      purchaseDate: new Date(),
    });

    return buys;
  } catch (error) {
    throw new Error("Error al registrar la compra services: " + error);
  }
};


const readAllPurchase =async ()=>{
    try {
        const allCompras = await ShoppingHistory.find({}, (err, shoppingHistories)=>{
            if (err) {
                res.status(500).json({ error: 'Error al obtener el historial de compras' })
            } else {
                res.status(200).json(allCompras)
            }
       
        })
     
    } catch (error) {
        throw new Error('Error al consultar el historial: ' + error)
    
    }
};

const historyUser= async ()=>{
    try {
        const history = await ShoppingHistory.find({userId: userId}, (err, shoppingHistories)=>{
            if (err) {
                res.status(500).json({ error: 'Error al obtener el historial de compras del usuario' })
            } else {
                res.status(200).json(history)
            }     
        })
     
    } catch (error) {
        throw new Error('Error al consultar el historial: ' + error)
      }
}


module.exports ={
    shoppingRecord,
    historyUser,
    readAllPurchase
} 