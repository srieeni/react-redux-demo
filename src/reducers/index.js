import * as types from "../actions/types";

const initialState = {
  order: {
    flavour: "",
    size: 0,
    quantity: 0,
    decorators: {
      type: { birthdayflavour: true },
      color: "green"
    },
    createdon: "",
    createdby: ""
  },
  submittedOrders: [],
  mixedOrders: [],
  bakedOrders: [],
  decoratedOrders: [],
  packagedOrders: []
};

const rootReducer = (state = initialState, action) => {
  if (typeof action == "undefined") {
    return state;
  }

  switch (action.type) {
    case types.ADD_ORDER:
      const previousSubmittedOrders = !state.submittedOrders
        ? []
        : state.submittedOrders;
      return {
        ...state,
        order: {
          ...state.order,
          ...action.payload
        },
        submittedOrders: [...previousSubmittedOrders, action.payload]
      };
    case types.UPDATE_ORDER_AS_MIXED:
      return {
        ...state,
        mixedOrders: [...state.mixedOrders, action.payload]
      };

    case types.RESET_ORDER: {
      return { ...state, ...initialState };
    }
    default:
      return state;
  }
};
export default rootReducer;
