const Color = require('../models/color.model');
const SpecsRoom = require('../models/room.model');
const SpecsFinish = require('../models/specsfinish.model');
const SpecsThickness = require('../models/model').specsthickness;
const SpecsType = require('../models/specstype.model');
const SpecsPrint = require('../models/specsprint.model');
const SpecsSize = require('../models/specssize.model');
const SpecsUsage = require('../models/specesusage.model');
const ProductGroup = require('../models/productgroup.model');
const Brand = require('../models/brand.model');
const Unit = require("../models/unit.model")

exports.getColors = async (req, res) => {
    try {
        const colors = await Color.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: colors });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error fetching colors' });
    }
};

exports.addColor = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ success: false, message: 'Color name is required' });
        }

        const newColor = new Color({ name });
        await newColor.save();

        res.status(201).json({ success: true, message: 'Color added successfully', data: newColor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error adding color' });
    }
};

exports.deleteColor = async (req, res) => {
    try {
        const { id } = req.params;

        const color = await Color.findById(id);
        if (!color) {
            return res.status(404).json({ success: false, message: 'Color not found' });
        }

        await color.deleteOne();
        res.status(200).json({ success: true, message: 'Color deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error deleting color' });
    }
};


// controllers/adminController.js


// Create Specs Room
exports.createSpecsRoom = async (req, res) => {
    try {
        const { room } = req.body;
        const newSpecsRoom = await SpecsRoom.create({ room });
        res.status(201).json({ success: true, message: 'Specs Room created successfully', data: newSpecsRoom });
    } catch (error) {
        console.error('Error creating Specs Room:', error);
        res.status(500).json({ success: false, message: 'Failed to create Specs Room' });
    }
};

// Get all Specs Rooms
exports.getSpecsRooms = async (req, res) => {
    try {
        const rooms = await SpecsRoom.find();
        res.status(200).json({ success: true, data: rooms });
    } catch (error) {
        console.error('Error fetching Specs Rooms:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch Specs Rooms' });
    }
};

// Delete Specs Room
exports.deleteSpecsRoom = async (req, res) => {
    try {
        const { id } = req.params;
        await SpecsRoom.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Specs Room deleted successfully' });
    } catch (error) {
        console.error('Error deleting Specs Room:', error);
        res.status(500).json({ success: false, message: 'Failed to delete Specs Room' });
    }
};


// controllers/adminController.js


// Create Specs Finish
exports.createSpecsFinish = async (req, res) => {
    try {
        const { name } = req.body;
        const newSpecsFinish = await SpecsFinish.create({ name });
        res.status(201).json({ success: true, message: 'Specs Finish created successfully', data: newSpecsFinish });
    } catch (error) {
        console.error('Error creating Specs Finish:', error);
        res.status(500).json({ success: false, message: 'Failed to create Specs Finish' });
    }
};

// Get all Specs Finishes
exports.getSpecsFinishes = async (req, res) => {
    try {
        const finishes = await SpecsFinish.find();
        res.status(200).json({ success: true, data: finishes });
    } catch (error) {
        console.error('Error fetching Specs Finishes:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch Specs Finishes' });
    }
};

// Delete Specs Finish
exports.deleteSpecsFinish = async (req, res) => {
    try {
        const { id } = req.params;
        await SpecsFinish.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Specs Finish deleted successfully' });
    } catch (error) {
        console.error('Error deleting Specs Finish:', error);
        res.status(500).json({ success: false, message: 'Failed to delete Specs Finish' });
    }
};


// controllers/adminController.js


// Create Specs Finish
exports.createSpecsFinish = async (req, res) => {
    try {
        const { name } = req.body;
        const newSpecsFinish = await SpecsFinish.create({ name });
        res.status(201).json({ success: true, message: 'Specs Finish created successfully', data: newSpecsFinish });
    } catch (error) {
        console.error('Error creating Specs Finish:', error);
        res.status(500).json({ success: false, message: 'Failed to create Specs Finish' });
    }
};

