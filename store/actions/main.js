import * as t from "../types";
import axios from "axios";
const API_URL = "https://api.jikan.moe/v4/anime";

export const fetchAnimeData = (pageNumber) => async (dispatch) => {
  const currentAnimeData = await axios.get(`${API_URL}?page=${pageNumber}`);
  dispatch({
    type: t.CURREMT_ANIME_DATA,
    payload: currentAnimeData.data,
  });
};
