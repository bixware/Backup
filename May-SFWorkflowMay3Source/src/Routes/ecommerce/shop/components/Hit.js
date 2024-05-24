/**
 * Hits Component
 */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
// Card Component
import { RctCard } from 'Components/RctCard';
//Actions
import { onAddItemToCart } from "Store/Actions/EcommerceActions";
//Helper
import { textTruncate } from "Helpers/helpers"

function Hit(props) {
   const [loading, setLoading] = useState(false);
   const dispatch = useDispatch();
   const ecommerce = useSelector(state => state.ecommerce);
   const { cart } = ecommerce;
	//Add Item to cart
	const onPressAddToCart = (cartItem, e) => {
		setLoading(true);
		setTimeout(() => {
         dispatch(onAddItemToCart(cartItem));
		}, 1000)
		e.preventDefault();
	}

	/**
	 * Function to check either the item exist in cart or not
	 * Return boolean
	 * @param {boolean} id 
	 */
	const isItemExistInCart = (id) => {
		let existence = false
		for (const item of cart) {
			if (item.objectID === id) {
				existence = true
			}
		}
		return existence;
   }
   
   const { hit } = props;
   
   return (
      <RctCard customClasses="d-flex  mb-0 flex-column justify-content-between overflow-hidden">
         <div className="overlay-wrap overflow-hidden">
            <div className="text-center p-4">
               <img src={hit.image} className="img-fluid" alt="product" />
            </div>
            <div className="overlay-content d-flex align-items-end">
               {!isItemExistInCart(hit.objectID) ? (
                  <a href="!#" className="bg-primary text-center w-100 cart-link text-white py-2" onClick={(e) => onPressAddToCart(hit, e)}>
                     {loading ? <CircularProgress className="text-white" color="inherit" size={20} /> : 'Add To Cart'}
                  </a>
               ) : (
                     <Link to="/app/ecommerce/cart" className="bg-secondary text-center w-100 cart-link text-white py-2">
                        View Cart
                     </Link>
                  )
               }
            </div>
         </div>
         <div className="product-info border-top p-3">
            <div className="d-flex justify-content-between">
               <h2 className="text-danger">$ {hit.price}</h2>
            </div>
            <h4 className="text-dark">{textTruncate(hit.name, 25)}</h4>
            <p className="mb-5 text-muted font-xs">
               {textTruncate(hit.description, 50)}
            </p>
         </div>
      </RctCard>
   )
}

export default Hit;
