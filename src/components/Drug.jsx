import { useContext } from "react";
import { LibraryContext } from "../context/LibraryContext";
import Card from "@mui/material/Card";
import { CardActionArea, Icon } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import DoneIcon from "@mui/icons-material/Done";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";

const DrugContent = ({
  isJustAdded,
  isRemovable,
  displayAddOption,
  medicine,
}) => {
  const { dispatch } = useContext(LibraryContext);

  return (
    <>
      {isJustAdded && <DoneIcon fontSize="large" color="success" />}
      {isRemovable && (
        <Icon
          onClick={() => dispatch({ type: "deleteDrug", payload: medicine.id })}
        >
          <DeleteOutlineIcon color="error" />
        </Icon>
      )}
      {displayAddOption && (
        <div
          onClick={() => {
            dispatch({ type: "addDrug", payload: medicine });
          }}
          style={{ display: "flex", alignItems: "center" }}
        >
          <AddIcon fontSize="large" color="primary" />
          Add to kit
        </div>
      )}
    </>
  );
};
const Drug = ({
  medicine,
  isSelected,
  isJustAdded,
  isRemovable,
  displayAddOption,
}) => {
  return (
    <Grid item style={{ width: "33%" }}>
      <Card
        variant="outlined"
        style={{ marginBottom: 15, background: isSelected ? "#dedada" : "" }}
      >
        <CardActionArea>
          <CardContent>
            <h3>{medicine.name}</h3>
            <p>{medicine.activeSubstances}</p>
            <DrugContent
              isJustAdded={isJustAdded}
              isRemovable={isRemovable}
              displayAddOption={displayAddOption}
              medicine={medicine}
            />
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default Drug;
