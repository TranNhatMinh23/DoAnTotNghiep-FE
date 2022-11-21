import * as actionTypes from '../../constants/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
	isLoading: false,
};

const init = (state, action) => {
	return updateObject(state, {
    isLoading: true,
	});
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.INIT_PAGES.SUCCESS: return init(state, action);
		default: return state;
	}
};

export default reducer;