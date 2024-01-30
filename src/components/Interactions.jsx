import { useContext, useEffect, useState } from "react";
import { LibraryContext } from "../context/LibraryContext";
import Drug from "./Drug";
import { NavLink } from "react-router-dom";
import { findDrugInteractions, findRxcuiByString } from "../api/nihApi";

// NEXT TO DO: filter drug list by route of administration. (oral, topical etc)

const Interactions = () => {
  const { state, dispatch, uniqueDrugPairs, comparedDrugsAmount } =
    useContext(LibraryContext);
  const [interaction, setInteraction] = useState([]); // [{[drug1, drug2]: [...interactions]}]

  const handleSubmitCheck = (arr) => {
    arr.map(async (comparedArrPair) => {
      const interactions = await findDrugInteractions([
        comparedArrPair[0].rxnormId,
        comparedArrPair[1].rxnormId,
      ]);

      if (interactions === undefined && typeof interactions !== "object") {
        return null;
      } else if (
        interactions !== undefined &&
        typeof interactions !== "object"
      ) {
        setInteraction([
          ...interaction,
          {
            drugPair: [comparedArrPair[0], comparedArrPair[1]],
            interaction: interactions,
          },
        ]);
        console.log(
          "interakcja pomiedzy " +
            comparedArrPair[0].name +
            " i " +
            comparedArrPair[1].name +
            ". " +
            interactions
        );
      } else if (interactions.length > 0 && typeof interactions === "object") {
        const filteredInteractions = interactions.filter(
          (interaction) => interaction !== undefined
        );
        console.log(filteredInteractions);
        filteredInteractions.length === 0
          ? null
          : setInteraction([
              ...interaction,
              {
                drugPair: [comparedArrPair[0], comparedArrPair[1]],
                interaction: filteredInteractions,
              },
            ]);
      } else {
        return null;
      }
    });
  };

  useEffect(() => {
    console.log(interaction);
  }, [interaction]);

  const handleDrugPicking = (medicine) => {
    findRxcuiByString(medicine.activeSubstances).then((res) => {
      dispatch({
        type: "pickDrug",
        payload: { rxnormId: res, ...medicine },
      });
    });
  };
  const isPlural =
    state.comparedDrugs.length > 1 || state.comparedDrugs.length === 0;
  const isActiveSubmitBtn = state.comparedDrugs.length >= 2;
  let content;

  content =
    state.myDrugs.length > 0 ? (
      state.myDrugs.map((drug) => {
        return (
          <div onClick={() => handleDrugPicking(drug)}>
            <Drug medicine={drug} key={drug.id} />
          </div>
        );
      })
    ) : (
      <h2>
        To check any interactions add medicines you use.{" "}
        <NavLink to="/">Click here.</NavLink>{" "}
      </h2>
    );
  return (
    <>
      <h1>
        Selected {comparedDrugsAmount}{" "}
        {isPlural ? <span>drugs</span> : <span>drug</span>}
      </h1>
      {content}
      <button
        type="submit"
        disabled={!isActiveSubmitBtn}
        onClick={() => handleSubmitCheck(uniqueDrugPairs)}
      >
        CHECK!
      </button>
    </>
  );
};

export default Interactions;