// Get all Specs Finishes
exports.getSpecsFinishes = async (req, res) => {
    try {
        const finishes = await SpecsFinish.find();
        res.status(200).json({ success: true, data: finishes });
    } catch (error) {
        console.error('Error fetching Specs Finishes:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch Specs Finishes' });
    }
};

// Delete Specs Finish
exports.deleteSpecsFinish = async (req, res) => {
    try {
        const { id } = req.params;
        await SpecsFinish.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Specs Finish deleted successfully' });
    } catch (error) {
        console.error('Error deleting Specs Finish:', error);
        res.status(500).json({ success: false, message: 'Failed to delete Specs Finish' });
    }
};


// controllers/adminController.js


// Create Specs Thickness
exports.createSpecsThickness = async (req, res) => {
    try {
        const { thickness } = req.body;
        const newSpecsThickness = await SpecsThickness.create({ thickness });
        res.status(201).json({ success: true, message: 'Specs Thickness created successfully', data: newSpecsThickness });
    } catch (error) {
        console.error('Error creating Specs Thickness:', error);
        res.status(500).json({ success: false, message: 'Failed to create Specs Thickness' });
    }
};

// Get all Specs Thicknesses
exports.getSpecsThicknesses = async (req, res) => {
    try {
        const thicknesses = await SpecsThickness.find();
        res.status(200).json({ success: true, data: thicknesses });
    } catch (error) {
        console.error('Error fetching Specs Thicknesses:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch Specs Thicknesses' });
    }
};

// Delete Specs Thickness
exports.deleteSpecsThickness = async (req, res) => {
    try {
        const { id } = req.params;
        await SpecsThickness.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Specs Thickness deleted successfully' });
    } catch (error) {
        console.error('Error deleting Specs Thickness:', error);
        res.status(500).json({ success: false, message: 'Failed to delete Specs Thickness' });
    }
};


// controllers/adminController.js


// Create Specs Type
exports.createSpecsType = async (req, res) => {
    try {
        const { type } = req.body;
        const newSpecsType = await SpecsType.create({ type });
        res.status(201).json({ success: true, message: 'Specs Type created successfully', data: newSpecsType });
    } catch (error) {
        console.error('Error creating Specs Type:', error);
        res.status(500).json({ success: false, message: 'Failed to create Specs Type' });
    }
};

// Get all Specs Types
exports.getSpecsTypes = async (req, res) => {
    try {
        const types = await SpecsType.find();
        res.status(200).json({ success: true, data: types });
    } catch (error) {
        console.error('Error fetching Specs Types:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch Specs Types' });
    }
};

// Delete Specs Type
exports.deleteSpecsType = async (req, res) => {
    try {
        const { id } = req.params;
        await SpecsType.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Specs Type deleted successfully' });
    } catch (error) {
        console.error('Error deleting Specs Type:', error);
        res.status(500).json({ success: false, message: 'Failed to delete Specs Type' });
    }
};


// controllers/adminController.js


// Create Specs Print
exports.createSpecsPrint = async (req, res) => {
    try {
        const { print } = req.body;
        const newSpecsPrint = await SpecsPrint.create({ print });
        res.status(201).json({ success: true, message: 'Specs Print created successfully', data: newSpecsPrint });
    } catch (error) {
        console.error('Error creating Specs Print:', error);
        res.status(500).json({ success: false, message: 'Failed to create Specs Print' });
    }
};

// Get all Specs Prints
exports.getSpecsPrints = async (req, res) => {
    try {
        const prints = await SpecsPrint.find();
        res.status(200).json({ success: true, data: prints });
    } catch (error) {
        console.error('Error fetching Specs Prints:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch Specs Prints' });
    }
};

// Delete Specs Print
exports.deleteSpecsPrint = async (req, res) => {
    try {
        const { id } = req.params;
        await SpecsPrint.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Specs Print deleted successfully' });
    } catch (error) {
        console.error('Error deleting Specs Print:', error);
        res.status(500).json({ success: false, message: 'Failed to delete Specs Print' });
    }
};


// controllers/adminController.js


