import reducer from "./index";
import * as types from "../actions/types";
describe("Root Reducer tests", () => {
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

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should return the initial state if action is undefined", () => {
    expect(reducer(undefined, undefined)).toEqual(initialState);
  });

  it("should handle ADD_ORDER", () => {
    const appState = {};
    const payload = { flavour: "Cookies", quantity: 5, size: 0 };

    const submitUserOrderAction = {
      type: types.ADD_ORDER,
      payload
    };
    expect(reducer(appState, submitUserOrderAction)).toEqual({
      order: {
        ...payload
      },
      submittedOrders: [{ ...payload }]
    });
  });

  it("Should update order as mixed", () => {
    const appState = { mixedOrders: [] };
    const payload = { id: "1", mixedby: "", mixedon: "" };

    const createAction = {
      type: types.UPDATE_ORDER_AS_MIXED,
      payload
    };
    expect(reducer(appState, createAction)).toEqual({
      ...appState,
      mixedOrders: [...appState.mixedOrders, payload]
    });
  });
});
