import { toastConstant } from "../../customRedux/constants/actionConstant";
import { infoToast, successToast, warnToast, errorToast } from "../../App";
const toastState = {
  position: process.env.REACT_APP_TOAST_POSITION,
  theme: process.env.REACT_APP_TOAST_THEME,
  alertType: null,
  message: null,
};

export const notificationReducer = (state = toastState, action) => {
  switch (action.type) {
    case toastConstant.setToast:
      return {
        ...state,
        message: action.message,
      };
    case toastConstant.infoToast:
      infoToast(state.message, state.position, state.theme);
      return { ...state };
    case toastConstant.successToast:
      successToast(state.message, state.position, state.theme);
      return { ...state };
    case toastConstant.warnToast:
      warnToast(state.message, state.position, state.theme);
      return { ...state };
    case toastConstant.errorToast:
      errorToast(state.message, state.position, state.theme);
      return { ...state };

    default:
      return { ...state };
  }
};
