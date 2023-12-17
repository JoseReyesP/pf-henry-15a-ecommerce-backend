import Product from "../models/product.model.js";

const filterProducts = async (filterObj, productsfiltered) => {
  let products = productsfiltered;
  //console.log("products", products);
  switch (filterObj.filter) {
    case "category":
      if (products.length == 0) {
        //first filter: get products from the db
        products = await Product.find({ isDeleted: false })
          .populate({
            path: "category",
            select: "name",
          })
          .populate({
            path: "reviews",
            select: "user rating comment",
            populate: { path: "user", select: "name lastname email" },
          });
      }
      //comes filtered previously
      return products.filter(
        (product) => product.category.name == filterObj.type
      );

    case "rating":
      if (products.length == 0) {
        //first filter: get products from the db
        products = await Product.find({ isDeleted: false })
          .populate({
            path: "category",
            select: "name",
          })
          .populate({
            path: "reviews",
            select: "user rating comment",
            populate: { path: "user", select: "name lastname email" },
          });
      }
      //comes filtered previously
      return products.sort((a, b) => {
        let ratingA = a.averageRating;
        let ratingB = b.averageRating;
        if (!a.averageRating) {
          ratingA = 0;
        }
        if (!b.averageRating) {
          ratingB = 0;
        }
        if (ratingA > ratingB) {
          //console.log(ratingA > ratingB, " mayor price: ", ratingA, ratingB);
          return filterObj.order === "des" ? -1 : 1;
        }
        if (ratingA < ratingB) {
          //console.log(ratingA < ratingB, " menor price: ", ratingA, ratingB);
          return filterObj.order === "asc" ? -1 : 1;
        }
        //console.log(ratingA === ratingB, " price: ", ratingA, ratingB);
        return 0;
      });

    case "price":
      if (products.length == 0) {
        //first filter: get products from the db
        products = await Product.find({ isDeleted: false })
          .populate({
            path: "category",
            select: "name",
          })
          .populate({
            path: "reviews",
            select: "user rating comment",
            populate: { path: "user", select: "name lastname email" },
          })
          .sort({ price: filterObj.order === "asc" ? 1 : -1 });
        return products;
      }
      //comes filtered previously
      return products.sort((a, b) => {
        // let price1 = parseFloat(a.price);
        // let price2 = parseFloat(b.price);
        if (a.price > b.price) {
          //console.log(price1 > price2, " mayoe price: ", price1, price2);
          return filterObj.order === "des" ? -1 : 1;
        } else if (a.price < b.price) {
          //console.log(price1 < price2, " menor price: ", price1, price2);
          return filterObj.order === "asc" ? -1 : 1;
        }
        //console.log(price1 === price2, " price: ", price1, price2);
        return 0;
      });

    default:
      //return all products
      return await Product.find({ isDeleted: false })
        .populate({
          path: "category",
          select: "name",
        })
        .populate({
          path: "reviews",
          select: "user rating comment",
          populate: { path: "user", select: "name lastname email" },
        });
  }
};

const filter = async (req, res, next) => {
  const { price, category, rating, minprice, maxprice } = req.query;
  //console.log(price, rating, category);
  if (!price && !category && !rating) return next(); //it doesn't filters applied then go to paginate
  try {
    let productsfiltered = [];
    if (price){
      if(!price === 'asc' || !price === 'des' || !price === 'range') throw new Error('option of filter by price is not valid');
      if (price === 'range') {
        if (productsfiltered.length == 0) {
          productsfiltered = await Product.find( { price: { $gte: Number(minprice), $lte: Number(maxprice) }} );
          //console.log("Products", products);
        }
        else{
          productsfiltered = productsfiltered.filter(product => {
            product.price >= Number(minprice) || product.price <= Number(maxprice)
          });
        }
      }
      if (productsfiltered.length == 0) {
        //first filter: get products from the db
        productsfiltered = await Product.find({ isDeleted: false })
          .populate({
            path: "category",
            select: "name",
          })
          .populate({
            path: "reviews",
            select: "user rating comment",
            populate: { path: "user", select: "name lastname email" },
          })
          .sort({ price: price === "asc" ? 1 : -1 });
          //console.log("BD", productsfiltered);
      }
      else{
        //comes filtered previously
          productsfiltered = productsfiltered.sort((a, b) => {
          // let price1 = parseFloat(a.price);
          // let price2 = parseFloat(b.price);
          if (a.price > b.price) {
            //console.log(price1 > price2, " mayoe price: ", price1, price2);
            return price === "des" ? -1 : 1;
          } else if (a.price < b.price) {
            //console.log(price1 < price2, " menor price: ", price1, price2);
            return price === "asc" ? -1 : 1;
          }
          //console.log(price1 === price2, " price: ", price1, price2);
          return 0;
        });
      }
    }
    if (rating) {
      if(!rating === 'asc' || !rating === 'des') throw new Error('option of filter by rating is not valid');
      if (productsfiltered.length == 0) {
        //first filter: get products from the db
        productsfiltered = await Product.find({ isDeleted: false })
          .populate({
            path: "category",
            select: "name",
          })
          .populate({
            path: "reviews",
            select: "user rating comment",
            populate: { path: "user", select: "name lastname email" },
          });
      }
      //comes filtered previously
      productsfiltered = productsfiltered.sort((a, b) => {
        let ratingA = a.averageRating;
        let ratingB = b.averageRating;
        if (!a.averageRating) {
          ratingA = 0;
        }
        if (!b.averageRating) {
          ratingB = 0;
        }
        if (ratingA > ratingB) {
          return rating === "des" ? -1 : 1;
        }
        if (ratingA < ratingB) {
          return rating === "asc" ? -1 : 1;
        }
        return 0;
      });
    }
    if (category) {
      if (productsfiltered.length == 0) {
        //first filter: get products from the db
        productsfiltered = await Product.find({ isDeleted: false })
          .populate({
            path: "category",
            select: "name",
          })
          .populate({
            path: "reviews",
            select: "user rating comment",
            populate: { path: "user", select: "name lastname email" },
          });
      }
      //comes filtered previously
      productsfiltered = productsfiltered.filter(
        (product) => product.category.name == category
      );
    }
    //console.log("data", productsfiltered);
    req.products = productsfiltered;
    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
  // const { filters } = req.body;
  // if (!filters) return next(); //it doesn't filters applied then go to paginate
  // try {
  //   let productsfiltered = [];
  //   for (let i = 0; i < filters.length; i++) {
  //     //console.log(filters[i]);
  //     if (!filters[i].filter)
  //       return res
  //         .status(400)
  //         .json({ error: "specify the filter that you want" });
  //     productsfiltered = await filterProducts(filters[i], productsfiltered);
  //   }
  //   //res.status(200).json(productsfiltered);
  //   req.products = productsfiltered;
  //   next();
  // } catch (error) {
  //   return res.status(400).json({ error: error.message });
  // }
};

export default { filter };
