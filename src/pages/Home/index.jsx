import { useEffect } from "react";
import ProductList from "../../components/ProductList"
import SelectInput from "../../components/SelectInput"
import { useDispatch } from "react-redux";
import { fetchCategories } from "../../apiConfig/services";
import SearchBar from "../../components/SearchBar";

const Home = () => {
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(fetchCategories());
    }, [dispatch]);

  return (
    <>
    <h1 className="home-title text-center">Gaurav Product Store</h1>
       <div className="d-flex flex-column flex-md-row gap-4 p-4">
         <SelectInput/>
          <SearchBar/>
       </div>
       <ProductList/>
    </>
  )
}

export default Home
