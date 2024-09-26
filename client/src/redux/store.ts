import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { PersistConfig } from "redux-persist/lib/types";
import storage from "redux-persist/lib/storage";
import CounterNIP, {autoIncrement} from "./slices/increment"

const CounterPersistConfig: PersistConfig<autoIncrement> =  {
    key : "counter:NIP",
    storage,
    whitelist: ["counter"]
};

const persistedCounterReducer = persistReducer(CounterPersistConfig, CounterNIP)

export const store = configureStore({
    reducer: {
        counter: persistedCounterReducer
    }
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;