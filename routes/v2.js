const express = require("express");
const { verifyToken, apiLimiter } = require("../middlewares");
const {
  createToken,
  tokenTest,
  getMyPosts,
  getPostsByHashtag,
} = require("../controllers/v2");

const router = express.Router();

// /v2/token
router.post("/token", apiLimiter, createToken);
router.get("/test", apiLimiter, verifyToken, tokenTest);

router.get("/posts/my", apiLimiter, verifyToken, getMyPosts);
router.get("/posts/hashtag/:title", apiLimiter, verifyToken, getPostsByHashtag);

module.exports = router;
