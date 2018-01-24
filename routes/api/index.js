const router = require("express").Router();
const batchRoutes = require("./batch");
const recipeRoutes = require("./recipe");
const customerRoutes = require("./customer");
const saleRoutes = require("./sale");
const userRoutes = require("./user");

// Routes
router.use("/batch", batchRoutes);
router.use("/recipe", recipeRoutes);
router.use("/recipe/volbyname", recipeRoutes);
router.use("/customer", customerRoutes);
router.use("/sale", saleRoutes);
router.use("/user", userRoutes);


module.exports = router;