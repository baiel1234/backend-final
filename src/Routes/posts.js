import express from "express";
const router = express.Router();

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Retrieve all posts
 *     description: Retrieve all posts from the database
 *     responses:
 *       200:
 *         description: List of posts
 */
router.get("/", (req, res) => {
  res.send("Posts will be fetched from the database");
});

export default router;
