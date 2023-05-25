import nodemailer from "nodemailer";

function generateRandomNumber() {
  const min = 10000000; // Giá trị nhỏ nhất có thể sinh ra
  const max = 99999999; // Giá trị lớn nhất có thể sinh ra

  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber.toString();
}
function generateRandomString() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length = 6;
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

/**
 * send
 * {
 *  name : '',
 *  email : '',
 * }
 */
export const sendGmailAuthencation = async (req, res) => {
  const code = generateRandomNumber();
  const data = req.body;
  const html = `<td><span style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:16px;line-height:21px;color:#141823">
<span style="font-size:15px"><span><p></p><div style="margin-top:16px;margin-bottom:20px">Xin chào ${data.name},
</div>
<div>Chúng tôi gửi bạn mã xác nhận từ email của hãng của từ hãng bay.
</div>Nhập mã xác nhận của bạn sau đây:<p></p><table border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:max-content;margin-top:20px;margin-bottom:20px"><tbody><tr><td style="font-size:11px;font-family:LucidaGrande,tahoma,verdana,arial,sans-serif;padding:14px 32px 14px 32px;background-color:#f2f2f2;border-left:1px solid #ccc;border-right:1px solid #ccc;border-top:1px solid #ccc;border-bottom:1px solid #ccc;text-align:center;border-radius:7px;display:block;border:1px solid #1877f2;background:#e7f3ff">
<span style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:16px;line-height:21px;color:#141823"><span style="font-size:17px;font-family:Roboto;font-weight:700;margin-left:0px;margin-right:0px">${code}</span>
</span></td></tr></tbody></table></span><table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse"><tbody><tr><td height="20" style="line-height:20px">&nbsp;</td></tr><tr><td align="middle">
<a href="https://www.facebook.com/n/?recover%2Fcode%2F&amp;n=91935384&amp;s=23&amp;exp_locale=vi_VN&amp;cuid=AYjbhKqDiLb%0DEz-pwOaSU7fk7TV7FMo3PNp6bftz3Q0_lQ8TSwSD_PyFcLCxTs4r_KeVBfNjO_xU6sEZItn7n0sLQUNOK3AG-bpufkIPVYF1Wfg&amp;redirect_%0Dfrom=button&amp;aref=1682318510989170&amp;medium=email&amp;mid=5fa0f03a91ca0G5af438c3fcbdG5fa0f4d3f1f72G178&amp;n_m=luxi291%0D000%40gmail.com&amp;rms=v2&amp;irms=true" style="color:#1b74e4;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/n/?recover%252Fcode%252F%26n%3D91935384%26s%3D23%26exp_locale%3Dvi_VN%26cuid%3DAYjbhKqDiLb%250DEz-pwOaSU7fk7TV7FMo3PNp6bftz3Q0_lQ8TSwSD_PyFcLCxTs4r_KeVBfNjO_xU6sEZItn7n0sLQUNOK3AG-bpufkIPVYF1Wfg%26redirect_%250Dfrom%3Dbutton%26aref%3D1682318510989170%26medium%3Demail%26mid%3D5fa0f03a91ca0G5af438c3fcbdG5fa0f4d3f1f72G178%26n_m%3Dluxi291%250D000%2540gmail.com%26rms%3Dv2%26irms%3Dtrue&amp;source=gmail&amp;ust=1685068639084000&amp;usg=AOvVaw2vKj6ve5mgL60KuEpnWsvO"><table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse"><tbody><tr></tr></tbody></table></a></td></tr><tr><td height="8" style="line-height:8px">&nbsp;</td></tr><tr><td height="20" style="line-height:20px">&nbsp;</td></tr></tbody></table><div><div><div id="m_-577211827332261005q_30" aria-label="Hiển thị nội dung bị rút gọn" aria-expanded="false"><div></div></div></div></div></span></span></td>`;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "luxi291000@gmail.com", // generated ethereal user
        pass: "qoaxsitwulvmemzg", // generated ethereal password
      },
    });
    let info = await transporter.sendMail({
      from: "Airline", // sender address
      to: `${data.gmail}`, // list of receivers
      subject: `${code} là Mã khôi phục của bạn`, // Subject line
      text: "hihi", // plain text body
      html: html, // html body
    });

    return res.send({ code: code, id: info.id });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ messages: "Forbidden2" });
  }
};

/**
 * send
 * {
 *  
 *  email : '',
 *  sbdi : '',
 *  sbden: '',
 *  giodi : '',
 *  gioden : '',
 *  giobay : '',
 * }
 */
// time di voi time den
export const SendMailBuyTicket = async (req, res)  => {
  const data = req.body;
  const [ngaydi, giodi] = data.giodi.split(" ");
  const [ngayden, gioden] = data.gioden.split(" ");
  const code = generateRandomString();
  const html = `<div class="nH qY"><div><div class="qQ" tabindex="0" 
  jslog="72185; u014N:xr6bB; 7:WzIyLDMsIkZMSUdIVF9SRVNFUlZBVElPTiJd; 
  33:WzJd"><div class="t0"><div><div class="t1">${data.sbdi} đến ${data.sbden} – VJ 504</div><div class="t2">${data.giodi}–${data.gioden} ${data.ngaydi}</div>
  </div><div class="amE"></div></div><div class="tZ"><div class="y7 ">
  <div class="tk"><div class="tl yH"></div><div class="tg t3">
  <div class="vL">Cất cánh</div><div class="vU">${giodi} ${ngaydi}</div></div></div>
  <div class="tk"><div class="tl yG"></div><div class="tg t3">
  <div class="vL">Hạ cánh</div><div class="vU">${gioden} ${ngayden}</div>
  </div></div><div class="tk"><div class="tl tA"></div><div class="tg "><div class="vL">Thời gian bay</div>
  <div class="vU">${data.giobay}</div></div></div><div class="tk"><div class="tl tB"></div><div class="tg ">
  <div class="vL">Mã xác nhận</div><div class="vU">${code}</div></div></div></div></div></div></div></div>`


  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "luxi291000@gmail.com", // generated ethereal user
        pass: "qoaxsitwulvmemzg", // generated ethereal password
      },
    });
    let info = await transporter.sendMail({
      from: "Airline", // sender address
      to: `${data.gmail}`, // list of receivers
      subject: `Xác nhận thanh toán.`, // Subject line
      text: "hihi", // plain text body
      html: html, // html body
    });

    return res.send({ code: code ,id: info.id});
  } catch (error) {
    console.log(error);
    return res.status(403).json({ messages: "Forbidden2" });
  }
}