import userServise from '../services/userService'

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if(!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!',
        })
    }

    let userData = await userServise.handleUserLogin(email, password);
    // check email có tồn tại hay ko
    // so sánh password
    // return userInfor
    // access_token:JWT
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.body.id; // ALL, id
    if(!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter',
            users: []
        })
    }
    let users = await userServise.getAllUsers(id);
    console.log(users)

    return res.status(200).json({
        errCode: 0,
        errMessage: 'ok',
        users
    })
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,

}