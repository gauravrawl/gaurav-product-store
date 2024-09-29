import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";

function App() {
  const { productData } = useSelector((state) => state.product);
  console.log('test', productData)
  return (
    <>
      <Router>
            <Routes>
              <Route exact path="/" element={<Home/>} />
            </Routes>
      </Router>
    </>
  );
}

export default App;

/**Limitations for the app
* 1. Caching is not implemented since alreay fetched data is load again when need.
* 2. The pagination was hard-coded limit of 10 items per page and might not best suited for all cases.
* 3. Some more optimization could be done to decrease server load and enhance UX.
*/

