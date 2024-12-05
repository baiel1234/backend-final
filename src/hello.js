import express from "express";
const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Say hello
 *     description: Responds with a simple hello message
 *     responses:
 *       200:
 *         description: Hello World message
 */
router.get("/", (req, res) => {
  res.send("Hello, World!");
});

export default router;
