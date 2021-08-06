import axios from 'axios'
import { userTypes } from '../constants/action.types'
import storeConfig from '../config/config'
export const setUser = (data) => ({
    type: userTypes.SET_USER,
    data
})

export const getUser = () => async (dispatch, getState) => {
    let res
    try {
        res = await axios.get('http://localhost:8080/admin/getAllUser/' + getState().userReducers.user.page)// lay tu csdl
    }
    catch (err) {
        console.log(err)
        return
    }
    dispatch(setUser(res.data.data))
    dispatch(setTotalPage(res.data.totalPage))

}

export const addUser = (email, password, firstName , lastName, address, phone_number, is_admin) => async (dispatch, getState) => {
    dispatch(resetUser())
    let res
    try {
        res = await axios.post('http://localhost:8080/admin/adduser', {//to back-end
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            address: address,
            phone_number: phone_number,
            is_admin: is_admin
        })
    }
    catch (err) {
        console.log(err)
        dispatch(addUserFail())
        return
    }
    dispatch(addUserSuccess())
    dispatch(getUser())
}

export const updateUser = (email, firstName, lastName, address, phone_number, is_admin) => async (dispatch, getState) => {
    let res
    try {
        res = await axios.post('http://localhost:8080/admin/updateuser', {//to back-end
            email: email,
            firstName: firstName,
            lastName: lastName,
            address: address,
            phone_number: phone_number,
            is_admin: is_admin
        })
    }
    catch (err) {
        console.log(err)
        dispatch(updateUserFail())
        return
    }
    dispatch(updateUserSuccess())
    dispatch(getUser())
}

