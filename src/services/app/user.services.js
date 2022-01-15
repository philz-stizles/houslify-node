const crypto = require('crypto');
const AppError = require('../../errors/app.error');
const { User } = require('../../db/models');

class UserService {
  async create(modelObject) {
    // const existingUser = await UserService.existsAsync({
    //   name: modelObject.name,
    // });

    // if (existingUser) {
    //   throw new AppError(400, 'User already exists');
    // }

    return await User.create(modelObject);
  }

  async update(query, update) {
    return await User.update(update, query);
  }

  async archive(query) {
    return await User.create(modelObject);
  }

  static async findFiltered(query, page, size) {
    return await User.findAll();
  }

  static async findAll(query) {
    return await User.findAll(query ? query : {});
  }

  static async authenticate(credentials) {
    // Check if user exists
    const existingUser = await UserService.findOne({ email });
    if (!existingUser) {
      throw new AppError(400, 'Incorrect email or password');
    }

    // Check if password matches
    const isAuthenticated =
      existingUser.hashedPassword === encryptPassword(password, existingUser.salt);
    if (!isAuthenticated) {
      throw new AppError(400, 'Incorrect email or password');
    }

    return existingUser;
  }

  static async findOne(where, include) {
    return await User.findOne({
      // attributes: ['id', 'title'],
      where,
    });
  }

  static async existsAsync(query, include = null) {
    console.log(query);
    const options = {};

    if (include && typeof include === 'string') {
      options.include = include;
    }

    if (query) {
      options.where = query;
    }

    return await User.findOne(options);
  }
}

module.exports = UserService;

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
