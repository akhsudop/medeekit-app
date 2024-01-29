import { useQuery } from "react-query"; /**useQueryClient**/
import { getDrugs } from "../api/drugsApi";
import { useState } from "react";
import Drug from "../components/Drug";
import useDebounce from "../hooks/useDebounce";

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
  // const { state } = useContext(LibraryContext); //DELETE AFTER ALL
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
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>{error}</p>;
  } else {
    if (drugs) {
      content = drugs.map((drug) => {
        return <Drug medicine={drug} key={drug.id} />;
      });
    }
  }
  // const library = JSON.stringify(state);
  return (
    <section>
      {/* {library} */}
      {searchSection}
      <div style={{ marginLeft: 50, marginBlock: 50 }}>{content}</div>
    </section>
  );
};

export default Home;
