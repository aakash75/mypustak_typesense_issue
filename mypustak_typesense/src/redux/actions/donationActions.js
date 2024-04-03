
import {
    CHANGE_LOGIN, ADD_DONATION, CHANAGE_CATEGORIES, RESETRPID,
    GET_RP_ID, SETPICKUP, GETDONATIONHISTORY, DONATIONMAILDATA, PICKUPDATES, ISSERVERERROR
} from '../constants/types'
import axios from 'axios'
import { AuthInstance, url } from '../../helper/api_url'
export const ChangeLogin = (login) => {
    // alert("okk");
    return {
        type: CHANGE_LOGIN,
    }
}

export const AddDonation = (donation) => dispatch => {
    console.log(donation, "donation body")
    // axios.post('http://103.217.220.149:80/donate-books/api/donateBook/',donation  
    return new Promise((resolve, reject) => {

        AuthInstance.post(
            `${url}/api/v1/post/donation_form`,
            donation
            //   { headers: { Authorization: token } }
        )
            .then((res) => {
                dispatch({
                    type: ADD_DONATION,
                    payload: res.data,
                })

                resolve(true)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
};



export const Get_Rp_Id = (data) => dispatch => {
    // console.log(data,"data for razorpay")
    return new Promise((resolve, reject) => {
        axios.post(`${url}/api/v1/post/get_razorpayid`, data
        ).then(res => {
            // console.log(data);

            dispatch({
                type: GET_RP_ID,
                payload: res.data.output
            })
            resolve(res)
        }).catch(err => {
            console.log(err, data)
            reject(err)
        });
    })
};

export const Reset_Rp_Id = () => {
    return {
        type: RESETRPID,
        // payload:category,
    }
}


export const ChangeCategories = (category) => {
    return {
        type: CHANAGE_CATEGORIES,
        payload: category,
    }
}
export const DonationMailData = (data) => {
    // console.log(data);  
    return {
        type: DONATIONMAILDATA,
        payload: data,
    }
}
export const SetPickup = () => {
    return {
        type: SETPICKUP,
        // payload:category,
    }
}

export const GetDonationHistory = (page) => dispatch => {
    return new Promise((resolve, reject) => {
        AuthInstance.get(`${url}/donation/donorhistory/${page}`).then((res) => {
            dispatch({
                type: GETDONATIONHISTORY,
                payload: res.data
            })
            resolve(res.data.requests)
        }).catch((err) => {
            dispatch({
                type: ISSERVERERROR,
            })
            console.log(err)
            reject(err)

        })
    })
    // return new Promise((resolve, reject) => {

    //         .then(res => {
    //     // console.log(res);

    //     dispatch({
    //         type: GETDONATIONHISTORY,
    //         payload: res.data
    //     })
    //     resolve(true)
    // }).catch((err) => {

    //         );
    // });
};



export const Update_donation_pickupdate = ({ data }) => dispatch => {
    // alert("hi")
    return new Promise((resolve, reject) => {
        AuthInstance.patch(`${url}/donation/UpdateDoner_pickupdate/${data.id}`, data
        )
            .then(res => {
                dispatch({
                    type: GETDONATIONHISTORY,
                    payload: res.data
                })
                resolve(true)
            })
            .catch(err => console.log(err));

    });
};



export const fetch_donor_pickupdates = () => (dispatch) => {
    // alert("h")
    return new Promise((resolve, reject) => {
        AuthInstance
            .post(`${url}/donation/fetch_pickup_date`)
            .then((res) => {
                // console.log(res.data,"4321check");
                dispatch({
                    type: PICKUPDATES,
                    payload: res.data
                });
                resolve(true);
            })
            .catch((err) => {
                console.log({ err });

                resolve(false);
            });
    });
};


export const AddDonation_formQueue = (donation) => dispatch => {
    // console.log(donation,"donation_queue")
    // axios.post('http://103.217.220.149:80/donate-books/api/donateBook/',donation  
    return new Promise((resolve, reject) => {

        AuthInstance.post(
            `${url}/api/v1/donation-form-status/Create_donationform_queue`,
            donation
            //   { headers: { Authorization: token } }
        )
            .then((res) => {
                // dispatch({
                // type: ADD_DONATION,
                // payload: res.data,
                // })

                resolve(true)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
};
export const updateRefundStatusAction = (id, type) => {
    const body = { reference_id: id, order_type: type }
    return new Promise((resolve, reject) => {
        AuthInstance
            .post(`${url}/api/v1/logistics_data/create_logistics`, body)
            .then((res) => {
                alert(res.data.message)
                console.log(res.data.message)
                resolve()
            })
            .catch((err) => {
                alert("notokk")
                console.log(err.message)
                reject(true)
            })
    })

}