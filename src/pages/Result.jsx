import React from "react";

const Result = ({ interactions }) => {
  const content = interactions.map((interaction) => {
    return (
      <>
        <h2>Interaction detected:</h2>
        {interaction.drugPair[0].name + " and " + interaction.drugPair[1].name}
        {interaction.interaction.map((singleInteraction) => {
          return <p>{singleInteraction}</p>;
        })}
      </>
    );
  });

  return { content };
};

export default Result;
