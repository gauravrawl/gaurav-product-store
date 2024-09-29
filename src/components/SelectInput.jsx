import { useNavigate, useSearchParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
const SelectInput = () => {
  const { categoryList, loading } = useSelector((state) => state.product);
  const navigate = useNavigate();
  console.log('categoryList', categoryList)

  let [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "all"

//Categories selection for dropdown menu
  const handleSelect = (e) => {
    const selectedOpt = e.target.value;
    if (selectedOpt) {
      navigate(`/?category=${selectedOpt}`);
    }
  };

  return (
    <>
      <Form.Select
        aria-label="Default select example"
        onChange={handleSelect}
        className="selectMenu"
        value={selectedCategory} 
      >
        <option value={'all'}>{loading ? 'Fetching category' : 'Select product category'} </option>
        {categoryList?.map((data, idx) => (
          <option key={idx} value={data?.slug}>
            {data?.name}
          </option>
        ))}
      </Form.Select>
    </>
  );
};

export default SelectInput;
