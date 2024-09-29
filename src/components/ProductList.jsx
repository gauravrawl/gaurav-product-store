import axios from "axios";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { baseUrl } from "../apiConfig/baseUrl";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading, setProductData } from "../store/slice/products";
import Loader from "./loader/loader";
import NoProductFound from "./NoProductFound";

const ProductList = () => {
  const { productData, isLoading } = useSelector((state) => state.product);
  const [page, setPage] = useState(1);
  const [moreProd, setmoreProd] = useState(true)
  let [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  // Get category selected by user from params
  const categoryParams = searchParams.get("category");
  const search = searchParams.get("search");

  // Fetch products
  const fetchProducts = async () => {
    let url = `${baseUrl}?limit=10&skip=${(page - 1) * 10}`;
    if (categoryParams && categoryParams !== "all") {
      url = `${baseUrl}/category/${categoryParams}?limit=10&skip=${(page - 1) * 10}`;
    }
    if (search) {
      url = `${baseUrl}/search?q=${search}&limit=10&skip=${(page - 1) * 10}`;
    }

    dispatch(setIsLoading(true));
    try {
      const response = await axios.get(url);
      const result = response?.data;
      const newProducts = result?.products || [];

      if (page === 1) {
        dispatch(setProductData(newProducts));
      } else {
        if (newProducts.length > 0) {
          dispatch(setProductData([...productData, ...newProducts]));
        }
      }
      if (newProducts.length < 10) {
        setmoreProd(false); 
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    dispatch(setProductData([]));
    setPage(1);
    setmoreProd(true); 
  }, [categoryParams, search, dispatch]);

  useEffect(() => {
    if (moreProd) { 
      fetchProducts();
    }
  }, [categoryParams, page, search, moreProd]);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.scrollHeight - 200 &&
      !isLoading && 
      moreProd // Only trigger fetch if there are more products
    ) {
      setPage((prev) => prev + 1);
    }
  };

  // Scroll 
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, isLoading]);

  return (
    <>
    {!isLoading && !productData.length && <NoProductFound/>}
      {isLoading && <Loader />}
      <div className="container">
        <div className="row">
          {productData?.map((data, idx) => (
            <div className="col-12 col-md-4 col-xl-3 col-xxl-2 pb-4" key={idx}>
              <ProductCard productData={data} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
