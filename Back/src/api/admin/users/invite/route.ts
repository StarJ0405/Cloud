import { ApiHandler } from "app";
import { sendMail } from "expand/smtp/module";
import { LinkService } from "services/link";
import { UserService } from "services/user";
import { container } from "tsyringe";
import { generateShortId } from "utils/functions";

export const POST: ApiHandler = async (req, res) => {
  const { email, domain } = req.body;
  try {
    const service = container.resolve(UserService);
    const user = await service.get({ where: { username: email } })
    if (user)
      return res.json({ error: '이미 존재하는 유저입니다.' })
    const linkService = container.resolve(LinkService);
    const end_date = new Date();
    end_date.setMinutes(end_date.getMinutes() + 10);
    const link = await linkService.create({
      code: generateShortId(6),
      type: email,
      chance: 1,
      start_date: new Date(),
      end_date,
      auto_delete: true
    })
    await sendMail({
      to: email, subject: `임시 협업용 프로젝트 코드는 ${link.code}입니다.`, html: `<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="width: 100%;">
  <tbody>
    <tr>
      <td align="center" style="padding: 20px;">
        <p style="font-weight: 700; font-size: 20px;">협업프로젝트에 가입하기</p>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 0 20px;">
        <div style="padding: 10px; width: 100%; text-align: center; border: 1px solid #EEEEEE; background-color: #F4F4F4; border-radius: 8px;">
          <p style="word-break: break-all;">${link.code}</p>
        </div>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 20px 10px;">
        <a href="${domain}/login?code=${link.code}&email=${email}" target="_blank" style="background-color: #2383e2; border-radius: 8px; color: #fff; text-decoration: none; padding: 15px 60px; font-size: 16px; font-weight: 700; display: inline-block;">매직 링크로 회원가입</a>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding-bottom: 20px;">
        <p style="font-size: 14px; color: #c1c1c1">협업을 하나로 끝내는 올인원 워크스페이스</p>
      </td>
    </tr>
  </tbody>
</table>` })
    return res.json({ message: "초대를 전송했습니다." })
  } catch (err) {
    return res.status(404).json({ error: "SMTP에 오류가 발생했습니다." })
  }

}