import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./api";

export const loadNamespace = createAsyncThunk('layout/namespace', () => {
  return api.loadNamespaceList();
})