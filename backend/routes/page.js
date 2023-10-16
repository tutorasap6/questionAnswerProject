const {
   // addPage,
    getPage,
    page_update,
    
  } = require("../controllers/pageController");
  
  const router = require("express").Router();
  
  
//router.post("/", addPage);
router.get("/", getPage);
router.patch("/update/:id", page_update);

module.exports = router;
    