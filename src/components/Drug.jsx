import { useContext } from "react";
import { LibraryContext } from "../context/LibraryContext";
import { useLocation } from "react-router-dom";

const Drug = ({ medicine }) => {
  const { state, dispatch } = useContext(LibraryContext);
  const path = useLocation().pathname;

  const buttonComponent = state.myDrugs.find(
    (drug) => drug.id === medicine.id
  ) ? (
    //Everywhere beside /library/... location  show "already in your library" msg.
    <>
      {path === "/" && <p> Already in your Library </p>}
      {path !== "/library/interactions" && (
        <button
          onClick={() => dispatch({ type: "deleteDrug", payload: medicine.id })}
        >
          delete from library
        </button>
      )}{" "}
    </>
  ) : (
    path !== "/library/interactions" && (
      <button
        onClick={() => {
          dispatch({ type: "addDrug", payload: medicine });
        }}
      >
        ADD TO LIBRARY
      </button>
    )
  );

  return (
    <section>
      <h3>{medicine.name}</h3>
      {buttonComponent}

      <p>{medicine.activeSubstances}</p>
    </section>
  );
};

export default Drug;
