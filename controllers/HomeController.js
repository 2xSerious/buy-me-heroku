const fs = require("fs");

const jsonString = fs.readFileSync("./data/products.json");
const { products } = JSON.parse(jsonString);

/**
 * Render html and sends it to browser
 * @param {Object} req
 * @param {Object} res
 */
exports.getHome = (req, res) => {
  res.render("index", {
    product_id: products[0].id,
    product_name: products[0].name,
    product_color: products[0].color.toLowerCase(),
    product_sizes: products[0].sizes,
  });
};
/**
 * Returns product color
 * @param {Object} req
 * @param {Object} res
 */
exports.getColor = (req, res) => {
  const index = products.findIndex(
    (item) => item.color.toLowerCase() === req.params.color
  );
  res.send(products[index]);
};
