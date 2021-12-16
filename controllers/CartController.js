/**
 * Update session basket
 * Returns updated session basket
 * @param {Object} req
 * @param {Object} res
 */
exports.addToCart = (req, res) => {
  if (!req.session.basket) {
    req.session.basket = req.body.item;
    res.send(req.session.basket);
  } else {
    req.body.item.forEach((element) => {
      req.session.basket.push(element);
    });
    res.send(req.session.basket);
  }
};

/**
 * Returns items from the current session
 * @param {Object} req
 * @param {Object} res
 */
exports.getItems = (req, res) => {
  if (req.session.basket) {
    res.send(req.session.basket);
  } else {
    res.send([]);
  }
};

/**
 * Updates items in current session
 * Returns updated session.basket
 * @param {Object} req
 * @param {Objecy} res
 */
exports.updateItems = (req, res) => {
  req.session.basket = req.body.item;
  res.send(req.session.basket);
};
