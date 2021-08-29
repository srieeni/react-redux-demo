import * as actions from "./"
import * as types from "./types"
import moxios from "moxios"
import * as index from "./index"
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

// @ponicode
describe("index.submitOrder", () => {
    test("0", () => {
        let callFunction = () => {
            index.submitOrder({ Flavour: "Spectacled Caiman", Size: 16, Quantity: 43083, Createdon: "2021-07-29T17:54:41.653Z", Createdby: 23306 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            index.submitOrder({ Flavour: "Nile Crocodile", Size: 16, Quantity: 44074, Createdon: "2021-07-29T23:03:48.812Z", Createdby: "73609-2040" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            index.submitOrder({ Flavour: "Australian Freshwater Crocodile", Size: 2, Quantity: 44074, Createdon: "2021-07-29T23:03:48.812Z", Createdby: 60144 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            index.submitOrder({ Flavour: "Spectacled Caiman", Size: 16, Quantity: 69660, Createdon: "2021-07-29T20:12:53.196Z", Createdby: 60144 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            index.submitOrder({ Flavour: "Dwarf Crocodile", Size: 16, Quantity: 64832, Createdon: "2021-07-29T15:31:46.922Z", Createdby: 23306 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            index.submitOrder({ Flavour: undefined, Size: NaN, Quantity: undefined, Createdon: "", Createdby: undefined })
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("index.addOrder", () => {
    test("0", () => {
        let callFunction = () => {
            index.addOrder("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            index.addOrder(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
