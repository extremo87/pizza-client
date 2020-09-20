import {combineReducers} from "redux";
import {reducer as data} from "./data/data";
import {reducer as cart} from "./cart/cart";
import {reducer as service} from "./service/service";
import NameSpace from "./name-space.js";


export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.CART]: cart,
  [NameSpace.SERVICE]: service
});
