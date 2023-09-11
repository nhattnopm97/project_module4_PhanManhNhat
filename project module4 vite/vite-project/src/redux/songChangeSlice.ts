import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SongHandledState {
  song: any;
  listent: boolean;
  playlist: any[];
  loading: boolean;
  error: boolean;
}

const initialState: SongHandledState = {
  song: {},
  listent: false,
  playlist: [],
  loading: false,
  error: false,
};

export const changeSong = createAsyncThunk("changeSong", async (song: any) => {
  console.log(song);
  localStorage.setItem("songLocal", JSON.stringify(song));
  return song;
});

export const changeSongLogout = createAsyncThunk(
  "changeSongLogout",
  async () => {
    return {};
  }
);

export const changePlaylist = createAsyncThunk(
  "changePlaylist",
  async (playlist: any) => {
    localStorage.setItem("playlistLocal", JSON.stringify(playlist));
    return playlist;
  }
);

const songhandled = createSlice({
  name: "changeSong",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeSong.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeSong.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.song = action.payload;
        state.listent = true;
      })
      .addCase(changeSong.rejected, (state) => {
        console.log("loi");
        state.loading = false;
        console.log(state);
      })
      .addCase(
        changePlaylist.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.playlist = action.payload;
        }
      )
      .addCase(
        changeSongLogout.fulfilled,
        (state, action: PayloadAction<any>) => {
          console.log("loi");
          state.song = action.payload;
          console.log(state);
        }
      );
  },
});

export default songhandled.reducer;
