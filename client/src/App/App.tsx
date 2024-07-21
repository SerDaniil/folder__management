import { useEffect } from "react";
import { Route, Routes } from "react-router";
// import Header from "./Header";
import { useAppDispatch } from "../store/store";
import Home from "../feature/home/Home";
// import Services from "../feature/services/Services";
// import Info from "../feature/info/Info";
// import Portfolio from "../feature/portfolio/Portfolio";

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {}, [dispatch]);

  return (
    <Routes>
      {/* <Route element={<Header />}> */}
      <Route path="/" element={<Home />} />
      {/* <Route path="/services" element={<Services />} />
        <Route path="/info" element={<Info />} />
        <Route path="/portfolio" element={<Portfolio />} /> */}
      {/* </Route> */}
    </Routes>
  );
}

export default App;
