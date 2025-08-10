import { ApiHandler } from "app";
import { LinkService } from "services/link";
import { container } from "tsyringe";

export const GET: ApiHandler = async (req, res) => {
  const { email, code } = req.parsedQuery;
  const service: LinkService = container.resolve(LinkService);
  const link = await service.get({ where: { code, type: email } })
  if (link) {
    if (!link?.start_date && !link?.end_date) return res.json({ exist: true })
    const now = new Date();
    if (link.chance && link.chance > 0 && now.getTime() >= new Date(link?.start_date || 0).getTime() && now.getTime() < new Date(link.end_date || 0).getTime()) {
      await service.update({ id: link.id }, { chance: Math.max(link.chance - 1, 0) })
      return res.json({ exist: true });
    } else {
      return res.json({
        exist: false,
        error: "링크가 만료되었습니다."
      });
    }
  }
  return res.json({
    exist: false,
    error: "링크가 유효하지않습니다."
  });
};
