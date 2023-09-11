import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: string;
  name: string;
  avatar: string;
  token: string;
  email: string;
  message: string;
}

interface AuthState {
  user: User | {};
  loading: boolean;
  error: boolean;
}

type Data = {
  email: string;
  password: string;
};

export const loginRedux = createAsyncThunk(
  "auth/login",
  async (data: Data, { rejectWithValue }) => {
    try {
      let result = await axios.post(
        "http://localhost:3579/api/v1/user/login",
        data
      );
      if (result.data.status === 200) {
        let userLocal: User = {
          id: result.data.data.id,
          name: result.data.data.name,
          avatar: result.data.data.avatar,
          token: result.data.token,
          email: result.data.data.email,
          message: "Đang đăng nhập",
        };
        localStorage.setItem("userLocal", JSON.stringify(userLocal));
      }
      window.scrollTo(0, 0);
      return result.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const logOutRedux = createAsyncThunk("auth/logout", async () => {
  return {};
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    loading: false,
    error: false,
  } as AuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginRedux.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginRedux.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        console.log("aaaaaaaaaaaaaa");
      })
      .addCase(loginRedux.rejected, (state) => {
        state.loading = false;
      })
      .addCase(logOutRedux.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export default authSlice.reducer;
