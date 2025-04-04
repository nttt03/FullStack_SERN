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
        from: '"CareFlow.com 👻" <thanhthao.thptqt@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        html: getBodyHTMLEmail(dataSend), // html body
    });
    // console.log('dataSend >>>: ', dataSend);
}

let getBodyHTMLEmail = (dataSend) => {
    let result = '';    
    if (dataSend.language === 'vi') {
        result = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #2c3e50;">Xin chào ${dataSend.patientName},</h2>
                <p>Cảm ơn bạn đã đặt lịch hẹn khám bệnh tại <strong>CareFlow.com 👻</strong>.</p>
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
                <p style="color: #777; font-size: 14px;">Mọi thắc mắc vui lòng liên hệ <strong>CareFlow.com 👻</strong> qua email hoặc số điện thoại.</p>
            </div>
        `
    }
    if (dataSend.language === 'en') {
        result = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #2c3e50;">Hello ${dataSend.patientName},</h2>
                <p>Thank you for booking your medical appointment at <strong>CareFlow.com 👻</strong>.</p>
                <p>Appointment details:</p>
                <p>Time: ${dataSend.time}</p>
                <p>Doctor: ${dataSend.doctorName}</p>
                <p>To complete your booking, please confirm your appointment by clicking the button below:</p>
                <div style="text-align: center; margin: 20px 0;">
                    <a href=${dataSend.redirectLink} target="_blank"
                        style="background-color: #28a745; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
                        Confirm Appointment
                    </a>
                </div>
                <p style="font-style: italic;">If you did not request this appointment, please ignore this email. Thank you!</p>
                <hr style="border: none; border-top: 1px solid #ddd;">
                <p style="color: #777; font-size: 14px;">For any inquiries, please contact <strong>CareFlow.com 👻</strong> via email or phone.</p>
            </div>

        `
    }
    return result;
}

let sendAttachment = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
          user: process.env.EMAIL_APP,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
    });
    console.log("Base64 Image Data: ", dataSend.imgBase64.substring(0, 100)); // Log 100 ký tự đầu

    let info = await transporter.sendMail({
        from: '"CareFlow.com 👻" <thanhthao.thptqt@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Kết quả đặt lịch khám bệnh", // Subject line
        html: getBodyHTMLEmailRemeDy(dataSend), // html body
        attachments: [
            {
                filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
                content: dataSend.imgBase64.split("base64,")[1],
                encoding: 'base64',
            }
        ]
    });
}

let getBodyHTMLEmailRemeDy = (dataSend) => {
    let result = '';    
    if (dataSend.language === 'vi') {
        result = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #2c3e50;">Xin chào ${dataSend.patientName},</h2>
                <p>Cảm ơn bạn đã đặt lịch và khám bệnh tại <strong>CareFlow.com 👻</strong>.</p>
                <p>Thông tin đơn thuốc/hóa đơn y tế trong file đính kèm.</p>

            </div>
        `
    }
    if (dataSend.language === 'en') {
        result = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #2c3e50;">Hello ${dataSend.patientName},</h2>
                <p>Thank you for booking your medical appointment at <strong>CareFlow.com 👻</strong>.</p>
                <p>Prescription/medical bill information in attached file.</p>
                
            </div>

        `
    }
    return result;
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment: sendAttachment
}