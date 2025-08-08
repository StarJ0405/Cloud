import { ApiHandler } from "app";
import { UserService } from "services/user";
import { container } from "tsyringe";
import { generateToken } from "utils/functions";

export const POST: ApiHandler = async (req, res) => {
  const { username, password, keep = false } = req.body;
  if (!username || !password) {
    return res.status(404).json({
      error: "입력되지않은 정보가 있습니다.",
      status: 404,
    });
  }
  const service = container.resolve(UserService);
  const user = await service.auth(String(username), String(password));
  if (!user) {
    return res
      .status(404)
      .json({ error: "잘못된 정보가 입력되었습니다.", status: 404 });
  }
  return res.json({
    access_token: generateToken(
      {
        user_id: user.id,
        keep,
      },
      keep
        ? {
            expiresIn: "31d",
          }
        : {}
    ),
  });
};
