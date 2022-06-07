import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

import {userLoginReducer} from "./reducers/userReducers";
import {userRegisterReducer} from "./reducers/userReducers";
import {userDetailsReducer} from "./reducers/userReducers";
import {userUpdateProfileReducer} from "./reducers/userReducers";
import {userUpdateReducer} from "./reducers/userReducers";
import {userListReducer} from "./reducers/userReducers";
import {userDeleteReducer} from "./reducers/userReducers";
import {serviceListReducers} from "./reducers/serviceReducer";
import {serviceDetailsReducers} from "./reducers/serviceReducer";
import {bookingReducer} from "./reducers/bookingReducers";

import {orderCreateReducer} from "./reducers/orderReducers";
import {orderDetailsReducer} from "./reducers/orderReducers";
import {orderListMyReducer} from "./reducers/orderReducers";
import {serviceDeleteReducer} from "./reducers/serviceReducer";
import {serviceCreateReducer} from "./reducers/serviceReducer";
import {serviceUpdateReducer} from "./reducers/serviceReducer";
import {orderListReducer} from "./reducers/orderReducers";
import {orderDeliverReducer} from "./reducers/orderReducers";
import {serviceReviewCreateReducer} from "./reducers/serviceReducer";
import {testimonialListReducers,testimonialDetailsReducers,testimonialCreateReducer,testimonialDeleteReducer,
    testimonialUpdateReducer
} from "./reducers/testimonialReducers";
import {teamListReducers, teamDetailsReducers,teamUpdateReducer,teamCreateReducer,teamDeleteReducer} from "./reducers/teamReducers";
import {galleryListReducers,galleryDetailsReducers,galleryUpdateReducer,galleryCreateReducer,galleryDeleteReducer} from "./reducers/galleryReducer";

const reducer = combineReducers(
    {
        userLogin:userLoginReducer,
        userRegister:userRegisterReducer,
        userDetails:userDetailsReducer,
        userUpdateProfile:userUpdateProfileReducer,
        userList:userListReducer,
        userDelete:userDeleteReducer,
        userUpdate:userUpdateReducer,

        serviceList:serviceListReducers,
        serviceDetails:serviceDetailsReducers,
        book:bookingReducer,

        orderCreate:orderCreateReducer,
        orderDetails:orderDetailsReducer,
        orderListMy:orderListMyReducer,
        orderList:orderListReducer,
        orderDeliver:orderDeliverReducer,

        serviceDelete:serviceDeleteReducer,
        serviceCreate:serviceCreateReducer,
        serviceUpdate:serviceUpdateReducer,
        serviceReviewCreate:serviceReviewCreateReducer,

        testimonialsList:testimonialListReducers,
        testimonialCreate:testimonialCreateReducer,
        testimonialDelete:testimonialDeleteReducer,
        testimonialUpdate:testimonialUpdateReducer,
        testimonialDetails:testimonialDetailsReducers,

        teamList:teamListReducers,
        teamDetails:teamDetailsReducers,
        teamUpdate:teamUpdateReducer,
        teamCreate:teamCreateReducer,
        teamDelete:teamDeleteReducer,

        galleryList:galleryListReducers,
        galleryDetails:galleryDetailsReducers,
        galleryUpdate:galleryUpdateReducer,
        galleryCreate:galleryCreateReducer,
        galleryDelete:galleryDeleteReducer,







    }
)


const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const bookingItemsFromStorage = localStorage.getItem('bookingItems') ?
    JSON.parse(localStorage.getItem('bookingItems')) : []

const bookingDetailsFromStorage = localStorage.getItem('bookingDetails') ?
    JSON.parse(localStorage.getItem('bookingDetails')) : {}



const initialState = {
    book:{
        bookingItems:bookingItemsFromStorage,
        bookingDetails: bookingDetailsFromStorage,
    },
    userLogin :{userInfo:userInfoFromStorage},

}


const  middleware = [thunk]
const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store
