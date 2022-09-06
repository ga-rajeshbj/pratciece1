import { combineReducers } from "redux";
import { slotReducer } from "./reducer/reducer";

export const rootReducer = combineReducers({ slotReducer });

export type RootState = ReturnType<typeof rootReducer>;
