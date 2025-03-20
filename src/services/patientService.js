import { where } from 'sequelize';
import db from '../models/index';
import { defaults } from 'lodash';
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