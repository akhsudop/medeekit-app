import axios from "axios";

const nihApi = axios.create({
  baseURL: "https://rxnav.nlm.nih.gov",
});

export const findRxcuiByString = async (activeSubstances) => {
    // Substances come as a comma-separated string, ie "Paracetamol, Ethanol, Glucose"
    // We split them into a list
  const searchedSubstance = activeSubstances.split(",");

return Promise.all(
  searchedSubstance.map(async (substance) => {
      // Encode the substance name for the URL
    const response = await nihApi.get(
      `/REST/rxcui.json?name=${encodeURIComponent(substance)}&search=2`
    );
    return response.data.idGroup.rxnormId[0];
  })
);
};

export const findDrugInteractions = async ([rxnormId, comparedRxnormId]) => {
  let isDoubleUsed = false;

    const promises = await Promise.all(
      comparedRxnormId.map(async (id) => {
        const response = await nihApi.get(
          `/REST/interaction/interaction.json?rxcui=${encodeURIComponent(id)}&sources=DrugBank`
        );

        const interactions = rxnormId.map((comparedId) => {
          isDoubleUsed = id === comparedId;
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
};
