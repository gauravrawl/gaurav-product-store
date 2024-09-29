/* eslint-disable react/prop-types */
const ProductCard = ({productData}) => {
const url = 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081'
    //Shorten the product title if too long
    function shortName(name){
        if(name?.length > 15){
            let shortString = name?.slice(0,14) + "..." 
            return shortString
        }
        return name;
    }

    //Showing stars acc. to rating count
    function rating(ratingCount){
      let count = Math.round(ratingCount);
      let stars = ''
      for(let i = 1; i<=count; i++){
        stars+="⭐"
      }
      return stars 
    }

  return (
    <div className="card" style={{ width: "100%", height: "auto", position: "relative" }}>
      <img
      src={!productData?.thumbnail ? url : productData?.thumbnail}
        className="card-img-top"
        style={{ width: "100%", height: '15rem' }}
        alt="Product"
      />
    
      <div className="card-body" >
        <h5 className="card-title" style={{fontSize: '1.2rem'}}>{shortName(productData?.title)}</h5>
        <p className="card-text">${productData?.price} </p>
      </div>
      <span className="text-success font-bold" style={{position: 'absolute', top:'2%', left: '2%'}}>-{productData?.discountPercentage}%</span>
      <span  style={{position: 'absolute', top:'2%', right: '2%'}}>{rating(productData?.rating)}</span>
    </div>
  )
}

export default ProductCard
