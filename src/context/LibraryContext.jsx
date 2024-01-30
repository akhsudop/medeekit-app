import { createContext, useReducer, useEffect } from "react";

const LOCALSTORAGE_KEY = "myDrugs";

const initState = {
  myDrugs: JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || [],
  comparedDrugs: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "addDrug":
      if (!action.payload) {
        throw new Error("There is no payload for ADD action!");
      }

      return { ...state, myDrugs: [...state.myDrugs, action.payload] };

    case "deleteDrug": //action.payload = medicine.id = "number"
      return {
        ...state,
        myDrugs: [
          ...state.myDrugs.filter((drug) => drug.id !== action.payload),
        ],
      };
    case "pickDrug":
      let drugPicked = false;
      let filteredList;
      if (state.comparedDrugs.length > 0) {
        drugPicked = state.comparedDrugs.find(
          (drug) => drug.id === action.payload.id
        );
        filteredList = state.comparedDrugs.filter(
          (drug) => drug.id !== action.payload.id
        );
      }
      if (drugPicked) {
        return {
          ...state,
          comparedDrugs: [...filteredList],
        };
      } else {
        return {
          ...state,
          comparedDrugs: [...state.comparedDrugs, action.payload],
        };
      }
    default:
      throw new Error();
  }
};

const useLibraryContext = (initState) => {
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(state.myDrugs));
  }, [state.myDrugs]);

  const uniquePairs = (arr) =>
    arr.flatMap((item1, index1) =>
      arr.flatMap((item2, index2) => (index1 > index2 ? [[item1, item2]] : []))
    );

  const uniqueDrugPairs = uniquePairs(state.comparedDrugs);

  const totalAmount = state.myDrugs.length;

  const comparedDrugsAmount = state.comparedDrugs.length;

  return { state, dispatch, totalAmount, comparedDrugsAmount, uniqueDrugPairs };
};

export const LibraryContext = createContext({
  state: initState,
  totalAmount: 0,
  uniqueDrugPairs: [],
  dispatch: () => {},
});

export const LibraryProvider = ({ children }) => {
  return (
    <LibraryContext.Provider value={useLibraryContext(initState)}>
      {children}
    </LibraryContext.Provider>
  );
};
