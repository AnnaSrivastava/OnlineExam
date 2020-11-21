import * as Actions from '../actions';
const initialState = null;

const orderReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_ORDER: {
			return {
				...action.payload
			};
		}
		case Actions.SAVE_KEYWORDS: {
			return {
				...action.payload
			};
		}
		default: {
			return state;
		}
	}
};

export default orderReducer;
