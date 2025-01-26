// routes/colorRoutes.js
const express = require('express');
const { getColors, addColor, deleteColor } = require('../controller/color.controller');
const sepesfinish = require('../controller/sepesfinish.controller');
const sepecsmaterial  = require("../controller/specsMaterial.controller")
const sepecsize = require("../controller/specssize.controller") 
const specsthickness = require("../controller/sepesthichness.controller")
const speceroom = require("../controller/room.controller")
const specstype = require("../controller/speces.type")
const specsprint = require("../controller/specsprint.controller")
const specesusage = require("../controller/specsusage.controller")

const router = express.Router();

router.get('/colors', getColors); // List all colors
router.post('/colors', addColor); // Add a new color
router.delete('/colors/:id', deleteColor); // Delete a color





// Specs Finish routes
router.post('/specsfinish', sepesfinish.createSpecsFinish);
router.get('/specsfinish', sepesfinish.getSpecsFinishes);
router.delete('/specsfinish/:id', sepesfinish.deleteSpecsFinish);




router.post('/specsmaterial', sepecsmaterial.createSpecsMaterial);
router.get('/specsmaterial', sepecsmaterial.getSpecsMaterials);
router.delete('/specsmaterial/:id', sepecsmaterial.deleteSpecsMaterial);


router.post('/specssize', sepecsize.createSpecsSize);
router.get('/specssize', sepecsize.getSpecsSizes);
router.delete('/specssize/:id', sepecsize.deleteSpecsSize);



router.post('/specsthickness', specsthickness.createSpecsThickness);
router.get('/specsthickness', specsthickness.getSpecsThicknesses);
router.delete('/specsthickness/:id', specsthickness.deleteSpecsThickness);


router.post('/specsroom', speceroom.createSpecsRoom);
router.get('/specsroom', speceroom.getSpecsRooms);
router.delete('/specsroom/:id', speceroom.deleteSpecsRoom);



router.post('/specstype', specstype.createSpecsType);
router.get('/specstype', specstype.getSpecsTypes);
router.delete('/specstype/:id', specstype.deleteSpecsType);



router.post('/specsprint', specsprint.createSpecsPrint);
router.get('/specsprint', specsprint.getSpecsPrints);
router.delete('/specsprint/:id', specsprint.deleteSpecsPrint);



router.post('/specsusage', specesusage.createSpecsUsage);
router.get('/specsusage', specesusage.getSpecsUsages);
router.delete('/specsusage/:id', specesusage.deleteSpecsUsage);

module.exports = router;




