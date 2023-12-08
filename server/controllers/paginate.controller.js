import Product from "../models/product.model.js";

const paginate = async (req, res) => {
    //if req.products hay filtro aplicado else traer productos de bd
    // const products = [
    //     {id:1, title: "product1", price: 29.99, category: "ropa de mujer", raiting: 5},
    //     {id:2, title: "product2", price: 19.99, category: "joyeria", raiting: 4},
    //     {id:3, title: "product3", price: 49.99, category: "ropa de mujer", raiting: 5},
    //     {id:4, title: "product4", price: 19.99, category: "ropa de mujer", raiting: 2},
    //     {id:5, title: "product5", price: 39.99, category: "ropa hombre", raiting: 3},
    //     {id:6, title: "product6", price: 25.99, category: "joyeria", raiting: 4},
    //     {id:7, title: "product7", price: 29.99, category: "ropa hombre", raiting: 5},
    // ];
    try {
        const products = await Product.find();
        const {itemsperpage} = req.query;
        if (itemsperpage) {
            let actualPage = 1;
            const totalPages = Math.ceil(products.length/itemsperpage);
            const productsPaginated = [];
            for (let i = 0; i < totalPages; i++) {
                const lastIndex = actualPage * itemsperpage;
                const firstIndex = lastIndex - itemsperpage;
                const page = products.slice(firstIndex, lastIndex);
                productsPaginated.push(page);
                actualPage++;
            }
            res.status(200).json({totalPages, products: productsPaginated});
        }
        else res.status(400).json({error: "itemsperpage is required"});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

export default { paginate };