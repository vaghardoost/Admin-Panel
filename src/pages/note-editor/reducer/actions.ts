import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Note, SectionType } from "../../../model/note";
import * as api from "./api";
import { initialState, State } from "./state";

export const loadCategoryList = createAsyncThunk('note-update/catlist', async () => {
  return await api.loadCategory();
});

export const loadNote = createAsyncThunk('note-update/load', async (id: string) => {
  return await api.loadNote(id);
});

export const addNote = createAsyncThunk('note-update/add', async (note: Note) => {
  return await api.saveNote(note);
});

export const update = createAsyncThunk('note-update/update', async (note: Note) => {
  return api.updateNote(note);
})

export const loadPhoto = createAsyncThunk('note-update/load/photo', async () => {
  return await api.loadPhotoList();
});

// -----------------------------------------------------------------------


export const drawerCategory = (state: State, action: PayloadAction<boolean>) => {
  state.category.open = action.payload;
}

export const drawerPhoto = (state: State, action: PayloadAction<boolean>) => {
  state.photo.open = action.payload;
}

export const changeTitle = (state: State, action: PayloadAction<string>) => {
  state.note.title = action.payload;
}

export const pushTag = (state: State, action: PayloadAction<string>) => {
  const { tag } = state.note;
  if (!tag.includes(action.payload)) tag.push(action.payload);
}

export const pullTag = (state: State, action: PayloadAction<string>) => {
  const { tag } = state.note;
  const index = tag.indexOf(action.payload);
  if (index > -1) tag.splice(index, 1)
}

export const setCategorySelected = (state: State, action: PayloadAction<string>) => {
  state.note.category = action.payload;
}

export const modalSave = (state: State, action: PayloadAction<boolean>) => {
  state.draft.save = {
    modal: action.payload,
    status: 'normal'
  }
}

export const modalSaveStatus = (state: State, action: PayloadAction<'validation' | 'duplicate'>) => {
  state.draft.save.status = action.payload;
}

export const modalLoad = (state: State, action: PayloadAction<boolean>) => {
  state.draft.load = {
    modal: action.payload,
    status: undefined
  }
}

export const modalLoadSelect = (state: State, action: PayloadAction<string>) => {
  state.draft.load.status = action.payload;
}

export const setNote = (state: State, action: PayloadAction<Note>) => {
  state.note = action.payload;
}

export const setEditable = (state: State, action: PayloadAction<string>) => {
  state.edit = action.payload
}

export const reset = (state: State) => {
  state.note = {
    ...initialState.note,
  }
  state.editSection = {
    visible: false,
    section: undefined,
    index: undefined
  }
  delete state.edit;
}

export const resetCategory = (state: State) => {
  delete state.note.category;
}

export const addSection = (state: State, action: PayloadAction<SectionType>) => {
  state.note.content!.push(action.payload);
  state.editSection = {
    visible: true,
    index: state.note.content!.length - 1,
    section: action.payload
  }
}

export const updateSection = (state: State, action: PayloadAction<{ index: number, section: SectionType }>) => {
  const { index, section } = action.payload;
  state.note.content![index] = section;
}

export const moveSection = (state: State, action: PayloadAction<{ index: number, dest: 'up' | 'down' }>) => {
  const { dest, index } = action.payload;
  const { content } = state.note;
  const { index: quickIndex } = state.editSection;
  const i = (dest === 'up') ? -1 : 1;

  if (quickIndex) {
    state.editSection.index! += i;
  }

  const sabad = content![index + i];
  content![index + i] = content![index];
  content![index] = sabad;
}

export const removeSection = (state: State, action: PayloadAction<{ index: number }>) => {
  const { index } = action.payload;
  const { content } = state.note;
  content!.splice(index, 1);
  state.editSection = {
    visible: false,
    section: undefined,
    index: undefined
  }
}

export const quick = (state: State, action: PayloadAction<{ section: SectionType, index: number }>) => {
  state.editSection = {
    ...action.payload,
    visible: true,
  }
}

export const resetQuick = (state: State) => {
  state.editSection = {
    visible: false,
    section: undefined,
    index: undefined
  }
}

export const setNotePhoto = (state: State, action: PayloadAction<string>) => {
  state.note.photo = action.payload;
}

export const resetNotePhoto = (state: State) => {
  delete state.note.photo;
}
