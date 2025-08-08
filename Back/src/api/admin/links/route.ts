import { ApiHandler } from "app";
import { Link } from "models/link";
import { LinkService } from "services/link";
import { container } from "tsyringe";

export const POST: ApiHandler = async (req, res) => {
  const {
    start_date,
    end_date,
    chance = 1,
    data,
    metadata,
    amount = 1,
    return_data = false,
  } = req.body;

  const service: LinkService = container.resolve(LinkService);
  try {
    let result: Link[] = [];
    const _data = { start_date, end_date, chance, data, metadata };
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
  const service: LinkService = container.resolve(LinkService);
  if (pageSize) {
    const page = await service.getPageable(
      {
        pageSize: Number(pageSize),
        pageNumber: Number(pageNumber),
      },
      { select, relations, order, where }
    );
    return res.json(page);
  } else {
    const content = await service.getList({ select, relations, order, where });
    return res.json({ content });
  }
};

// export const SOCKET: SocketHandler = (socket, io, url, data) => {
//   console.log("yes!", data, `links/${data?.index}`);

//   io.sockets.emit(`/links/${data?.index}`, data);
// };
