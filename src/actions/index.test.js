import * as actions from "./";
import * as types from "./types";
import moxios from "moxios";
describe("Action tests", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test("add order should return an object with the expected type", () => {
    const actual = actions.addOrder();
    expect(actual.type).toEqual(types.ADD_ORDER);
  });

  it("SubmitOrder should issue a request to the expected endpoint", done => {
    const sampleOrder = {
      Flavour: "Chacolate",
      Size: 0,
      Quantity: 3
    };
    actions.submitOrder(sampleOrder)();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      expect(request.url).toEqual(`${process.env.REACT_APP_ORDER_API_HOST}`);
      expect(request.config.method).toEqual("post");
      done();
    });
  });

  it("SubmitOrder action should map the response to AddOrder action", done => {
    //arrange
    const sampleOrder = {
      Flavour: "Chacolate",
      Size: 0,
      Quantity: 3
    };
    let addOrder = jest.fn();
    let dispatch = jest.fn(addOrder);
    let resultAction;
    //act
    actions
      .submitOrder(sampleOrder)(dispatch)
      .then(action => {
        resultAction = action;
      });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 201,
          response: { Id: "1234" }
        })
        .then(() => {
          expect(dispatch).toBeCalled();
          expect(dispatch).toHaveBeenCalledWith({
            type: types.ADD_ORDER,
            payload: { Id: "1234" }
          });
          expect(addOrder).toBeCalled();
          done();
        });
    });
  });
});
