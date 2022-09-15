import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginReducer from "../../components/login/reducer";
import dashboardReducer from "../../components/dashboard/reducer";
import addNoteReducer from "../../components/note-add/reducer";

const combine = combineReducers({
    loginReducer,
    dashboardReducer,
    addNoteReducer
})

const store = configureStore({
    reducer:combine
})

export default store;
export const dispatch = store.dispatch
