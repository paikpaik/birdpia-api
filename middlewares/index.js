const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const User = require("../models/user");
const Domain = require("../models/domain");

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send("로그인 필요");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent("로그인한 상태입니다.");
    res.redirect(`/?error=${message}`);
  }
};

exports.verifyToken = (req, res, next) => {
  try {
    res.locals.decoded = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(419).json({
        code: 419,
        message: "토큰이 만료되었습니다.",
      });
    }
    return res.status(401).json({
      code: 401,
      message: "유효하지 않은 토큰입니다.",
    });
  }
};

const limiter = rateLimit({
  widowMs: 60 * 1000,
  max: (req, res) => {
    if (req.user?.Domains[0]?.type === "premium") {
      return 10;
    }
    return 2;
  },
  handler(req, res) {
    res.status(this.statusCode).json({
      code: this.statusCode,
      message: `1분에 ${
        req.user?.Domains[0]?.type === "premium" ? "10" : "2"
      } 회만 요청 할 수 있습니다`,
    });
  },
});

exports.apiLimiter = async (req, res, next) => {
  let user;
  if (res.locals.decoded) {
    user = await User.findOne({
      where: { id: res.locals.decoded.id },
      include: { model: Domain },
    });
  }
  req.user = user;
  limiter(req, res, next);
};

exports.deprecated = (req, res) => {
  res.status(410).json({
    code: 410,
    message: "새로운 버전이 나왔습니다. 새로운 버전을 사용하세요.",
  });
};
