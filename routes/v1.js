const express = require("express");
const { verifyToken, deprecated } = require("../middlewares");
const {
  createToken,
  tokenTest,
  getMyPosts,
  getPostsByHashtag,
} = require("../controllers/v1");

const router = express.Router();

router.use(deprecated); // v2 출시에 따른 v1 알림 메시지

// /v1/token
router.post("/token", createToken);
router.get("/test", verifyToken, tokenTest);

router.get("/posts/my", verifyToken, getMyPosts);
router.get("/posts/hashtag/:title", verifyToken, getPostsByHashtag);

module.exports = router;
