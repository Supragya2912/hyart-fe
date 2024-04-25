import { configureStore, combineReducers } from "@reduxjs/toolkit";
import appConfigReducer from "../redux/slices/appConfigSlice";
import cartReducer from "../redux/slices/cartSlice";
import productReducer from "../redux/slices/productSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["cartReducer", "productReducer"],
};

const rootReducer = combineReducers({
    appConfigReducer,
    cartReducer,
    productReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: [thunk]
});

export const persistor = persistStore(store);