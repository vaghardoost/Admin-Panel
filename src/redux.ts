import { combineReducers, configureStore } from "@reduxjs/toolkit";

import loginReducer from "./pages/login/reducer";
import dashboardReducer from "./pages/dashboard/reducer";
import addNoteReducer from "./pages/note-editor/reducer";
import noteReducer from "./pages/note/reducer";
import categoryReducer from "./pages/category/code/reducer";
import photoReducer from "./pages/photo/reducer";

const combine = combineReducers({
    loginReducer,
    dashboardReducer,
    addNoteReducer,
    noteReducer,
    categoryReducer,
    photoReducer,
})

const store = configureStore({
    reducer:combine
})

export default store;
export const dispatch = store.dispatch
