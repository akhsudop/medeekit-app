import { useContext } from "react";
import { LibraryContext } from "../context/LibraryContext";
import { useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import { CardActionArea, Icon } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import DoneIcon from "@mui/icons-material/Done";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";

const Drug = ({ medicine }) => {
  const { state, dispatch } = useContext(LibraryContext);
  const path = useLocation().pathname;

  const buttonComponent = state.myDrugs.find(
    (drug) => drug.id === medicine.id
  ) ? (
    //Everywhere beside /library/... location  show "already in your library" msg.
    <>
      {path === "/" && <DoneIcon fontSize="large" color="success" />}
      {path !== "/library/interactions" && (
        <Icon
          onClick={() => dispatch({ type: "deleteDrug", payload: medicine.id })}
        >
          <DeleteOutlineIcon color="error" />
        </Icon>
      )}
    </>
  ) : (
    path !== "/library/interactions" && (
      <div
        onClick={() => {
          dispatch({ type: "addDrug", payload: medicine });
        }}
        style={{ display: "flex", alignItems: "center" }}
      >
        <AddIcon fontSize="large" color="primary" />
        Add to kit
      </div>
    )
  );

  return (
    <Grid item style={{ width: "33%" }}>
      <Card variant="outlined" style={{ marginBottom: 15 }}>
        <CardActionArea>
          <CardContent>
            <h3>{medicine.name}</h3>
            <p>{medicine.activeSubstances}</p>
            {buttonComponent}
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default Drug;
