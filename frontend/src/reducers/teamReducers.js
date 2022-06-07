
import {
    TEAM_LIST_REQUEST,
    TEAM_LIST_SUCCESS,
    TEAM_LIST_FAIL,
    TEAM_DETAILS_REQUEST,
    TEAM_DETAILS_SUCCESS,
    TEAM_DETAILS_FAIL,
    TEAM_DELETE_REQUEST,
    TEAM_DELETE_SUCCESS,
    TEAM_DELETE_FAIL,
    TEAM_CREATE_REQUEST,
    TEAM_CREATE_SUCCESS,
    TEAM_CREATE_FAIL,
    TEAM_CREATE_RESET,
    TEAM_UPDATE_REQUEST,
    TEAM_UPDATE_SUCCESS, TEAM_UPDATE_FAIL, TEAM_UPDATE_RESET
} from "../constants/teamConstants";


export const teamListReducers = (state={teams:[]}, action)=>{
    switch (action.type){
        case TEAM_LIST_REQUEST:
            return {loading:true, teams: []}
        case TEAM_LIST_SUCCESS:
            return {loading: false, teams: action.payload}
        case TEAM_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;

    }
}
export const teamDetailsReducers = (state={team:{}}, action)=>{
    switch (action.type){
        case TEAM_DETAILS_REQUEST:
            return {loading:true, ...state}
        case TEAM_DETAILS_SUCCESS:
            return {loading: false, team: action.payload}
        case TEAM_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;

    }
}
export const teamDeleteReducer = (state ={ } , action) =>{
    switch (action.type){
        case TEAM_DELETE_REQUEST:
            return {loading:true}
        case TEAM_DELETE_SUCCESS:
            return {loading:false,success: true
           }
        case TEAM_DELETE_FAIL:
            return {loading:false, error: action.payload}
        default:
            return state
    }
}
export const teamCreateReducer = (state ={ } , action) =>{
    switch (action.type){
        case TEAM_CREATE_REQUEST:
            return {loading:true}
        case TEAM_CREATE_SUCCESS:
            return {loading:false,success: true,team: action.payload
           }
        case TEAM_CREATE_FAIL:
            return {loading:false, error: action.payload}
         case TEAM_CREATE_RESET:
            return {

            }
        default:
            return state
    }
}
export const teamUpdateReducer = (state ={team:{} } , action) =>{
    switch (action.type){
        case TEAM_UPDATE_REQUEST:
            return {loading:true}
        case TEAM_UPDATE_SUCCESS:
            return {loading:false,success: true,team: action.payload
           }
        case TEAM_UPDATE_FAIL:
            return {loading:false, error: action.payload}
         case TEAM_UPDATE_RESET:
            return {
                team: {}
            }
        default:
            return state
    }
}
