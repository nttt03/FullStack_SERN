
import db from '../models/index';
import CRUDService from '../services/CRUDService';

let getHomePage = async (rep, res) => {
    try {
        let data = await db.User.findAll();
        // console.log('---------------------------')
        // console.log(data)
        // console.log('---------------------------')
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch(e) {
        console.log(e)
    }
    
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    // console.log(req.body);
    console.log(message);
    return res.send('post crud from server');
}

let getDataCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    console.log('------------------------------')
    console.log(data)
    console.log('------------------------------')
    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if(userId) {
        let userData = await CRUDService.getUserInfoById(userId);

        return res.render('editCRUD.ejs', {
            user: userData
        })

    }
    else {
        return res.send('User not found!');
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers
    })
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if(id) {
        await CRUDService.deleteUserById(id);
        return res.send('Done delete!');
    }
    else {
        return res.send('User not found!');
    }
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    getDataCRUD: getDataCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,

}