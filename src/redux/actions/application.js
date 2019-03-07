export const SELECT_PAGE = 'SELECT_PAGE';
export const selectPage = (page) => ({ type: SELECT_PAGE, page });

export const SELECT_PAGE_NO_HISTORY = 'SELECT_PAGE_NO_HISTORY';
export const selectPageNoHistory = (page) => ({
  type: SELECT_PAGE_NO_HISTORY,
  page,
});
