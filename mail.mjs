import nodemailer from 'nodemailer'


const text = `<td><span style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:16px;line-height:21px;color:#141823">
<span style="font-size:15px"><span><p></p><div style="margin-top:16px;margin-bottom:20px">Xin chào ${data.name},
</div>
<div>Chúng tôi gửi bạn mã xác nhận từ email của hãng của từ hãng bay.
</div>Nhập mã xác nhận của bạn sau đây:<p></p><table border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:max-content;margin-top:20px;margin-bottom:20px"><tbody><tr><td style="font-size:11px;font-family:LucidaGrande,tahoma,verdana,arial,sans-serif;padding:14px 32px 14px 32px;background-color:#f2f2f2;border-left:1px solid #ccc;border-right:1px solid #ccc;border-top:1px solid #ccc;border-bottom:1px solid #ccc;text-align:center;border-radius:7px;display:block;border:1px solid #1877f2;background:#e7f3ff">
<span style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:16px;line-height:21px;color:#141823"><span style="font-size:17px;font-family:Roboto;font-weight:700;margin-left:0px;margin-right:0px">${code}</span>
</span></td></tr></tbody></table></span><table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse"><tbody><tr><td height="20" style="line-height:20px">&nbsp;</td></tr><tr><td align="middle">
<a href="https://www.facebook.com/n/?recover%2Fcode%2F&amp;n=91935384&amp;s=23&amp;exp_locale=vi_VN&amp;cuid=AYjbhKqDiLb%0DEz-pwOaSU7fk7TV7FMo3PNp6bftz3Q0_lQ8TSwSD_PyFcLCxTs4r_KeVBfNjO_xU6sEZItn7n0sLQUNOK3AG-bpufkIPVYF1Wfg&amp;redirect_%0Dfrom=button&amp;aref=1682318510989170&amp;medium=email&amp;mid=5fa0f03a91ca0G5af438c3fcbdG5fa0f4d3f1f72G178&amp;n_m=luxi291%0D000%40gmail.com&amp;rms=v2&amp;irms=true" style="color:#1b74e4;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/n/?recover%252Fcode%252F%26n%3D91935384%26s%3D23%26exp_locale%3Dvi_VN%26cuid%3DAYjbhKqDiLb%250DEz-pwOaSU7fk7TV7FMo3PNp6bftz3Q0_lQ8TSwSD_PyFcLCxTs4r_KeVBfNjO_xU6sEZItn7n0sLQUNOK3AG-bpufkIPVYF1Wfg%26redirect_%250Dfrom%3Dbutton%26aref%3D1682318510989170%26medium%3Demail%26mid%3D5fa0f03a91ca0G5af438c3fcbdG5fa0f4d3f1f72G178%26n_m%3Dluxi291%250D000%2540gmail.com%26rms%3Dv2%26irms%3Dtrue&amp;source=gmail&amp;ust=1685068639084000&amp;usg=AOvVaw2vKj6ve5mgL60KuEpnWsvO"><table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse"><tbody><tr></tr></tbody></table></a></td></tr><tr><td height="8" style="line-height:8px">&nbsp;</td></tr><tr><td height="20" style="line-height:20px">&nbsp;</td></tr></tbody></table><div><div><div id="m_-577211827332261005q_30" aria-label="Hiển thị nội dung bị rút gọn" aria-expanded="false"><div></div></div></div></div></span></span></td>`


async function main() {
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "luxi291000@gmail.com", // generated ethereal user
          pass: "qoaxsitwulvmemzg", // generated ethereal password
        },
      });
      let info = await transporter.sendMail({
        from: 'luxi291000@gmail.com', // sender address
        to: "builehuy1@dtu.edu.vn", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "hihi", // plain text body
        html: text, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);