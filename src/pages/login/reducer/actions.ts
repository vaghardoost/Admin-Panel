import { createAsyncThunk } from "@reduxjs/toolkit";
import { login as apiLogin } from "./api";

export const loginAction = createAsyncThunk('login/login',
  async (payload: { username: string, password: string }) => {
    const result = await apiLogin(payload.username, payload.password);
    return result;
  }
)
