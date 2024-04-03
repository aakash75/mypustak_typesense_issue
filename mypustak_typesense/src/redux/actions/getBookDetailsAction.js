import axios from 'axios'
import { url } from '../../helper/api_url'
export const getBook = (slug, book_id, tb_no) => (dispatch) => {
    // console.log({slug, book_id,tb_no})
    if (book_id) {
        slug = book_id.replace('?', '');
    }
    return new Promise((resolve, reject) => {
        axios
            // .get(`${config.get('apiDomain')}/api/v1/get/product/new/${slug}`)

            // .get(`https://data.mypustak.com/api/v1/get/product/new/${slug}`)
            .get(`${url}/api/v1/get/product/v2/new/${slug}/${tb_no}`)
            .then((res) => {
                // console.log(res.data, 'getBook');
                // dispatch({
                //     type: GET_BOOK,
                //     payload: res.data
                // });

                resolve(res.data);
            })
            .catch((err) => {
                console.log(err, 'getBook');
                reject(true);
            });
    });
};
