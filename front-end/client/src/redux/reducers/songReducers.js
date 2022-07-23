import {
    LOADING_GET_SONGS,
    SUCCESS_GET_SONGS,
    FAILURE_GET_SONGS
} from '../constants/songConstants'
const INITIAL_STATE = {}

const getSongsReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case LOADING_GET_SONGS:
            return { ...state, ...action.payload, loadingGetSongs: true }
        case SUCCESS_GET_SONGS:
            return { ...state, ...action.payload, loadingGetSongs: false }
        case FAILURE_GET_SONGS:
            return { ...state, ...action.payload, loadingGetSongs: false }
        case "RESET":
            return INITIAL_STATE
        default:
            return state
    }
}
export { getSongsReducer }