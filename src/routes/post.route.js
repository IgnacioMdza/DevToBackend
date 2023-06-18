const express = require("express");
const {
  list,
  get,
  create,
  deleteById,
  update,
} = require("../usecases/post.usecase");
const { auth } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await list();
    res.json({
      success: true,
      data: posts,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await get(req.params.id);
    res.json({
      success: true,
      data: post,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message,
    });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const post = await create(req.body);
    res.status(201);
    res.json({
      success: true,
      data: post,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message,
    });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await deleteById(req.params.id, req);
    res.json({
      success: true,
      data: post,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message,
    });
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const post = await update(req.params.id, req.body, req);
    res.json({
      success: true,
      data: post,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
