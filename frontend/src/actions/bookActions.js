import axios from "axios";
import {BOOKING_ADD_ITEM, BOOKING_REMOVE_ITEM, BOOKING_SAVE_SHIPPING_ADDRESS} from "../constants/bookingConstants";

export const addToBook = (id) => async (dispatch, getState)=>{
   const { data } = await axios.get(`/api/services/${id}`)
    dispatch({
        type:BOOKING_ADD_ITEM,
        payload:{
            service:data._id,
            name:data.name,
            image:data.image,
            price:data.price,
        }
    })
    localStorage.setItem('bookingItems',JSON.stringify(getState().book.bookingItems))

    // localStorage.setItem('bookingItems', getState().book.bookingItems)

}

export const removeFromBook = (id) => (dispatch, getState) => {
    dispatch({
        type:BOOKING_REMOVE_ITEM,
        payload:id,
    })
    localStorage.setItem('bookingItems',JSON.stringify(getState().book.bookingItems))

}

export const saveShippingAddress = (data) =>(dispatch) => {
    dispatch({
        type:BOOKING_SAVE_SHIPPING_ADDRESS,
        payload:data,

    })
    localStorage.setItem('bookingDetails',JSON.stringify(data))

}