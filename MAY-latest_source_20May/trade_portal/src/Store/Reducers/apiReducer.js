import { apiConstant } from "../../customRedux/constants/actionConstant";
const apiState = {
  loader: false,
  notificationMessage: false,
  apiName: null,
  errorCode: null,
  errorMessae: null,
  successMessage: null,
};

export const apiReducer = (state = apiState, action) => {
  switch (action.type) {
    case apiConstant.setApiStart:
      return {
        ...state,
        apiName: action.assignableData.apiName,
        loader: action.assignableData.loader,
        notificationMessage: action.assignableData.notificationMessage,
      };
    case apiConstant.setApiSuccess:
      return {
        ...state,
        loader: action.assignableData.loader,
        successMessage: action.assignableData.pageLoader,
        notificationMessage: action.assignableData.notificationMessage,
      };
    case apiConstant.setApiFailure:
      return {
        ...state,
        loader: action.assignableData.loader,
        errorCode: action.assignableData.errorCode,
        errorMessae: action.assignableData.errorMessae,
        notificationMessage: action.assignableData.notificationMessage,
      };
    default:
      return { ...state };
  }
};
