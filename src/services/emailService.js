require('dotenv').config();
import nodemailer from 'nodemailer';


let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
          user: process.env.EMAIL_APP,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
    });
    let info = await transporter.sendMail({
        from: '"BookingCare.com 👻" <thanhthao.thptqt@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #2c3e50;">Xin chào ${dataSend.patientName},</h2>
                <p>Cảm ơn bạn đã đặt lịch hẹn khám bệnh tại <strong>BookingCare.com 👻</strong>.</p>
                <p>Thông tin đặt lịch khám bệnh:</p>
                <p>Thời gian: ${dataSend.time}</p>
                <p>Bác sĩ: ${dataSend.doctorName}</p>
                <p>Để hoàn tất việc đặt lịch, vui lòng xác nhận lịch hẹn của bạn bằng cách nhấn vào nút bên dưới:</p>
                <div style="text-align: center; margin: 20px 0;">
                <a href=${dataSend.redirectLink} target="_blank"
                    style="background-color: #28a745; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
                    Xác nhận lịch hẹn
                </a>
                </div>
                <p style="font-style: italic;">Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email. Xin cảm ơn!</p>
                <hr style="border: none; border-top: 1px solid #ddd;">
                <p style="color: #777; font-size: 14px;">Mọi thắc mắc vui lòng liên hệ <strong>BookingCare.com 👻</strong> qua email hoặc số điện thoại.</p>
            </div>
        `, // html body
      });
}


module.exports = {
    sendSimpleEmail: sendSimpleEmail
}