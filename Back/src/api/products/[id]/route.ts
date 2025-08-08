import { ApiHandler } from "app";
import { ProductService } from "services/product";
import { container } from "tsyringe";

export const GET: ApiHandler = async (req, res) => {
  const { id } = req.params;

  const service: ProductService = container.resolve(ProductService);

  const content = await service.getById(id);
  return res.json({ content });
};
