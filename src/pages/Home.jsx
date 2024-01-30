import { useQuery } from "react-query";
import { getDrugs } from "../api/drugsApi";
import {useContext, useState} from "react";
import Drug from "../components/Drug";
import useDebounce from "../hooks/useDebounce";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { InputBase, styled } from "@mui/material";
import {LibraryContext} from "../context/LibraryContext";

const InputBg = styled(Paper)(({ theme }) => ({
  borderRadius: 50,
  paddingBlock: 20,
  paddingInline: 30,
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "10vh",
  [theme.breakpoints.up("sm")]: {
    width: "50%",
  },
  [theme.breakpoints.only("xs")]: {
    width: "70%",
  },
}));

const HomeContent = ({isLoading, isError, errorMsg, searchVal, drugs}) => {
  const { state } = useContext(LibraryContext);

  if (isLoading) {
    return <Grid>Loading...</Grid>;
  }

  if (isError) {
    return <Grid>{errorMsg}</Grid>;
  }

  if (drugs && drugs.length > 0) {
      return <>{drugs.map((drug) => {
        const isAdded = state.myDrugs.find((medicine) => drug.id === medicine.id);
        return <Drug medicine={drug} key={drug.id} displayAddOption={!isAdded} isRemovable={isAdded} isSelected={isAdded} />;
      })}</>;
  }

  if (searchVal) {
    return <Grid>No match found</Grid>;
  }
}

const SearchBar = ({ onChange, searchVal }) => {
  return <InputBg component="form" elevation={6}>
    <InputBase
        placeholder="Search medicine..."
        value={searchVal}
        onChange={onChange}
        fullWidth
    />
  </InputBg>
}
const Home = () => {
  const [searchVal, setSearchVal] = useState("");
  const debouncedVal = useDebounce(searchVal, 1000);
  const {
    isLoading,
    isError,
    error,
    data: drugs,
  } = useQuery(["drugs", debouncedVal], () => getDrugs(debouncedVal), {
    enabled: Boolean(debouncedVal),
  });

  return (
    <>
      <SearchBar onChange={(e) => setSearchVal(e.target.value)} searchVal={searchVal} />
      <Grid
        container
        spacing={8}
        style={{ padding: 50, marginTop: 10, justifyContent: "center" }}
      >
        <HomeContent isLoading={isLoading} isError={isError} errorMsg={error} drugs={drugs} searchVal={searchVal} />
      </Grid>
    </>
  );
};

export default Home;
