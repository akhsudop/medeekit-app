import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { LibraryContext } from "../context/LibraryContext";
import Drug from "../components/Drug";

const MyLib = () => {
  const { state, totalAmount } = useContext(LibraryContext);
  return (
    <section style={{ marginLeft: 30, marginBottom: 50 }}>
      <h2>Welcome to your First Aid Kit Medications!</h2>
      {totalAmount ? (
        <h4>{totalAmount} medications in your kit.</h4>
      ) : (
        <h4>
          You have no medications in your kit yet. Find and add some{" "}
          <NavLink to="/">here.</NavLink>
        </h4>
      )}

      {state.myDrugs.length > 0 &&
        state.myDrugs.map((drug) => {
          return <Drug medicine={drug} key={drug.id} />;
        })}
      <div>
        <NavLink to="interactions" replace>
          Check possible interactions
        </NavLink>
      </div>
    </section>
  );
};

export default MyLib;
