exports.getIp = async (req, res, next) => {

  next()
}

exports.whoami = (req, res) => {

  res.render('whoami', { title: "Who am I"} );
}
