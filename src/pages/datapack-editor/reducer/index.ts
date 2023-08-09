import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state";
import { Bottomsheet, Environment, Note, SectionName, SectionType } from "../../../model/note";
import { loadDatapackAction, loadPhotoAction, saveDatapackAction, updateDatapackAction, setIndexDatapackId } from "./actions";

const slice = createSlice({
  name: 'datapack',
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.env = { bottomsheet: [] };
      delete state.id;
    },
    setTitle: (state, { payload }: PayloadAction<string>) => {
      state.title = payload;
    },
    setEditable: (state, { payload }: PayloadAction<string>) => {
      state.id = payload;
    },
    setloading: (state) => {
      state.loading = true;
    },
    setContent: (state, { payload }: PayloadAction<SectionType[]>) => {
      state.content = payload;
    },
    openDrawer: (state, { payload }: PayloadAction<SectionName>) => {
      state.drawerBottomsheet = {
        open: true,
        type: payload
      };
    },
    openDrawerAsEdit: (state, { payload }: PayloadAction<Bottomsheet>) => {
      state.drawerBottomsheet = {
        open: true,
        type: payload.content!.type,
        bottomsheet: payload
      };
    },
    closeDrawer: (state) => {
      state.drawerBottomsheet = {
        type: SectionName.caption,
        open: false
      }
    },
    pushBottomsheet: (state, { payload }: PayloadAction<Bottomsheet>) => {
      state.env.bottomsheet.push(payload)
    },
    updateBottomsheet: (state, { payload }: PayloadAction<Bottomsheet>) => {
      state.env.bottomsheet.forEach((item, index) => {
        if (item.id === payload.id) {
          state.env.bottomsheet[index] = payload
        }
      })
    },
    deleteBottomsheet: (state, { payload }: PayloadAction<string>) => {
      state.env.bottomsheet.forEach((item, index) => {
        if (item.id === payload)
          state.env.bottomsheet.splice(index, 1)
      })
    },
    drawerDraft: (state, { payload }: PayloadAction<boolean>) => {
      state.drawerDraft = payload;
    },
    setEnv: (state, { payload }: PayloadAction<Environment>) => {
      state.env = payload;
    },
    saveDraft: (state, { payload }: PayloadAction<string>) => {
      const date = new Date();
      const key = `${date.toLocaleDateString('fa-IR')} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      const note: Note = {
        author: '',
        tag: [],
        id: payload,
        title: state.title,
        content: state.content,
        env: state.env
      }
      localStorage.setItem(key, JSON.stringify(note));
      state.drawerDraft = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadPhotoAction.fulfilled, (state, { payload }) => {
      const result = []
      for (const file of payload) {
        if (!file.startsWith('demo')) {
          result.push(file);
        }
      }
      state.photo = result.reverse();
    })
    builder.addCase(saveDatapackAction.fulfilled, (state, { payload }) => {
      if (payload) {
        state.id = payload.id
        state.loading = false;
      }
    })
    builder.addCase(loadDatapackAction.fulfilled, (state, { payload }) => {
      const { success, payload: result } = payload;
      if (success) {
        state.env = result!.env!
        state.id = result!.id
        state.title = result!.title
      }
      state.loading = false;
    })
    builder.addCase(updateDatapackAction.fulfilled, (state, { payload }) => {
      const { success } = payload;
      if (success) {
        state.loading = false
      }
    })
    builder.addCase(setIndexDatapackId.fulfilled, (state, { payload }) => {
      const { success, datapack } = payload;
      if (success) {
        sessionStorage.setItem("index-datapack", datapack);
      }
      state.loading = false
    })
  },
})

export const { reducer, actions } = slice;
export default reducer;