// Create Specs Material
exports.createSpecsMaterial = async (req, res) => {
    try {
        const { name } = req.body;
        const newSpecsMaterial = await SpecsMaterial.create({ name });
        res.status(201).json({ success: true, message: 'Specs Material created successfully', data: newSpecsMaterial });
    } catch (error) {
        console.error('Error creating Specs Material:', error);
        res.status(500).json({ success: false, message: 'Failed to create Specs Material' });
    }
};

// Get all Specs Materials
exports.getSpecsMaterials = async (req, res) => {
    try {
        const materials = await SpecsMaterial.find();
        res.status(200).json({ success: true, data: materials });
    } catch (error) {
        console.error('Error fetching Specs Materials:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch Specs Materials' });
    }
};

// Delete Specs Material
exports.deleteSpecsMaterial = async (req, res) => {
    try {
        const { id } = req.params;
        await SpecsMaterial.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Specs Material deleted successfully' });
    } catch (error) {
        console.error('Error deleting Specs Material:', error);
        res.status(500).json({ success: false, message: 'Failed to delete Specs Material' });
    }
};


// controllers/adminController.js


// Create Specs Print
exports.createSpecsPrint = async (req, res) => {
    try {
        const { print } = req.body;
        const newSpecsPrint = await SpecsPrint.create({ print });
        res.status(201).json({ success: true, message: 'Specs Print created successfully', data: newSpecsPrint });
    } catch (error) {
        console.error('Error creating Specs Print:', error);
        res.status(500).json({ success: false, message: 'Failed to create Specs Print' });
    }
};

// Get all Specs Prints
exports.getSpecsPrints = async (req, res) => {
    try {
        const prints = await SpecsPrint.find();
        res.status(200).json({ success: true, data: prints });
    } catch (error) {
        console.error('Error fetching Specs Prints:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch Specs Prints' });
    }
};

// Delete Specs Print
exports.deleteSpecsPrint = async (req, res) => {
    try {
        const { id } = req.params;
        await SpecsPrint.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Specs Print deleted successfully' });
    } catch (error) {
        console.error('Error deleting Specs Print:', error);
        res.status(500).json({ success: false, message: 'Failed to delete Specs Print' });
    }
};


// controllers/adminController.js


// Create Specs Size
exports.createSpecsSize = async (req, res) => {
    try {
        const { size } = req.body;
        const newSpecsSize = await SpecsSize.create({ size });
        res.status(201).json({ success: true, message: 'Specs Size created successfully', data: newSpecsSize });
    } catch (error) {
        console.error('Error creating Specs Size:', error);
        res.status(500).json({ success: false, message: 'Failed to create Specs Size' });
    }
};

// Get all Specs Sizes
exports.getSpecsSizes = async (req, res) => {
    try {
        const sizes = await SpecsSize.find();
        res.status(200).json({ success: true, data: sizes });
    } catch (error) {
        console.error('Error fetching Specs Sizes:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch Specs Sizes' });
    }
};

// Delete Specs Size
exports.deleteSpecsSize = async (req, res) => {
    try {
        const { id } = req.params;
        await SpecsSize.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Specs Size deleted successfully' });
    } catch (error) {
        console.error('Error deleting Specs Size:', error);
        res.status(500).json({ success: false, message: 'Failed to delete Specs Size' });
    }
};


// controllers/adminController.js


// Create Specs Usage
exports.createSpecsUsage = async (req, res) => {
    try {
        const { usage } = req.body;
        const newSpecsUsage = await SpecsUsage.create({ usage });
        res.status(201).json({ success: true, message: 'Specs Usage created successfully', data: newSpecsUsage });
    } catch (error) {
        console.error('Error creating Specs Usage:', error);
        res.status(500).json({ success: false, message: 'Failed to create Specs Usage' });
    }
};

// Get all Specs Usages
exports.getSpecsUsages = async (req, res) => {
    try {
        const usages = await SpecsUsage.find();
        res.status(200).json({ success: true, data: usages });
    } catch (error) {
        console.error('Error fetching Specs Usages:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch Specs Usages' });
    }
};

