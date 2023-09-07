const { User, Domain } = require("../models");

exports.renderLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user?.id || null },
      include: { model: Domain },
    });
    res.render("login", {
      user,
      domains: user?.Domains,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.createDomain = async () => {
  try {
  } catch (error) {
    console.error(error);
    next(error);
  }
};
