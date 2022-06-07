import {TESTIMONIAL_LIST_FAIL,TESTIMONIAL_LIST_REQUEST,TESTIMONIAL_LIST_SUCCESS,
    TESTIMONIAL_DETAILS_FAIL,TESTIMONIAL_DETAILS_SUCCESS,TESTIMONIAL_DETAILS_REQUEST,
    TESTIMONIAL_DELETE_REQUEST,TESTIMONIAL_DELETE_FAIL,TESTIMONIAL_DELETE_SUCCESS,
    TESTIMONIAL_CREATE_SUCCESS,TESTIMONIAL_CREATE_REQUEST,TESTIMONIAL_CREATE_RESET,TESTIMONIAL_CREATE_FAIL,
    TESTIMONIAL_UPDATE_REQUEST,TESTIMONIAL_UPDATE_FAIL,TESTIMONIAL_UPDATE_SUCCESS,TESTIMONIAL_UPDATE_RESET
} from "../constants/testimonialsConstants";


export const testimonialListReducers = (state={testimonials:[]}, action)=>{
    switch (action.type){
        case TESTIMONIAL_LIST_REQUEST:
            return {loading:true, testimonials: []}
        case TESTIMONIAL_LIST_SUCCESS:
            return {loading: false, testimonials: action.payload}
        case TESTIMONIAL_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;

    }
}
export const testimonialDetailsReducers = (state={ testimonial : {}}, action)=>{
    switch (action.type){
        case TESTIMONIAL_DETAILS_REQUEST:
            return {...state,loading:true}
        case TESTIMONIAL_DETAILS_SUCCESS:
            return {loading:false, testimonial:action.payload}
        case TESTIMONIAL_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;

    }
}
export const testimonialDeleteReducer = (state ={ } , action) =>{
    switch (action.type){
        case TESTIMONIAL_DELETE_REQUEST:
            return {loading:true}
        case TESTIMONIAL_DELETE_SUCCESS:
            return {loading:false,success: true
           }
        case TESTIMONIAL_DELETE_FAIL:
            return {loading:false, error: action.payload}
        default:
            return state
    }
}
export const testimonialCreateReducer = (state ={ } , action) =>{
    switch (action.type){
        case TESTIMONIAL_CREATE_REQUEST:
            return {loading:true}
        case TESTIMONIAL_CREATE_SUCCESS:
            return {loading:false,success: true,testimonial: action.payload
           }
        case TESTIMONIAL_CREATE_FAIL:
            return {loading:false, error: action.payload}
         case TESTIMONIAL_CREATE_RESET:
            return {

            }
        default:
            return state
    }
}
export const testimonialUpdateReducer = (state ={testimonial:{} } , action) =>{
    switch (action.type){
        case TESTIMONIAL_UPDATE_REQUEST:
            return {loading:true}
        case TESTIMONIAL_UPDATE_SUCCESS:
            return {loading:false,success: true,testimonial: action.payload
           }
        case TESTIMONIAL_UPDATE_FAIL:
            return {loading:false, error: action.payload}
         case TESTIMONIAL_UPDATE_RESET:
            return {
                testimonial: {}
            }
        default:
            return state
    }
}
