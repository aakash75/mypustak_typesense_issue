import axios from 'axios';
import { url } from '../../helper/api_url';
// import config from 'react-global-configuration';

export const updateBookImage = (book_id) => (dispatch) => {
	// /api/v1/post/bookinfo/UpdateBookImg/1438656 1438775
	// alert(' ');
	if (Number(book_id) >= 1435585) {
		axios
			.get(`${url}/api/v1/post/bookinfo/UpdateBookImg/${book_id}`)
			.then((res) => {
				// console.log('[Image U]', { res });
			})
			.catch((err) => {
				// console.log('[Image U]', { err });
			});
	}
};
