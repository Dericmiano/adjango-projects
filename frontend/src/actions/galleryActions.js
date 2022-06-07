import {
    GALLERY_LIST_REQUEST,
    GALLERY_LIST_SUCCESS,
    GALLERY_LIST_FAIL,
    GALLERY_DETAILS_REQUEST,
    GALLERY_DETAILS_SUCCESS,
    GALLERY_DETAILS_FAIL,
    GALLERY_DELETE_FAIL,
    GALLERY_DELETE_SUCCESS,
    GALLERY_DELETE_REQUEST,
    GALLERY_CREATE_REQUEST,
    GALLERY_CREATE_SUCCESS,
    GALLERY_CREATE_FAIL,
    GALLERY_UPDATE_REQUEST,
    GALLERY_UPDATE_SUCCESS, GALLERY_UPDATE_FAIL
} from "../constants/galleryConstants";
import axios from "axios";

export const listGallery = () => async (dispatch) =>{
    try {
        dispatch({type : GALLERY_LIST_REQUEST})
        const { data } = await axios.get('/api/gallery/')
        dispatch({
            type:GALLERY_LIST_SUCCESS,
            payload:data
        })
    }catch (error){
        dispatch({
            type:GALLERY_LIST_FAIL,
            payload:error.response && error.response.data.message
                ? error.response.data.message
                :error.message,
        })

    }

}
export const listGalleryDetails = (id) => async (dispatch) =>{
    try {
        dispatch({type : GALLERY_DETAILS_REQUEST})
        const { data } = await axios.get(`/api/gallery/${id}`)

        dispatch({
            type:GALLERY_DETAILS_SUCCESS,
            payload:data
        })
    }catch (error){
        dispatch({
            type:GALLERY_DETAILS_FAIL,
            payload:error.response && error.response.data.message
                ? error.response.data.message
                :error.message,
        })

    }

}
export const deleteGallery = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GALLERY_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/gallery/delete/${id}/`,
            config
        )

        dispatch({
            type: GALLERY_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: GALLERY_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
export const createGallery = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: GALLERY_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/gallery/create/`,
            {},
            config
        )

        dispatch({
            type: GALLERY_CREATE_SUCCESS,
            payload:data,
        })


    } catch (error) {
        dispatch({
            type: GALLERY_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
export const updateGallery = (gallery) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GALLERY_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/gallery/update/${gallery._id}/`,
            gallery,
            config
        )

        dispatch({
            type: GALLERY_UPDATE_SUCCESS,
            payload:data,
        })

        dispatch({
            type:GALLERY_DETAILS_SUCCESS,
            payload:data
        })


    } catch (error) {
        dispatch({
            type: GALLERY_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

