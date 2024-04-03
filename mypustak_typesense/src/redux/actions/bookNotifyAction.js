// ******* bookNotifyReducer not used as it was not needed but file created for future use and need to be added to reducer index file****
import axios from 'axios';
import { url } from '../../helper/api_url';

export const sendBookNotification = (body) => (dispatch) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${url}/api/v1/post/notify_me`, body)
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                if (err.response.status == 400) {
                    reject(err)
                }

            });
    });
};
