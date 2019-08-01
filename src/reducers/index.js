import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import leadReducer from "./leadReducer";

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    leads: leadReducer
});
