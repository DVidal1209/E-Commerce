const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');
const { rawAttributes } = require('../../models/Product');

// Route to get all products along with their category and tag data
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag, through: ProductTag, as: 'product_tags_info' }]
    }
    )
    res.status(200).json(productData)
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// Route to get a product along with it's category and tag data
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag, through: ProductTag, as: 'product_tags_info' }]
    })
    console.log(productData)
    if (!productData) {
      res.status(404).json({ message: `No product of id: ${req.params.id} found` })
    } else {
      res.status(200).json(productData)
    }
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// Route to create a new product
router.post('/', async (req, res) => {
  try{
    const productData = await Product.create(req.body);
    if(req.body.tagIds.length){
      let productTagIdArr = [];
      for (let tagId of req.body.tagIds){
        productTagIdArr.push({
          product_id: productData.id,
          tag_id: tagId
        });
      }
      let productTagIds = await ProductTag.bulkCreate(productTagIdArr);
      res.status(200).json(productTagIds);
      return;
    } else {
      res.status(200).json(productData)
    }
  }
  catch (err) {
    res.status(500).json(err)
  }
});

// Route to update a product given it's id
router.put('/:id', (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

// Route to delete a product using it's id
router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!productData) {
      res.status(404).json({message: `Product at id: ${req.params.id} not found`})
    } else {
      res.status(200).json(productData);
    }
  }
  catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
