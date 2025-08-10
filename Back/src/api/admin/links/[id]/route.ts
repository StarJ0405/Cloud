import { ApiHandler } from "app";
import { Link } from "models/link";
import { LinkService } from "services/link";
import { container } from "tsyringe";

export const POST: ApiHandler = async (req, res) => {
  const { id } = req.params;
  const {
    start_date,
    end_date,
    chance = 1,
    data,
    type,
    metadata,
    auto_delete,
    return_data = false,
  } = req.body;

  const service: LinkService = container.resolve(LinkService);
  try {
    const _data = { start_date, end_date, chance, data, type, metadata, auto_delete };
    const result: UpdateResult<Link> = await service.update(
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

  const service: LinkService = container.resolve(LinkService);

  const content = await service.getById(id);
  return res.json({ content });
};

export const DELETE: ApiHandler = async (req, res) => {
  const { id } = req.params;
  const { soft } = req.parsedQuery;
  const service: LinkService = container.resolve(LinkService);
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
