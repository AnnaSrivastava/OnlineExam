import { showMessage } from 'app/store/actions/fuse';
import axios from 'axios';

export const GET_ANSWER = 'GET ANSWER';
export const SAVE_KEYWORDS = 'SAVE KEYWORDS';

export function getAnswerScore(params) {
const request = axios.get('http://localhost:3001/getAnswerScore', { params });
	return dispatch =>
		request.then(response =>
		{
			//console.log(response.data);
			dispatch({
				type: GET_ANSWER,
				payload: response.data
			})
		}
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
