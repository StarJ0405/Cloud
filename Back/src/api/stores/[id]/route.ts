import { ApiHandler } from "app";
import { StoreService } from "services/store";
import { container } from "tsyringe";

export const GET: ApiHandler = async (req, res) => {
  const { id } = req.params;

  const service: StoreService = container.resolve(StoreService);

  const content = await service.getById(id);
  return res.json({ content });
};
