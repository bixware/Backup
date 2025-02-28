/**
 * Top Selling Widget
 */
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
// api
import api from 'Api';
// intl messages
import IntlMessages from 'Util/IntlMessages';

function TopSellingWidget() {
   const [products, setProducts] = useState(null);

   useEffect(() => {
      api.get('topSellingProducts.js')
         .then((response) => {
            setProducts(response.data);
         })
         .catch(error => {
            // error handling
         })
   },[])
  
   const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false,
      rtl: false
   };

   return (
      <div>
         <Slider {...settings}>
            {products && products.map((product, key) => (
               <div key={key}>
               <div className="top-selling">
                  <div className="product-img mb-20">
                     <img src={product.thumbnail} width="600" alt="headphone device" className="img-fluid d-block" />
                  </div>
                  <div className="product-content text-center">
                     <h3>{product.productName}</h3>
                     <h3 className="text-pink">{product.sellingPrice}</h3>
                  </div>
               </div>
               <div className="rct-block-footer clearfix">
                  <div className="float-left">
                     <h6><IntlMessages id="widgets.totalSales" /></h6>
                     <h3>{product.totalSales}</h3>
                  </div>
                  <div className="float-right">
                     <h6>Earning</h6>
                     <h3>{product.earning}</h3>
                  </div>
               </div>
               </div>
            ))}
         </Slider>
      </div>
   );
}

export default TopSellingWidget;