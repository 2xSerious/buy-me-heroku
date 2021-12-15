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

exports.getItems = (req, res) => {
  if (req.session.basket) {
    res.send(req.session.basket);
  } else {
    res.send([]);
  }
};

exports.updateItems = (req, res) => {
  req.session.basket = req.body.item;
  res.send(req.session.basket);
};
