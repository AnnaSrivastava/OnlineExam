import { showMessage } from 'app/store/actions/fuse';
import axios from 'axios';

export const GET_ORDER = '[E-COMMERCE APP] GET ORDER';
export const SAVE_KEYWORDS = 'SAVE KEYWORDS';

export function getOrder(params) {
	const request = axios.get('/api/e-commerce-app/order', { params });

	return dispatch =>
		request.then(response =>
			dispatch({
				type: GET_ORDER,
				payload: response.data
			})
		);
}

export function saveKeywords(data) {
	const request = axios.post("http://localhost:3001/keywordsList", {
		data
	});

	return dispatch =>
		request.then(response => {
			dispatch(showMessage({ message: 'Keywords Saved' }));

			return dispatch({
				type: SAVE_KEYWORDS,
				payload: response.data
			});
		});
}
