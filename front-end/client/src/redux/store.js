import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { getSongsReducer } from "./reducers/songReducers";

const reducers = combineReducers({
    songs: getSongsReducer
});

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
