import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BlogState {
  selectedBlog: {
    _id: string;
    title: string;
    content: string;
    author?: string;
    authorId?: string;
  } | null;
}

const initialState: BlogState = {
  selectedBlog: null,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setSelectedBlog: (state, action: PayloadAction<BlogState["selectedBlog"]>) => {
      state.selectedBlog = action.payload;
    },
    clearSelectedBlog: (state) => {
      state.selectedBlog = null;
    },
  },
});

export const { setSelectedBlog, clearSelectedBlog } = blogSlice.actions;
export default blogSlice.reducer;
