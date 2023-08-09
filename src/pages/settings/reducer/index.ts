import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./state";
import { loadPhotoAction, loadNamespaceAction, updateNamespace } from './actions';

const slice = createSlice({
  name: "settings",
  initialState: initialState,
  reducers: {
    loading: (state) => { state.loading = true }
  },
  extraReducers(builder) {
    builder.addCase(loadPhotoAction.fulfilled, (state, action) => {
      const result = [];
      const { files } = action.payload.payload!;
      for (const file of files) {
        if (!file.startsWith('demo')) {
          result.push(file);
        }
      }
      result.reverse();
      state.photos = result;
    });
    builder.addCase(loadNamespaceAction.fulfilled, (state, action) => {
      const { success, payload } = action.payload;
      if (success) {
        const nID = sessionStorage.getItem("namespace");
        for (const namespace of payload!) {
          if (namespace.id === nID) {
            state.namespace = {
              ...namespace,
              state: (namespace.state === "Run") ? "اجرا" : "معلق",
            }
            break;
          }
        }
      }
      state.loading = false;
    });
    builder.addCase(updateNamespace.fulfilled, (state, action) => {
      const { success, payload } = action.payload;
      if (success) {
        const nID = sessionStorage.getItem("namespace");
        for (const namespace of payload!) {
          if (namespace.id === nID) {
            state.namespace = {
              ...namespace,
              state: (namespace.state === "Run") ? "اجرا" : "معلق",
            }
            break;
          }
        }
      }
      state.loading = false;
    });
  },
})

export const { reducer, actions } = slice;
export default reducer;
