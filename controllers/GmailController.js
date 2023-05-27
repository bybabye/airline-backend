import nodemailer from "nodemailer";

function generateRandomNumber() {
  const min = 10000000; // Giá trị nhỏ nhất có thể sinh ra
  const max = 99999999; // Giá trị lớn nhất có thể sinh ra

  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber.toString();
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
<div>Chúng tôi gửi bạn mã xác nhận từ email của bạn từ hãng bay Airline Esport.
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
      subject: `${code} là Mã xác nhận của bạn`, // Subject line
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
 *  gmail : '',
 *  sbdi : '',
 *  sbden: '',
 *  giodi : '',
 *  gioden : '',
 *  giobay : '',
 * }
 */
// time di voi time den
export const SendMailBuyTicket = async (req, res) => {
  const data = req.body;
 
  const code = req.body.code;

  const giodiDate = new Date(data.giodi);
  const formattedgiodiTime = giodiDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

// Format the date to 'Day, DD Month YYYY' format
  const formattedgiodiDate = giodiDate.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });

  const giodenDate = new Date(data.gioden);
  const formattedgiodenTime = giodenDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

// Format the date to 'Day, DD Month YYYY' format
  const formattedgiodenDate = giodenDate.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
  const html = `<body>
  <div class="container" style="max-width: 800px; margin: 0 auto; padding: 20px;">
    <table class="flight-section" style="margin-bottom: 20px; border: 1px solid #ccc; padding: 10px; border-radius: 3px; width: 100%;">
      <tr>
        <td colspan="2" class="flight-info" style="font-size: 18px; font-weight: bold; margin-bottom: 10px; border-bottom: 1px solid #ccc; padding-bottom: 10px;">${data.sbdi} arrive ${data.sbden} - ${code}</td>
      </tr>
      <tr>
        <td colspan="2" class="flight-time" style="font-size: 16px; color: #777; margin-bottom: 20px;">${formattedgiodiTime }, ${formattedgiodiDate} - ${formattedgiodenTime} , ${formattedgiodenDate}</td>
      </tr>
      <tr>
        <td>
          <div class="icon-text" style="margin-right: 5px;">🛫 Cất cánh</div>
          <div class="icon-text" style="margin-right: 5px; margin-top: 10px;"> ${data.sbdi} (${data.masbdi}) </div>
          <p id="departure-time" style="font-size: 16px; color: #333; margin-bottom: 5px;">${formattedgiodiTime }, ${formattedgiodiDate}</p>
        </td>
        <td class="icon-text" style="margin-right: 5px;"> ⏰ Thời gian bay
          <p id="flight-duration" style="font-size: 16px; color: #333; margin-bottom: 5px;">${data.giobay}</p>
        </td>
      </tr>
      <tr>
        <td class="icon-text" style="margin-right: 5px;">🛬 Hạ cánh
          <div class="icon-text" style="margin-right: 5px; margin-top: 10px;"> ${data.sbden} (${data.masbden})</div>
          <p id="arrival-time" style="font-size: 16px; color: #333; margin-bottom: 5px;">${formattedgiodenTime} , ${formattedgiodenDate}</p>
        </td>
        <td class="icon-text" style="margin-right: 5px;">✅ Mã xác nhận 
          <p id="confirmation-code" style="font-size: 16px; color: #333; margin-bottom: 5px;">${code}</p>
        </td>
      </tr>
    </table>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/all.min.js"></script>
</body>`;

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

    return res.send({ code: code, id: info.id });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ messages: "Forbidden2" });
  }
};
