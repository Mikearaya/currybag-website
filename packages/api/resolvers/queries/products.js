import { log } from 'meteor/unchained:core-logger';
import { Products, ProductStatus } from 'meteor/unchained:core-products';

export default function (root, {
  limit = 10, offset = 0, tags, includeDrafts = false, slugs = [],
}, { userId }) {
  log(`query products: ${limit} ${offset} ${includeDrafts ? 'includeDrafts' : ''} ${slugs.join(',')}`, { userId });
  const selector = { };
  const sort = { published: -1 };
  const options = { skip: offset, limit, sort };

  if (slugs.length > 0) {
    selector.slugs = { $in: slugs };
  } else {
    options.offset = offset;
    options.limit = limit;

    if (tags && tags.length > 0) {
      selector.tags = { $in: tags };
    }
  }

  if (!includeDrafts) {
    selector.status = { $eq: ProductStatus.ACTIVE };
  } else {
    selector.status = { $in: [ProductStatus.ACTIVE, ProductStatus.DRAFT] };
  }
  const products = Products.find(selector, options).fetch();
  return products;
}