const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


// Route to get all tags
router.get('/', async (req, res) => {
  try{
    const tagData = await Tag.findAll({
      include: [{model: Product, through: ProductTag, as: 'products'}]
    })
    res.status(200).json(tagData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// Route to get a specific tag given a tag id
router.get('/:id', async (req, res) => {
  try{
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'products'}]
    });
      if(!tagData){
        res.status(404).json({ message: `No tag found at id: ${req.body.id}`})
      } else {
        res.status(200).json(tagData);
      }
  }
  catch (err) {
    res.status(500).json(err)
  }
});

// Route to create a new tag
router.post('/', async (req, res) => {
  try{
    const tagData = Tag.create({
      tag_name: req.body.tag_name
    })
    res.status(200).json(tagData);
  }
  catch (err) {
    res.status(500).json(err)
  }
});

// Route to update a tag given the id
router.put('/:id', async (req, res) => {
  try{
    if (!req.body.tag_name){
      res.status(400).json({message: "Request missing tag_name"})
      return
    }
    const tagData = await Tag.update({
      tag_name: req.body.tag_name
    },
    {
      where: {
         id: req.params.id
      }
    })
    if (!tagData) {
      res.status(404).json({ message: `tag at id ${req.params.id} not found`})
    } else{
      res.status(200).json(tagData);
    }
  }
  catch (err) {
    res.status(500).json(err)
  }
});

// Route to delete a tag given it's id
router.delete('/:id', async (req, res) => {
  try{
    const tagData = await Tag.destroy({
      where: {
         id: req.params.id
      }
    })
    if(!tagData){
      res.status(404).json({message: `No tag found at id: ${req.params.id}`})
    }else {
      res.status(200).json(tagData);
    }
  }
  catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
