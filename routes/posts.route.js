const router = require("express").Router();
const postsController = require("../controllers/posts.controller");
const upload = require("../middlewares/uploadPhoto");
const validateObjectId = require("../middlewares/validateObjectId");
const { verifyToken, verifyTokenAndAuthorization } = require("../middlewares/verifyToken");

// api/posts/
router.route("/")
.get( verifyToken,postsController.getAllPosts)
.post(verifyToken, upload.single("image") ,postsController.createPost)

// api/posts/:id
router.route("/:id")
.get(validateObjectId,verifyToken,postsController.getPost)
.put(validateObjectId,verifyToken, postsController.updatePost)
.delete(validateObjectId,verifyTokenAndAuthorization , postsController.deletePost)

// /api/posts/update-image/:id
router.route("/update-image/:id").put(verifyToken,upload.single("image") , postsController.uploadPostImage);

// /api/posts/like/:id

router.route("/like/:id").put(verifyToken, postsController.toggleLike);

module.exports = router;