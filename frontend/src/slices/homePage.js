import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'homePage',
  initialState: {
    pageIndex: 0,
    searchValue: '',
    startDate: null,
    endDate: null,
  },
  reducers: {
    pageIndexChanged: (state, { payload }) => {
      const { pageIndex } = payload
      state.pageIndex = pageIndex
    },
    searchValueChanged: (state, { payload }) => {
      const { searchValue } = payload
      state.searchValue = searchValue
    },
    startDateChanged: (state, { payload }) => {
      const { startDate } = payload
      state.startDate = startDate
    },
    endDateChanged: (state, { payload }) => {
      const { endDate } = payload
      state.endDate = endDate
    },
  },
})

export const { actions } = slice
export default slice.reducer
