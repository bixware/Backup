/**
 * Cart Component
 */
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import Button from "@material-ui/core/Button";
import { Badge } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import { withRouter } from "react-router-dom";

//Helper
import { textTruncate, getAppLayout } from "Helpers/helpers";

//Actions
import { deleteItemFromCart } from "Store/Actions";

//intl Messages
import IntlMessages from "Util/IntlMessages";

function Carts(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.ecommerce.cart);
  //Get Total Price
  const getTotalPrice = () => {
    let totalPrice = 0;
    if (cart && cart.length > 0) {
      for (const item of cart) {
        totalPrice += item.totalPrice;
      }
      return totalPrice.toFixed(2);
    }
  };

  //Is Cart Empty
  const isCartEmpty = () => {
    if (cart.length === 0) {
      return true;
    }
  };

  const { location } = props;
  return (
    <UncontrolledDropdown nav className="list-inline-item cart-dropdown">
      {/* <DropdownToggle nav className="p-0">
            <Tooltip title="Shopping Cart" placement="bottom">
               <IconButton aria-label="bag">
                  <i className="zmdi zmdi-shopping-cart"></i>
                  <Badge
                     color="success"
                     className="badge-xs badge-top-right"
                  >
                     {cart.length}
                  </Badge>
               </IconButton>
            </Tooltip>
         </DropdownToggle> */}
      <DropdownMenu right>
        <div className="dropdown-content">
          <div className="dropdown-top d-flex justify-content-between rounded-top bg-primary">
            <span className="text-white font-weight-bold">
              <IntlMessages id="components.cart" />
            </span>
            <Badge color="warning">4 NEW</Badge>
          </div>
          {isCartEmpty() ? (
            <div className="text-center p-4">
              <span className="d-block font-3x mb-15 text-danger">
                <i className="zmdi zmdi-shopping-cart"></i>
              </span>
              <h3>
                <IntlMessages id="components.CartEmptyText" />
              </h3>
            </div>
          ) : (
            <Fragment>
              <Scrollbars
                className="rct-scroll"
                autoHeight
                autoHeightMin={100}
                autoHeightMax={280}
                autoHide
              >
                <ul className="list-unstyled dropdown-list">
                  {cart &&
                    cart.length > 0 &&
                    cart.map((cart, key) => (
                      <li className="d-flex justify-content-between" key={key}>
                        <div className="media overflow-hidden w-75">
                          <div className="mr-15">
                            <img
                              src={cart.image}
                              alt="products"
                              className="media-object"
                              width="63"
                              height="63"
                            />
                          </div>
                          <div className="media-body">
                            <span className="fs-14 d-block">
                              {textTruncate(cart.name, 25)}
                            </span>
                            <span className="fs-12 d-block text-muted">
                              {textTruncate(cart.description, 50)}
                            </span>
                            <span className="fs-12 d-block text-muted">
                              {cart.brand}
                            </span>
                          </div>
                        </div>
                        <div className="text-center">
                          <span className="text-muted fs-12 d-block mb-10">
                            $ {cart.price} X {cart.productQuantity}
                          </span>
                          {/* <a
                                          href="javascript:void(0);"
                                          className="hover-close"
                                          onClick={() => deleteItemFromCart(cart)}>
                                          <i className="ti-close"></i>
                                       </a> */}
                          <button
                            type="button"
                            className="hover-close rct-link-btn"
                            onClick={() => dispatch(deleteItemFromCart(cart))}
                          >
                            <i className="ti-close"></i>
                          </button>
                        </div>
                      </li>
                    ))}
                </ul>
              </Scrollbars>
              <div className="dropdown-foot d-flex justify-content-between align-items-center p-2 bg-white rounded-bottom">
                <div>
                  <Button
                    variant="contained"
                    component={Link}
                    to={`/${getAppLayout(location)}/ecommerce/cart`}
                    color="primary"
                    className="mr-10 btn-xs bg-primary text-white"
                  >
                    <IntlMessages id="components.viewCart" />
                  </Button>
                  <Button
                    variant="contained"
                    component={Link}
                    to={`/${getAppLayout(location)}/ecommerce/checkout`}
                    color="secondary"
                    className="btn-xs text-white"
                  >
                    <IntlMessages id="components.checkout" />
                  </Button>
                </div>
                <span className="fw-normal text-dark font-weight-bold font-xs">
                  <IntlMessages id="widgets.total" /> $ {getTotalPrice()}
                </span>
              </div>
            </Fragment>
          )}
        </div>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}

export default withRouter(Carts);
