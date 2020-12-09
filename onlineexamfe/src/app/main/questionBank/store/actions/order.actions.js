import { showMessage } from 'app/store/actions/fuse';
import axios from 'axios';

export const GET_ORDER = 'GET ORDER';
export const SAVE_ANSWER = 'SAVE ANSWER';

// export function getOrder(params) {
// 	const request = axios.get('/api/e-commerce-app/order', { params });

// 	return dispatch =>
// 		request.then(response =>
// 			dispatch({
// 				type: GET_ORDER,
// 				payload: response.data
// 			})
// 		);
// }

export function saveAnswer(data) {
	const request = axios.post("http://localhost:3001/studentAnswer", {
		data
	});

	return dispatch =>
		//request.then(response =>
		 {
			dispatch(showMessage({ message: 'Question Saved', variant:'success' }));

			return dispatch({
				type: SAVE_ANSWER,
				payload: data
			});
		};
}
