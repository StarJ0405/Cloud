import { ApiHandler } from "app";
import { Product } from "models/product";
import { ProductService } from "services/product";
import { container } from "tsyringe";

export const POST: ApiHandler = async (req, res) => {
  const {
    store_id,
    brand_id,
    category_id,
    title,
    thumbnail,
    description,
    detail,
    price,
    tax_rate,
    visible,
    buyable,
    tags,
    adult,
    metadata,
    variants,
    options,
    amount = 1,
    return_data = false,
  } = req.body;

  const service: ProductService = container.resolve(ProductService);
  try {
    let result: Product[] = [];
    const _data = {
      store_id,
      brand_id,
      category_id,
      title,
      thumbnail,
      description,
      detail,
      price,
      tax_rate,
      visible,
      buyable,
      tags,
      adult,
      metadata,
      variants,
      options,
    };
    if (amount === 1) {
      result = [await service.create(_data)];
    } else {
      result = await service.creates(_data, amount);
    }
    return res.json(return_data ? { content: result } : { message: "success" });
  } catch (err) {
    return res.status(500).json({ error: err, status: 500 });
  }
};

export const GET: ApiHandler = async (req, res) => {
  let {
    pageSize,
    pageNumber = 0,
    relations,
    order,
    select,
    ...where
  } = req.parsedQuery;
  const service: ProductService = container.resolve(ProductService);
  if (pageSize) {
    const page = await service.getPageable(
      {
        pageSize: Number(pageSize),
        pageNumber: Number(pageNumber),
      },
      { select, order, relations, where }
    );
    return res.json(page);
  } else {
    const content = await service.getList({ select, order, relations, where });
    return res.json({ content });
  }
};
