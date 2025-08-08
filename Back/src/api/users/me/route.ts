import { ApiHandler } from "app";
import { isAdult } from "utils/functions";

export const GET: ApiHandler = async (req, res) => {
  const user = req.user;

  if (user) {
    return res.json({
      user: { ...user, adult: isAdult(user?.birthday || new Date()) },
    });
  }
  return res.status(404).json("Unauthorized");
};
