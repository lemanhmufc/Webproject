export const getBook = () => async (dispatch, getState) => {
    let res
    try {
        res = await axios.post('http://localhost:8080/book/allbook', //danh sach tat ca sach tren csdl
        {
            page: getState().bookReducers.book.page,
            range: null
        })
    }
    catch (err) {
        console.log(err)
        return
    }
    dispatch(setBook(res.data.data))
    dispatch(setTotalPage(res.data.totalPage))
}

export const setBook = (data) => ({
    type: bookTypes.SET_BOOK,
    data
})

export const setPage = (page) => ({
    type: bookTypes.SET_PAGE,
    page
})

export const addBookSuccess = () => ({
        type: bookTypes.ADD_BOOK_SUCCESS
    })

export const addBookFail = () => ({
        type: bookTypes.ADD_BOOK_FAIL
    })
export const updateBookSuccess = () => ({
        type: bookTypes.UPDATE_BOOK_SUCCESS
    })

export const updateBookFail = () => ({
        type: bookTypes.UPDATE_BOOK_FAIL
    })

export const addBook = (id_category, name, price, release_date, describe, id_nsx, id_author, file) =>
     async (dispatch, getState) => {
        let data = new FormData()
        data.append('file', file)
        data.append('id_category', id_category) 
        data.append('name', name) 
        data.append('price', price)  
        data.append('release_date', release_date)
        data.append('describe', describe)
        data.append('id_nsx', id_nsx)
        data.append('id_author', id_author)
        let res
        try {
            res = await axios.post('http://localhost:8080/admin/addbook', data) // them sach tren csdl
        }
        catch(err) {
            dispatch(addBookFail())
            return
        } 
        dispatch(addBookSuccess())
        dispatch(getBook())
    }

export const updateBook = (id, name, id_category, price, release_date, describe, id_nsx, id_author, file) => async (dispatch, getState) => {
        let data = new FormData()
        data.append('file', file)
        data.append('id', id)
        data.append('id_category', id_category) 
        data.append('name', name) 
        data.append('price', price)  
        data.append('release_date', release_date)
        data.append('describe', describe)
        data.append('id_nsx', id_nsx)
        data.append('id_author', id_author)
        let res
        try {
            res = await axios.post('http://localhost:8080/admin/updatebook', data) //sua sach tren csdl
        }
        catch(err) {
            dispatch(updateBookFail())
            return
        } 
        dispatch(updateBookSuccess())
        dispatch(getBook())
    }

export const deleteBook = (id) => async(dispatch, getState) => {
    let res
    try {
        res = await axios.get('http://localhost:8080/admin/deletebook/' +id) //xoa sach
    }
    catch (err) {
        console.log(err)
        return
    }
    console.log(res)
    dispatch(getBook())
}
