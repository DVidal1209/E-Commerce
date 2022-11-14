const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');


// Many to one relationship between Product and Category
Product.belongsTo(Category, {
  foreignKey: 'category_id'
})

Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
})

// Many to Many relationship between Products and Tags using ProductTag
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false
  },
  as: 'product_tags_info'
})

Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false,
  },
  as: 'products'
})


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
