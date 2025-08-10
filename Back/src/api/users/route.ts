import { ApiHandler } from "app";
import { LinkService } from "services/link";
import { UserService } from "services/user";
import { container } from "tsyringe";
import { generateToken } from "utils/functions";

export const POST: ApiHandler = async (req, res) => {
  const { username, code, thumbnail, name, password, phone, birthday } = req.body;
  const service: LinkService = container.resolve(LinkService);
  const link = await service.get({ where: { code, type: username } })
  if (link) {
    const userService = container.resolve(UserService);
    const user = await userService.create({
      username, thumbnail, name, password, phone, birthday
    })
    await service.delete({ id: link.id }, false);
    return res.json({
      access_token: generateToken(
        {
          user_id: user.id,
        }
      ),
    })
  }
  return res.json({
    exist: false,
    error: "링크가 유효하지않습니다."
  });
};

