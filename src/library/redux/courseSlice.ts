import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CourseState {
  selectedCourse: {
    _id: string;
    name: string;
    description: string;
    image: string;
    slug: string;
  } | null;
}

const initialState: CourseState = {
  selectedCourse: null,
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setSelectedCourse: (
      state,
      action: PayloadAction<CourseState["selectedCourse"]>
    ) => {
      state.selectedCourse = action.payload;
    },
    clearSelectedCourse: (state) => {
      state.selectedCourse = null;
    },
  },
});

export const { setSelectedCourse, clearSelectedCourse } = courseSlice.actions;
export default courseSlice.reducer;
