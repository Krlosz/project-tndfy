import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { getSongsReducer } from "./reducers/songReducers";
import { getSubscriptionTypeReducer } from "./reducers/subscriptionTypeReducers";
import { getUserSubscriptionReducer } from "./reducers/subscriptionReducers";

const reducers = combineReducers({
    songs: getSongsReducer,
    subscriptionTypes: getSubscriptionTypeReducer,
    subscription: getUserSubscriptionReducer,
});

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
