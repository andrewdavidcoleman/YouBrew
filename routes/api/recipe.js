const router = require("express").Router();
const recipeController = require("../../controllers/recipeController");

// Matches with "/api/recipe"
router.route("/")
  .get(recipeController.findAll)
  .post(recipeController.create);

// Matches with "/api/recipe/:id"
router
  .route("/:id")
  .get(recipeController.findById)
  .put(recipeController.update)
  .delete(recipeController.remove);

// Matches with "/api/recipe/:id/:vol"
router
  .route("/:id/:vol")
  .put(recipeController.updateVol);

//  Matches with "/api/recipe/volbyname/:name/:vol"
router
  .route("/volbyname/:name/:vol")
  .put(recipeController.updateRecipeVolByName);
  
module.exports = router;