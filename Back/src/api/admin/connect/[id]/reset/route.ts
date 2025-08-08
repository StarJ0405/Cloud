import { ApiHandler } from "app";
import { ConnectService } from "services/connect";
import { container } from "tsyringe";

export const POST: ApiHandler = async (req, res) => {
  const { id } = req.params;

  const service: ConnectService = container.resolve(ConnectService);
  try {
    const secret = await service.reset(id);
    return res.json({ secret });
  } catch (err) {
    return res.status(500).json({ error: err, status: 500 });
  }
};

export const GET: ApiHandler = async (req, res) => {
  const { id } = req.params;

  const service: ConnectService = container.resolve(ConnectService);

  const content = await service.getById(id);
  return res.json({ content });
};
