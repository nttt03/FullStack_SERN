import db from '../models/index';
import emailService from '../services/emailService';
import { v4 as uuidv4 } from 'uuid';
require('dotenv').config();

let buildUrlEmail = (doctorId, token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`
    return result;
}

let postBookApointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.date || !data.timeType || !data.fullName || !data.selectedGender || !data.address) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter...'
                })
            } else {
                let token = uuidv4(); // 1e8fbb8b-cd0a-4a9f-bda6-24a508bb43f8
                // gửi mail
                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: buildUrlEmail(data.doctorId, token)
                });

                // upsert patient
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
                        gender: data.selectedGender,
                        address: data.address,
                        firstName: data.fullName,
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
                            token: token
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

let postVerifyBookApointment = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!data.token || !data.doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters',
                })
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        token: data.token,
                        doctorId: data.doctorId,
                        statusId: 'S1'
                    },
                    // để raw: false (nó sẽ trả ra 1 sequelize object) thì mới dùng được hàm update (appointment.save())
                    // trong file config.json để raw: true (nó sẽ trả ra 1 object của javascript)
                    raw: false
                })

                if (appointment) {
                    // update status (gán dl trước r mới dùng được hàm update)
                    appointment.statusId = 'S2'
                    await appointment.save()
                    
                    resolve({
                        errCode: 0,
                        errMessage: 'Xác nhận lịch hẹn thành công!',
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: 'Lịch hẹn đã được xác nhận hoặc không tồn tại!',
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    postBookApointment: postBookApointment,
    postVerifyBookApointment: postVerifyBookApointment
}