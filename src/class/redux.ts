import { combineReducers, configureStore } from "@reduxjs/toolkit";

import loginReducer from "../components/login/reducer";
import dashboardReducer from "../components/dashboard/reducer";
import addNoteReducer from "../components/note-editor/reducer";
import noteReducer from "../components/note/reducer";
import categoryReducer from "../components/category/reducer";

const combine = combineReducers({
    loginReducer,
    dashboardReducer,
    addNoteReducer,
    noteReducer,
    categoryReducer,
})

const store = configureStore({
    reducer:combine
})

export default store;
export const dispatch = store.dispatch
