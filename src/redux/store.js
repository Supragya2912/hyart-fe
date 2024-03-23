import { configureStore, combineReducers } from "@reduxjs/toolkit";
import appConfigReducer from "./slices/appConfigSlice";
import cartReducer from "./slices/cartSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    appConfigReducer,
    cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: [thunk]
});

export const persistor = persistStore(store);