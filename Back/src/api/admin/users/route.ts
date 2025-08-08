import { ApiHandler } from "app";
import { User, UserRole } from "models/user";
import { UserService } from "services/user";
import { container } from "tsyringe";

export const POST: ApiHandler = async (req, res) => {
  const {
    username,
    password,
    role = UserRole.MEMBER,
    name,
    phone_number,
    email,
    birthday,
    store_id,
    ci,
    di,
    biometric_algorithm,
    biometric_enabled,
    biometric_public_key,
    biometric_registered_at,
    pin_hash,
    metadata,
    amount = 1,
    return_data = false,
  } = req.body;

  const service: UserService = container.resolve(UserService);
  try {
    let result: User[] = [];
    const _data = {
      username,
      password,
      role,
      name,
      phone_number,
      email,
      birthday,
      store_id,
      ci,
      di,
      biometric_algorithm,
      biometric_enabled,
      biometric_public_key,
      biometric_registered_at,
      pin_hash,
      metadata,
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
  const service: UserService = container.resolve(UserService);
  if (pageSize) {
    const page = await service.getPageable(
      {
        pageSize: Number(pageSize),
        pageNumber: Number(pageNumber),
      },
      { relations, order, select, where }
    );
    return res.json(page);
  } else {
    const content = await service.getList({ where, select, relations, order });
    return res.json({ content });
  }
};
