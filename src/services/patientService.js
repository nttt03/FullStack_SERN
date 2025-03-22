import { where } from 'sequelize';
import db from '../models/index';
import emailService from '../services/emailService';
require('dotenv').config();

let postBookApointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.date || !data.timeType) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter...'
                })
            } else {
                // gửi mail
                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: 'Anh Hào',
                    time: '8:00 - 9:00 Chủ nhật 1/12/2025',
                    doctorName: 'Bác sĩ Tuyến',
                    redirectLink: 'https://github.com/nttt03'
                });

                // upsert patient
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3'
                    }
                });
                // vì findOrCreate mặc định trả về 1 mảng gồm [object, created]
                // object: dl user lấy về, created: true/false để biết user đã tồn tại hay chưa
                // user[0] là object, user[1] là created
                console.log('>>> check user: ', user[0]);

                // create a booking record
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                        }
                        
                    })
                }

                resolve({ 
                    errCode: 0,
                    errMessage: 'Save booking successfully',
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    postBookApointment: postBookApointment
}