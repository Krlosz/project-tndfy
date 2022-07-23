import {
    LOADING_GET_SONGS,
    SUCCESS_GET_SONGS,
    FAILURE_GET_SONGS
} from "../constants/songConstants";

export const getSongs = (token) => async dispatch => {
    dispatch({ type: LOADING_GET_SONGS });
    try {
        const res = await fetch("http://localhost:5000/api/songs", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const songs = await res.json();
        dispatch({ type: SUCCESS_GET_SONGS, payload: songs });
    } catch (err) {
        dispatch({ type: FAILURE_GET_SONGS, payload: err });
    }
}