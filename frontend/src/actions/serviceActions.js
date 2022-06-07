import {
    SERVICE_LIST_FAIL,
    SERVICE_LIST_SUCCESS,
    SERVICE_LIST_REQUEST,
    SERVICE_DETAILS_REQUEST,
    SERVICE_DETAILS_SUCCESS,
    SERVICE_DETAILS_FAIL,
    SERVICE_DELETE_SUCCESS,
    SERVICE_DELETE_FAIL,
    SERVICE_DELETE_REQUEST,
    SERVICE_CREATE_SUCCESS,
    SERVICE_CREATE_FAIL,
    SERVICE_CREATE_REQUEST,
    SERVICE_UPDATE_SUCCESS,
    SERVICE_UPDATE_FAIL,
    SERVICE_UPDATE_REQUEST,
    SERVICE_CREATE_REVIEW_REQUEST,
    SERVICE_CREATE_REVIEW_SUCCESS, SERVICE_CREATE_REVIEW_FAIL,
} from "../constants/serviceConstants";
import axios from "axios";
export const listServices = () => async (dispatch) =>{
    try {
        dispatch({type : SERVICE_LIST_REQUEST})
        const { data } = await axios.get('/api/services/')

        dispatch({
            type:SERVICE_LIST_SUCCESS,
            payload:data
        })
    }catch (error){
        dispatch({
            type:SERVICE_LIST_FAIL,
            payload:error.response && error.response.data.message
                ? error.response.data.message
                :error.message,
        })

    }

}


export const listServiceDetails = (id) => async (dispatch) =>{
    try {
        dispatch({type : SERVICE_DETAILS_REQUEST})
        const { data } = await axios.get(`/api/services/${id}`)

        dispatch({
            type:SERVICE_DETAILS_SUCCESS,
            payload:data
        })
    }catch (error){
        dispatch({
            type:SERVICE_DETAILS_FAIL,
            payload:error.response && error.response.data.message
                ? error.response.data.message
                :error.message,
        })

    }

}
export const deleteService = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SERVICE_DELETE_REQUEST
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
            `/api/services/delete/${id}/`,
            config
        )

        dispatch({
            type: SERVICE_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: SERVICE_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
export const createService = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: SERVICE_CREATE_REQUEST
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
            `/api/services/create/`,
            {},
            config
        )

        dispatch({
            type: SERVICE_CREATE_SUCCESS,
            payload:data,
        })


    } catch (error) {
        dispatch({
            type: SERVICE_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateService = (service) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SERVICE_UPDATE_REQUEST
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
            `/api/services/update/${service._id}/`,
            service,
            config
        )

        dispatch({
            type: SERVICE_UPDATE_SUCCESS,
            payload:data,
        })

        dispatch({
            type:SERVICE_DETAILS_SUCCESS,
            payload:data
        })


    } catch (error) {
        dispatch({
            type: SERVICE_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createServiceReview = (serviceId,review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SERVICE_CREATE_REVIEW_REQUEST
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
            `/api/services/${serviceId}/reviews/`,
            review,
            config
        )

        dispatch({
            type: SERVICE_CREATE_REVIEW_SUCCESS,
            payload:data,
        })



    } catch (error) {
        dispatch({
            type: SERVICE_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


