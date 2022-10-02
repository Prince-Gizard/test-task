import { useSelector, useDispatch } from 'react-redux'

import { actions } from '../slices'

export default function useArticles() {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.homePage)

  return {
    ...data,
    setPageIndex: (pageIndex) =>
      dispatch(actions.pageIndexChanged({ pageIndex })),
    setSearchValue: (searchValue) =>
      dispatch(actions.searchValueChanged({ searchValue })),
    setStartDate: (startDate) =>
      dispatch(actions.startDateChanged({ startDate })),
    setEndDate: (endDate) => dispatch(actions.endDateChanged({ endDate })),
  }
}
