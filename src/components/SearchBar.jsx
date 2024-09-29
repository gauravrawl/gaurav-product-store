import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchValue) {
      //Add search queryy
      navigate(`/?search=${encodeURIComponent(searchValue)}`);
    }
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(()=>{
    const categoryType = searchParams.get("category");
    if(categoryType === "category" && !searchValue){
      setSearchValue('')
    }
  },[searchParams, searchValue])

  return (
    <div className="d-flex w-full">
      <input
        type="text"
        placeholder="Search products"
        value={searchValue}
        onChange={handleChange}
        className="rounded"
      />
      <button className="btn btn-primary w-full" onClick={handleSearch} disabled={!searchValue}>Search</button>
    </div>
  );
};

export default SearchBar;
