import { combineReducers } from "redux";
import user from "./user_reducers";

const rootReducer = combineReducers({
  user,
});
export default rootReducer;
//만든 모듈을 rootReducer에 연결
