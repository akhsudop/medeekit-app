import { useQuery } from "react-query";
import { getDrugs } from "../api/drugsApi";
import { useState } from "react";
import Drug from "../components/Drug";
import useDebounce from "../hooks/useDebounce";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { InputBase, styled } from "@mui/material";

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

  const searchSection = (
    <InputBg component="form" elevation={6}>
      <InputBase
        placeholder="Search medicine..."
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        fullWidth
        autoFocus
      />
    </InputBg>
  );
  let content;
  if (isLoading) {
    content = <Grid>Loading...</Grid>;
  } else if (isError) {
    content = <Grid>{error}</Grid>;
  } else {
    if (drugs && drugs.length > 0) {
      content = drugs.map((drug) => {
        return <Drug medicine={drug} key={drug.id} />;
      });
    } else {
      content = <Grid>No match found</Grid>;
    }
  }

  return (
    <section>
      {searchSection}
      <Grid
        container
        spacing={8}
        style={{ padding: 50, marginTop: 10, justifyContent: "center" }}
      >
        {searchVal ? content : ""}
      </Grid>
    </section>
  );
};

export default Home;
