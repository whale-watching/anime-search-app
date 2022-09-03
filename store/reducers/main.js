import * as t from "../types";

const main = (
  state = {
    currentPageData: [],
    searchedData: [],
  },
  action
) => {
  switch (action.type) {
    case t.CURREMT_ANIME_DATA:
      return {
        ...state,
        currentPageData: action.payload,
      };
    case t.SEARCH_ANIME_DATA:
      return {
        ...state,
        searchedData: action.payload,
      };
    default:
      return { ...state };
  }
};

export default main;
