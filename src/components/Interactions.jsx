import { useContext, useState } from "react";
import { LibraryContext } from "../context/LibraryContext";
import Drug from "./Drug";
import { NavLink } from "react-router-dom";
import { findDrugInteractions, findRxcuiByString } from "../api/nihApi";
import Button from "@mui/material/Button";

const EmptyDrugsList = () => {
  <>
    <h2>
      To check any interactions add medicines you use.{" "}
      <NavLink to="/">Click here.</NavLink>{" "}
    </h2>
  </>;
};
const DrugsList = ({ drugs, selectedDrugs, onClick }) => {
  if (drugs.length === 0) {
    return <EmptyDrugsList />;
  }

  return (
    <>
      {drugs.map((drug) => {
        const isSelected =
          selectedDrugs.filter((selectedDrug) => selectedDrug.id === drug.id)
            .length > 0;
        return (
          <div onClick={() => onClick(drug)}>
            <Drug isSelected={isSelected} medicine={drug} key={drug.id} />
          </div>
        );
      })}
    </>
  );
};

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

      // No interactions found
      if (interactions === undefined) {
        return null;
      }

      if (interactions.length > 0) {
        const filteredInteractions = interactions.filter(
          (interaction) => interaction !== undefined
        );

        if (filteredInteractions.length > 0) {
          setInteraction([
            ...interaction,
            {
              drugPair: [comparedArrPair[0], comparedArrPair[1]],
              interaction: filteredInteractions,
            },
          ]);
        }
      }
    });
  };

  const handleDrugPicking = (medicine) => {
    findRxcuiByString(medicine.activeSubstances).then((res) => {
      dispatch({
        type: "pickDrug",
        payload: { rxnormId: res, ...medicine },
      });
    });
  };

  return (
    <div style={{ padding: 32 }}>
      <h1>
        Selected {comparedDrugsAmount}{" "}
        <span>{state.comparedDrugs.length > 1 ? "drugs" : "drug"}</span>
      </h1>

      <DrugsList
        drugs={state.myDrugs}
        selectedDrugs={state.comparedDrugs}
        onClick={handleDrugPicking}
      />

      <Button
        variant="contained"
        disabled={state.comparedDrugs.length < 2}
        onClick={() => handleSubmitCheck(uniqueDrugPairs)}
      >
        CHECK
      </Button>
    </div>
  );
};

export default Interactions;
