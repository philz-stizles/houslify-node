const { Op } = require('sequelize');
const AppError = require('../../errors/app.error');
const { Apartment } = require('../../db/models');

class ApartmentService {
  async create(modelObject) {
    return await Apartment.create(modelObject);
  }

  async update(query, update) {
    return await Apartment.update(update, query);
  }

  async archive(query) {
    return await Apartment.create(modelObject);
  }

  static async findFiltered(query, limit, offset, sort) {
    // Build query.
    let queryString = JSON.stringify(query);
    queryString = queryString.replace(/\b(eq|gt|lte|lt)\b/g, match => `${[Op[match]]}`);

    console.log(queryString);

    return await Apartment.findAll({
      limit,
      offset,
      where: JSON.parse(queryString),
    });
  }

  static async findAll(query) {
    return await Apartment.findAll(query ? query : {});
  }

  static async findOne(query, include) {
    return await Apartment.findOne({
      attributes: ['id', 'title'],
      where: {
        id: 1,
      },
    });
  }

  static async exists(query, include = null) {
    const options = {};

    if (query) {
      options.where = query;
    }

    return await Apartment.findOne(options);
  }
}

module.exports = ApartmentService;

// exports.findBySlug = async (
//   query: FilterQuery<IProductDocument>
// ): Promise<LeanDocument<IProductDocument> | null> => {
//   const targetProduct = await Product.findOne(query);
//   if (!targetProduct) {
//     throw new NotFoundError('Product does not exist');
//   }
//   return targetProduct;
// };

// exports.list = async (
//   query: FilterQuery<IProductDocument>,
//   options: QueryOptions = { lean: true }
// ) => {
//   // If you're executing a query and sending the results without modification to, say, an Express response,
//   // you should use lean.In general, if you do not modify the query results and do not use custom getters,
//   // you should use lean(). If you modify the query results or rely on features like getters or transforms,
//   // you should not use lean().
//   return Product.find(query, {}, options);
// };

// exports.update = async (
//   query: FilterQuery<IProductDocument>,
//   update: UpdateQuery<IProductDocument>,
//   options: QueryOptions = { new: true }
// ) => {
//   const targetProduct = await Product.findOneAndUpdate(query, update, options);
//   if (!targetProduct) {
//     throw new NotFoundError('Product does not exist');
//   }
//   return targetProduct;
// };

// exports.delete = async (query: FilterQuery<IProductDocument>) => {
//   const targetProduct = await Product.deleteOne(query);
//   if (!targetProduct) {
//     throw new NotFoundError('Product does not exist');
//   }
//   return targetProduct;
// };
