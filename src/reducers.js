import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
} from "./actions";
import { toast } from "react-toastify";

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: true,
};

function writeFavsToLocalStorage(state) {
  localStorage.setItem("s10g4", JSON.stringify(state.favs));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      
      const newFavs = [...state.favs, action.payload]; 
      writeFavsToLocalStorage({ ...state, favs: newFavs }); 
      return {
        ...state,
        favs: newFavs,
      };

    case FAV_REMOVE:
      
      const filteredFavs = state.favs.filter((fav) => fav.id !== action.payload); // Remove the payload from the favs array
      writeFavsToLocalStorage({ ...state, favs: filteredFavs }); // Update localStorage with the filtered favs array
      return {
        ...state,
        favs: filteredFavs,
      };

    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        current: action.payload
      };

    case FETCH_LOADING:
      return {
        ...state,
        loading: true
      };

    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        current: action.payload
      };

    case GET_FAVS_FROM_LS:
      return {
        ...state,
      
      };

    default:
      return state;
  }
}
