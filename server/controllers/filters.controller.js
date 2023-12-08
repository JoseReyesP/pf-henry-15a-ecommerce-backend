import Product from "../models/product.model";

const filterProducts = async (filterObj, products) => {
    switch (filterObj.filter) {
        case "category":
            if (products.length === 0) { //get products from the db
                products = await Product.find({});
            }
            
            break;
        case "raiting":
            
            break;
        case "price":
            
            break;
        default:
            //return all products
            break;
    }
};

const filter = (req, res) => {
    const {filters} = req.body;
    if (!filters) return res.status(400).json({error: "filters is required"});
    let productsfiltered = [];
    for (let i = 0; i < filters.length; i++) {
        if (!filter[i].filter) return res.status(400).json({error: "specify the filter that you want"});
        filterProducts(filter[i], productsfiltered);
    }
};