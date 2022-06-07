import {BOOKING_ADD_ITEM,BOOKING_REMOVE_ITEM,
    BOOKING_SAVE_SHIPPING_ADDRESS,BOOKING_CLEAR_ITEMS} from "../constants/bookingConstants";



export const bookingReducer = (state={bookingItems:[],bookingDetails:{}}, action) =>{
    switch (action.type){
        case BOOKING_ADD_ITEM:
            const item = action.payload
            const existItem = state.bookingItems.find(x=>x.service===item.service)
            if (existItem){
                return  {
                    ...state,
                    bookingItems: state.bookingItems.map(x=>
                        x.service === existItem.service ? item : x
                    )
                }

            }else {
                return {
                    ...state,
                    bookingItems: [...state.bookingItems, item]
                }
            }
        case BOOKING_REMOVE_ITEM:
            return {
                ...state,
                bookingItems: state.bookingItems.filter(x=>x.service !== action.payload)
            }

        case BOOKING_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                bookingDetails: action.payload
            }
        case BOOKING_CLEAR_ITEMS:
            return {
                ...state,
                bookingItems: []

            }
        default:
        return state

    }
}