// Delete Specs Usage
exports.deleteSpecsUsage = async (req, res) => {
    try {
        const { id } = req.params;
        await SpecsUsage.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Specs Usage deleted successfully' });
    } catch (error) {
        console.error('Error deleting Specs Usage:', error);
        res.status(500).json({ success: false, message: 'Failed to delete Specs Usage' });
    }
};



exports.createProductGroup = async (req, res) => {
    try {
        const { name, status } = req.body;
        const newGroup = await ProductGroup.create({ name, status });
        res.status(201).json({ success: true, message: 'Product Group created successfully', data: newGroup });
    } catch (error) {
        console.error('Error creating Product Group:', error);
        res.status(500).json({ success: false, message: 'Failed to create Product Group' });
    }
};


exports.getProductGroups = async (req, res) => {
    try {
        const groups = await ProductGroup.find();
        res.status(200).json({ success: true, data: groups });
    } catch (error) {
        console.error('Error fetching Product Groups:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch Product Groups' });
    }
};


exports.deleteProductGroup = async (req, res) => {
    try {
        const { id } = req.params;
        await ProductGroup.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Product Group deleted successfully' });
    } catch (error) {
        console.error('Error deleting Product Group:', error);
        res.status(500).json({ success: false, message: 'Failed to delete Product Group' });
    }
};


exports.updateProductGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, status } = req.body;

        const updatedGroup = await ProductGroup.findByIdAndUpdate(
            id,
            { name, status },
            { new: true, runValidators: true }
        );

        if (!updatedGroup) {
            return res.status(404).json({ success: false, message: 'Product Group not found' });
        }

        res.status(200).json({ success: true, message: 'Product Group updated successfully', data: updatedGroup });
    } catch (error) {
        console.error('Error updating Product Group:', error);
        res.status(500).json({ success: false, message: 'Failed to update Product Group' });
    }
};



// Get all brands
exports.getAllBrands = async (req, res) => {
    try {
      const brands = await Brand.find();
      res.json({ data: brands }); // Wrap the array in a "data" key
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch brands' });
    }
  };
  

// Add a new brand
exports.addBrand = async (req, res) => {
  const { name, status } = req.body;

  try {
    const newBrand = new Brand({ name, status });
    await newBrand.save();
    res.status(201).json({ message: 'Brand added successfully', brand: newBrand });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add brand' });
  }
};

// Update an existing brand
exports.updateBrand = async (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;

  try {
    const updatedBrand = await Brand.findByIdAndUpdate(
      id,
      { name, status },
      { new: true, runValidators: true }
    );

    if (!updatedBrand) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    res.json({ message: 'Brand updated successfully', brand: updatedBrand });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update brand' });
  }
};

// Delete a brand
exports.deleteBrand = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBrand = await Brand.findByIdAndDelete(id);

    if (!deletedBrand) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    res.json({ message: 'Brand deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete brand' });
  }
};


// Get all units
exports.getAllUnits = async (req, res) => {
    try {
        const units = await Unit.find();
        res.json({ data: units }); // Wrap the response in a `data` key for DataTables compatibility
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch units' });
    }
};

// Add a new unit
exports.addUnit = async (req, res) => {
    const { name } = req.body;

    try {
        const newUnit = new Unit({ name });
        await newUnit.save();
        res.status(201).json({ message: 'Unit added successfully', unit: newUnit });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add unit' });
    }
};

// Update an existing unit
exports.updateUnit = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const updatedUnit = await Unit.findByIdAndUpdate(id, { name }, { new: true, runValidators: true });

        if (!updatedUnit) {
            return res.status(404).json({ error: 'Unit not found' });
        }

        res.json({ message: 'Unit updated successfully', unit: updatedUnit });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update unit' });
    }
};

// Delete a unit
exports.deleteUnit = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUnit = await Unit.findByIdAndDelete(id);

        if (!deletedUnit) {
            return res.status(404).json({ error: 'Unit not found' });
        }

        res.json({ message: 'Unit deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete unit' });
    }
};