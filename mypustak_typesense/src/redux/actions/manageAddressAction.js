// import {  } from "../types";
import axios from "axios";
import { AuthInstance, url } from "../../helper/api_url";
import { GETADDRESS, LOADING_ADDRESS } from "../constants/types";
import { encryptor } from "../../helper/crypto";
// import config from 'react-global-configuration'

export const fetchUserAddress = (details) => (dispatch) => {
    // alert("getaddress")
    dispatch({
        type: LOADING_ADDRESS,
        payload: {},
    });
    return new Promise((resolve, reject) => {
        AuthInstance.get(`${url}/api/v1/get/user_address`, {
            // headers: {
            // 	Authorization: details
            // }
        })
            .then(res => {
                dispatch({
                    type: GETADDRESS,
                    payload: res.data,
                });
                // console.log(res.data.output)
                // alert(res.data.output.length)
                const all_address = res.data.output;
                const primary_address = all_address.filter(
                    address => address.is_primary == "Y"
                );

                // if (primary_address.length) {
                //     // console.log({primary_address},primary_address.length);

                //     dispatch({
                //         type: GETSELECTEDADDRESS,
                //         payload: primary_address[0],
                //     });

                //     dispatch(SendAddressId(primary_address[0].address_id));
                // }
                resolve(res.data.output)
            })
            .catch(err => {
                console.log({ err });
                dispatch({
                    type: LOADING_ADDRESS,
                    payload: {},
                });
                reject(err)
            });
    })

};


export const deleteAddressAction = (addres_id) => (dispatch) => {
    // alert("action")
    return new Promise((resolve, reject) => {
        const passdata = {
            address_id: addres_id,
        };
        const encrypt_data = { address_id: encryptor(passdata) };

        AuthInstance.post(`${url}/api/v1/post/delete_address`, encrypt_data).then((res) => {
            // alert("doneAction")
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })

};
