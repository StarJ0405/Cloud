import { ApiHandler } from "app";
import { CategoryService } from "services/category";
import { container } from "tsyringe";

export const GET: ApiHandler = async (req, res) => {
  const { id } = req.params;
  const { tree } = req.parsedQuery;
  const service: CategoryService = container.resolve(CategoryService);

  const content = await service.getById(id, { tree });
  return res.json({ content });
};
