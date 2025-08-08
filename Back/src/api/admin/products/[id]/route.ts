import { ApiHandler } from "app";
import { Product } from "models/product";
import { ProductService } from "services/product";
import { container } from "tsyringe";

export const POST: ApiHandler = async (req, res) => {
  const { id } = req.params;
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
    return_data = false,
  } = req.body;

  const service: ProductService = container.resolve(ProductService);
  try {
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
    const result: UpdateResult<Product> = await service.update(
      { id: id },
      _data,
      true
    );
    return res.json(return_data ? { content: result } : { message: "success" });
  } catch (err) {
    return res.status(500).json({ error: err, status: 500 });
  }
};

export const GET: ApiHandler = async (req, res) => {
  const { id } = req.params;

  const service: ProductService = container.resolve(ProductService);

  const content = await service.getById(id);
  return res.json({ content });
};

export const DELETE: ApiHandler = async (req, res) => {
  const { id } = req.params;
  const { soft } = req.parsedQuery;
  const service: ProductService = container.resolve(ProductService);
  const result = await service.delete(
    {
      id,
    },
    soft
  );
  if (result) {
    return res.json({ message: "sucess" });
  } else {
    return res.status(404).json({ error: "fail" });
  }
};
