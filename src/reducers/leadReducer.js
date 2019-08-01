import _ from "lodash";
import {
    CREATE_LEAD,
    FETCH_LEAD,
    FETCH_LEADS,
    DELETE_LEAD,
    EDIT_LEAD
} from "../actions/types";

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_LEADS:
            return { ...state, ..._.mapKeys(action.payload, "id") };
        case FETCH_LEAD:
            return { ...state, [action.payload.id]: action.payload };
        case CREATE_LEAD:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_LEAD:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_LEAD:
            return _.omit(state, action.payload);

        default:
            return state;
    }
};
