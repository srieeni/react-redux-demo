import * as types from "./types";
import axios from "axios";
export const submitOrder = ({
  Flavour,
  Size,
  Quantity,
  Createdon,
  Createdby
}) => {
  return dispatch =>
    axios
      .post(`${process.env.REACT_APP_ORDER_API_HOST}`, { Flavour })
      .then(res => {
        const payload = res.data ? res.data : "";
        dispatch(addOrder(payload));
      })
      .catch(err => {
        console.log("Error occured during POST order submitssion", err);
        throw err;
      });
};
export const addOrder = payload => {
  return {
    type: types.ADD_ORDER,
    payload
  };
};
