import axios from "axios";

const nihApi = axios.create({
  baseURL: "https://rxnav.nlm.nih.gov",
});

export const findRxcuiByString = async (activeSubstances) => {
  // Change two-part names of active substances into 'part1+part2'
  const searchedSubstance = activeSubstances.includes(",")
    ? activeSubstances.split(",")
    : activeSubstances.split(" ")[0];
  console.log(searchedSubstance);
  if (typeof searchedSubstance === "object") {
    const promises = Promise.all(
      searchedSubstance.map(async (substance) => {
        substance.split(" ").join("+"); //[0]
        const response = await nihApi.get(
          `/REST/rxcui.json?name=${substance}&search=2`
        );
        return response.data.idGroup.rxnormId[0];
      })
    );
    return promises;
  } else {
    const response = await nihApi.get(
      `/REST/rxcui.json?name=${searchedSubstance}&search=2`
    );
    return response.data.idGroup.rxnormId[0];
  }
};

export const findDrugInteractions = async ([rxnormId, comparedRxnormId]) => {
  let isDoubleUsed = false;
  if (typeof rxnormId === "object" && typeof comparedRxnormId !== "object") {
    const promises = await Promise.all(
      rxnormId.map(async (id) => {
        const response = await nihApi.get(
          `/REST/interaction/interaction.json?rxcui=${id}&sources=DrugBank`
        );

        console.log(response.data);
        isDoubleUsed = id === comparedRxnormId;
        if (isDoubleUsed) {
          return `Attention! At least one substance is duplicated in selected medicines, which may result in an overdose.`;
        }
        const interaction =
          response.data.interactionTypeGroup[0].interactionType[0].interactionPair.find(
            (pair) =>
              pair.interactionConcept[1].minConceptItem.rxcui ===
              comparedRxnormId
          );

        if (interaction !== undefined) {
          return interaction.description;
        }
      })
    );
    return promises.flat();
  } else if (
    typeof comparedRxnormId === "object" &&
    typeof rxnormId !== "object"
  ) {
    const promises = await Promise.all(
      comparedRxnormId.map(async (id) => {
        const response = await nihApi.get(
          `/REST/interaction/interaction.json?rxcui=${id}&sources=DrugBank`
        );

        isDoubleUsed = id === rxnormId;
        if (isDoubleUsed) {
          return `Attention! At least one substance is duplicated in selected medicines, which may result in an overdose.`;
        }
        const interaction =
          response.data.interactionTypeGroup[0].interactionType[0].interactionPair.find(
            (pair) =>
              pair.interactionConcept[1].minConceptItem.rxcui === rxnormId
          );
        if (interaction !== undefined) {
          return interaction.description;
        }
      })
    );

    return promises.flat();
  } else if (
    typeof rxnormId === "object" &&
    typeof comparedRxnormId === "object"
  ) {
    const promises = await Promise.all(
      comparedRxnormId.map(async (id) => {
        const response = await nihApi.get(
          `/REST/interaction/interaction.json?rxcui=${id}&sources=DrugBank`
        );

        const interactions = rxnormId.map((comparedId) => {
          isDoubleUsed = id === comparedId;
          console.log(comparedId, id);
          const interaction =
            response.data.interactionTypeGroup[0].interactionType[0].interactionPair.find(
              (pair) =>
                pair.interactionConcept[0].minConceptItem.rxcui === comparedId
            );
          if (interaction !== undefined && isDoubleUsed) {
            return [
              interaction.description,
              "Attention! At least one substance is duplicated in selected medicines, which may result in an overdose.",
            ];
          } else if (interaction !== undefined && !isDoubleUsed) {
            return interaction.description;
          } else if (interaction === undefined && isDoubleUsed) {
            return "Attention! At least one substance is duplicated in selected medicines, which may result in an overdose.";
          } else {
            console.log("no interactions, no doubles");
            return undefined;
          }
        });
        const filteredInteractions = interactions.filter(
          (interaction) => interaction !== undefined
        );

        return filteredInteractions;
      })
    );

    return promises.flat();
  } else {
    const response = await nihApi.get(
      `/REST/interaction/interaction.json?rxcui=${rxnormId}&sources=DrugBank`
    );
    const interaction =
      response.data.interactionTypeGroup[0].interactionType[0].interactionPair.find(
        (pair) =>
          pair.interactionConcept[1].minConceptItem.rxcui === comparedRxnormId
      );

    if (interaction) {
      return interaction.description;
    }
  }
};
