const router = require('express').Router();
const { Category, Product } = require('../../models');

// Route to get all add Categories with their associated Products
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    })
    res.status(200).json(categoryData)
  }
  catch (err) {
    res.status(500).json(err)
  }
});

// Route to get a Categories with it's associated Products given a category id
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    })
    if(!categoryData) {
      res.status(404).json({message: `No category at id: ${req.params.id} found`})
    }else {
      res.status(200).json(categoryData)
    }
  }
  catch (err) {
    res.status(500).json(err)
  }
});

// Route to create a new category
router.post('/', async (req, res) => {
  try{
    const categoryData = await Category.create(req.body)
    if (!categoryData){
      res.status(400).json({ message: "No category_name was entered."})
    } else {
      res.status(200).json(categoryData);
    }
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// Route to update a category's name given it's id
router.put('/:id', async (req, res) => {
  try{
    if (!req.body.category_name){
      res.status(400).json({ message: `request is missing category_name`})
    }
    const categoryData = await Category.update(req.body,
    {
      where: {
        id: req.params.id
      }
    })
    if (!categoryData){
      res.status(404).json({message: `No category at id: ${req.params.id} found`})
    } else {
      res.status(200).json(categoryData);
    }
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// Route to delete a category given it's id
router.delete('/:id', async (req, res) => {
  try{
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!categoryData) {
      res.status(404).json({ message: `Category at id ${req.params.id} not found`})
    } else {
      res.status(200).json(categoryData)
    }
  }
  catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
