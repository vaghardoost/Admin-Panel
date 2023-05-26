import { combineReducers, configureStore } from "@reduxjs/toolkit";

import layoutReducer from "./layout/reducer/index";
import loginReducer from "./pages/login/reducer";
import dashboardReducer from "./pages/dashboard/reducer/reducer";
import addNoteReducer from "./pages/note-editor/reducer";
import noteReducer from "./pages/note/reducer";
import categoryReducer from "./pages/category/reducer";
import categoryEditorReducer from "./pages/category-editor/reducer"
import photoReducer from "./pages/photo/reducer";

const combine = combineReducers({
    layoutReducer,
    loginReducer,
    dashboardReducer,
    addNoteReducer,
    noteReducer,
    categoryReducer,
    categoryEditorReducer,
    photoReducer,
})

const store = configureStore({
    reducer: combine
})

export default store;
export const dispatch = store.dispatch
