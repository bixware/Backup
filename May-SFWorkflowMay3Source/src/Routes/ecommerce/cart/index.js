/**
 * View Cart Page
 */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Input } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
// Card Component
import { RctCard, RctCardContent } from 'Components/RctCard';
//Actions
import { deleteItemFromCart, onChangeProductQuantity } from 'Store/Actions';
//Helper
import { textTruncate } from "Helpers/helpers";
// intl messages
import IntlMessages from 'Util/IntlMessages';
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

function Carts(props) {
   const dispatch = useDispatch();
   const ecommerce = useSelector(state => state.ecommerce);

   const onChangeQuantity = (quantity, cartItem) => {
      if (quantity > 0) {
         dispatch(onChangeProductQuantity(quantity, cartItem));
      }
   }

   //Get Total Price
   const getTotalPrice = () => {
      const { cart } = ecommerce;
      let totalPrice = 0;
      for (const item of cart) {
         totalPrice += item.totalPrice
      }
      return totalPrice.toFixed(2);
   }

   //Is Cart Empty
   const isCartEmpty = () => {
      const { cart } = ecommerce;
      if (cart.length === 0) {
         return true;
      }
   }

   const {  match } = props;
   const { cart } = ecommerce;
   return (
      <div className="cart-wrapper">
         <PageTitleBar title={<IntlMessages id="sidebar.cart" />} match={match} />
         <RctCard>
            <RctCardContent noPadding>
               <Table hover responsive className="mb-0">
                  <thead>
                     <tr>
                        <th className="w-10"></th>
                        <th className="w-50"><IntlMessages id="components.product" /></th>
                        <th className="w-10 text-center"><IntlMessages id="components.quantity" /></th>
                        <th className="w-10 text-center"><IntlMessages id="widgets.price" /></th>
                        <th className="w-10 text-center"><IntlMessages id="components.totalPrice" /></th>
                        <th className="w-10 text-center"><IntlMessages id="components.removeProduct" /></th>
                     </tr>
                  </thead>
                  <tbody>
                     {!isCartEmpty() ? cart.map((cart, key) => (
                        <tr key={key}>
                           <td className="w-10 text-center"><img src={cart.image} alt="products" className="media-object" width="100" height="100" /></td>
                           <td className="w-50">
                              <h3>{textTruncate(cart.name, 40)}</h3>
                              <span className="fs-14 d-block text-muted">{textTruncate(cart.description, 80)}</span>
                              <span className="fs-14 d-block text-muted">{cart.brand}</span>
                           </td>
                           <td>
                              <Input
                                 type="number"
                                 value={cart.productQuantity}
                                 onChange={(e) => onChangeQuantity(e.target.value, cart)}
                              />
                           </td>
                           <td className="text-danger text-center">$ {cart.price}</td>
                           <td className="text-bold text-center">$ {cart.totalPrice.toFixed(2)}</td>
                           <td className="text-center">
                              <IconButton onClick={() => dispatch(deleteItemFromCart(cart))}>
                                 <i className="zmdi zmdi-close"></i>
                              </IconButton>
                           </td>
                        </tr>
                     )) :
                        <tr>
                           <td colSpan="6" className="text-center h-25">
                              <span className="d-block font-5x mb-30 text-danger"><i className="zmdi zmdi-shopping-cart"></i></span>
                              <span className="mb-20 font-3x"><IntlMessages id="components.CartEmptyText" /></span>
                           </td>
                        </tr>
                     }
                  </tbody>
                  <tfoot>
                     <tr className="text-center">
                        <td colSpan="2"><Input type="text" placeholder="Enter Promo Code" /></td>
                        <td><Button variant="contained" color="secondary" className="text-white"><IntlMessages id="widgets.apply" /></Button></td>
                        <td><span className="font-weight-bold"><IntlMessages id="widgets.total" /></span></td>
                        <td><span className="font-weight-bold">$ {getTotalPrice()}</span></td>
                        <td>
                           <Button variant="contained" size="large" color="primary" className="text-white" component={Link} to="/app/ecommerce/checkout">
                              <IntlMessages id="components.checkout" />
                           </Button>
                        </td>
                     </tr>
                  </tfoot>
               </Table>
            </RctCardContent>
         </RctCard>
      </div>
   )
}

export default Carts;