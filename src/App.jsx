import "./App.css";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import MyLib from "./pages/MyLib";
import Interactions from "./components/Interactions";
import Result from "./pages/Result";
import { Route, Routes } from "react-router";
import { LibraryProvider } from "./context/LibraryContext";

function App() {
  return (
    <LibraryProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="library" element={<MyLib />} />
          <Route path="library/interactions" element={<Interactions />} />
          <Route path="library/interactions/result" element={<Result />} />
        </Route>
      </Routes>
    </LibraryProvider>
  );
}

export default App;
