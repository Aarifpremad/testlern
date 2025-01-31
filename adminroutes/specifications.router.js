// routes/colorRoutes.js
const express = require('express');

const  specifications = require("../admincontroller/specifications.controller")
const router = express.Router();

router.get('/colors', specifications.getColors); 
router.post('/colors', specifications.addColor); 
router.delete('/colors/:id', specifications.deleteColor); 

router.post('/specsfinish', specifications.createSpecsFinish);
router.get('/specsfinish', specifications.getSpecsFinishes);
router.delete('/specsfinish/:id', specifications.deleteSpecsFinish);

router.post('/specsmaterial', specifications.createSpecsMaterial);
router.get('/specsmaterial', specifications.getSpecsMaterials);
router.delete('/specsmaterial/:id', specifications.deleteSpecsMaterial);

router.post('/specssize', specifications.createSpecsSize);
router.get('/specssize', specifications.getSpecsSizes);
router.delete('/specssize/:id', specifications.deleteSpecsSize);

router.post('/specsthickness', specifications.createSpecsThickness);
router.get('/specsthickness', specifications.getSpecsThicknesses);
router.delete('/specsthickness/:id', specifications.deleteSpecsThickness);

router.post('/specsroom', specifications.createSpecsRoom);
router.get('/specsroom', specifications.getSpecsRooms);
router.delete('/specsroom/:id', specifications.deleteSpecsRoom);


router.post('/specstype', specifications.createSpecsType);
router.get('/specstype', specifications.getSpecsTypes);
router.delete('/specstype/:id', specifications.deleteSpecsType);


router.post('/specsprint', specifications.createSpecsPrint);
router.get('/specsprint', specifications.getSpecsPrints);
router.delete('/specsprint/:id', specifications.deleteSpecsPrint);


router.post('/specsusage', specifications.createSpecsUsage);
router.get('/specsusage', specifications.getSpecsUsages);
router.delete('/specsusage/:id', specifications.deleteSpecsUsage);



router.post('/productgroup', specifications.createProductGroup);
router.get('/productgroup', specifications.getProductGroups);
router.delete('/productgroup/:id', specifications.deleteProductGroup);
router.put('/productgroup/:id', specifications.updateProductGroup);




router.get('/brand', specifications.getAllBrands);
router.post('/brand', specifications.addBrand);
router.put('/brand/:id', specifications.updateBrand);
router.delete('/brand/:id', specifications.deleteBrand);


router.get('/unit', specifications.getAllUnits);
router.post('/unit', specifications.addUnit);
router.put('/unit/:id', specifications.updateUnit);
router.delete('/unit/:id', specifications.deleteUnit);


module.exports = router;




