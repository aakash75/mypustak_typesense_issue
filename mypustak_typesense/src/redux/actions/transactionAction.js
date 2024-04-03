import {
  CREATE_LEDGER,
  FETCH_LEDGER,
  CREATE_TRANSACTION,
  FETCH_TRANSACTION_DETAIL,
  FETCH_TRANSACTION_POINT,
  FETCH_RULES_TABEL,
  FETCH_TXN_POINT,
  FETCH_BANK_STATEMENT,
  FETCH_LEDGER_REPORT,
  FETCH_INVOICE_REPORT,
  FETCH_CREDITNOTE_REPORT,
  FETCH_DONATION_CREDITNOTE_REPORT,
  FETCH_COURIER_ERROR,
  FETCH_PAYMENT_ERROR,
  FETCH_BANK_STATEMENT_ERROR,
  FETCH_RULES_TABEL_BYTXN,
  FECTH_TXNPOINT_STATUS,
  FECTH_RULES_BYLEDGER,
  FECTH_DONATION_TXNPOINT_STATUS,
  CREATE_MANUAL_TRANSACTION,
  CREATE_LEDGER_HEAD,
  FETCH_LEDGER_HEAD,
  FETCH_EACH_LEDGER_REPORT,
  FETCH_KEYWORD_BANKRULE,
  FETCH_WALLET_TXNENTRY,
  CREATE_MANUAL_TRANSACTION_WALLET,
  FETCH_PICKUPINVOICE_REPORT,
} from "../constants/types";
// import config from "react-global-configuration";
import axios from "axios";
import { AuthInstance, url } from "../../helper/api_url";
export const Add_Ledger =
  ({ body }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        AuthInstance.post(
          `${url}/api/accounting/create_ledger`,
          body
        )
          .then(res => {
            console.log(res.data, "1234");
            dispatch({
              type: CREATE_LEDGER,
              payload: "",
            });
            resolve(res.data);
          })
          .catch(err => {
            console.log({ err });

            reject(false);
          });
      });
    };

export const fetch_Ledger = () => dispatch => {
  return new Promise((resolve, reject) => {
    AuthInstance.get(`${url}/api/accounting/fetch_ledger`)
      .then(res => {
        console.log(res.data, "1234");
        dispatch({
          type: FETCH_LEDGER,
          payload: res.data,
        });
        resolve(res.data);
      })
      .catch(err => {
        console.log({ err });

        reject(false);
      });
  });
};

export const Create_Manual_Transaction =
  ({ order_id }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        AuthInstance.post(
          `${url}/api/accounting/create_manualtransactions/${order_id}`
        )
          .then(res => {
            console.log(res.data, "1234");
            dispatch({
              type: CREATE_MANUAL_TRANSACTION,
              payload: { order_id },
            });
            resolve(res.data);
          })
          .catch(err => {
            console.log({ err });

            reject(false);
          });
      });
    };
export const fetch_transaction_detail =
  ({ page, no_row }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        AuthInstance.get(
          `${url}/api/accounting/fetch_transaction_detail/${page}/${no_row}`
        )
          .then(res => {
            console.log(res.data, "1234");
            dispatch({
              type: FETCH_TRANSACTION_DETAIL,
              payload: { data: res.data.data, page },
            });
            resolve(res.data);
          })
          .catch(err => {
            console.log({ err });

            reject(false);
          });
      });
    };

export const Add_NEW_rule =
  ({ body }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        AuthInstance.post(
          `${url}/api/accounting/create_Rules_table`,
          body
        )
          .then(res => {
            console.log(res.data, "1234");

            resolve(res.data);
          })
          .catch(err => {
            console.log({ err });

            reject(false);
          });
      });
    };

export const create_manual_invoice = order_id => dispatch => {
  return new Promise((resolve, reject) => {
    AuthInstance.get(
      `${url}/api/accounting/Generate_Manual_invoicebill/${order_id}`
    )
      .then(res => {
        console.log(res.data, "1234");
        // dispatch({
        // 	type: FETCH_TRANSACTION_DETAIL,
        // 	payload:{ data:res.data.data,page}
        // });
        resolve(res.data);
      })
      .catch(err => {
        console.log({ err });

        reject(false);
      });
  });
};

export const create_manual_Donationinvoice = donation_req_id => dispatch => {
  return new Promise((resolve, reject) => {
    AuthInstance.get(
      `${url}/api/accounting/Generate_Manual_pickupinvoicebill/${donation_req_id}`
    )
      .then(res => {
        console.log(res.data, "1234");
        // dispatch({
        // 	type: FETCH_TRANSACTION_DETAIL,
        // 	payload:{ data:res.data.data,page}
        // });
        resolve(res.data);
      })
      .catch(err => {
        console.log({ err });

        reject(false);
      });
  });
};

export const fetch_transaction_points = () => dispatch => {
  return new Promise((resolve, reject) => {
    AuthInstance.get(
      `${url}/api/accounting/fetch_transaction_point`
    )
      .then(res => {
        console.log(res.data, "1234");
        dispatch({
          type: FETCH_TRANSACTION_POINT,
          payload: res.data,
        });
        resolve(res.data);
      })
      .catch(err => {
        console.log({ err });

        reject(false);
      });
  });
};

export const fetch_rulestable = () => dispatch => {
  return new Promise((resolve, reject) => {
    AuthInstance.get(
      `${url}/api/accounting/fetch_rules_tabel`
    )
      .then(res => {
        console.log(res.data, "1234");
        dispatch({
          type: FETCH_RULES_TABEL,
          payload: res.data,
        });
        resolve(res.data);
      })
      .catch(err => {
        console.log({ err });

        reject(false);
      });
  });
};

export const Create_Transaction_byrules =
  ({ body }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        AuthInstance.post(
          `${url}/api/accounting/create_transaction_byrulestabel`,
          body
        )
          .then(res => {
            console.log(res.data, "1234");
            dispatch({
              type: CREATE_TRANSACTION,
              payload: "",
            });
            resolve(res.data);
          })
          .catch(err => {
            console.log({ err });
            reject({ err: err.response.data });
          });
      });
    };

export const Add_txn_point =
  ({ body }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        AuthInstance.post(
          `${url}/api/accounting/create_transaction_point`,
          body
        )
          .then(res => {
            console.log(res.data, "1234");
            // dispatch({
            // 	type: CREATE_LEDGER,
            // 	payload:""
            // });
            resolve(res.data);
          })
          .catch(err => {
            console.log({ err });

            reject(false);
          });
      });
    };

export const fetch_txn_point = () => dispatch => {
  return new Promise((resolve, reject) => {
    AuthInstance.get(
      `${url}/api/accounting/fetch_txn_point`
    )
      .then(res => {
        console.log(res.data, "1234");
        dispatch({
          type: FETCH_TXN_POINT,
          payload: res.data,
        });
        resolve(res.data);
      })
      .catch(err => {
        console.log({ err });

        reject(false);
      });
  });
};

export const upload_bank_statement =
  ({ body, options }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        // alert("jj")
        AuthInstance.post(
          `${url}/api/accounting/upload_bank_statement`,
          body,
          options
        )
          .then(res => {
            console.log(res.data, "1234");
            // dispatch({
            // 	type: FETCH_TXN_POINT,
            // 	payload:res.data
            // });
            resolve(res.data);
          })
          .catch(err => {
            console.log({ err });

            reject(false);
          });
      });
    };

export const fetch_bank_statement_action =
  ({ page, no_row }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        AuthInstance.get(
          `${url}/api/accounting/fetch_bank_statement/${page}/${no_row}`
        )
          .then(res => {
            console.log(res.data, "1234");
            dispatch({
              type: FETCH_BANK_STATEMENT,
              payload: { data: res.data.data, page },
            });
            resolve(res.data);
          })
          .catch(err => {
            console.log({ err });

            reject(false);
          });
      });
    };

export const Add_bank_keyword_rule =
  ({ body }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        AuthInstance.post(
          `${url}/api/accounting/create_statement_keyword_rule`,
          body
        )
          .then(res => {
            console.log(res.data, "1234");

            resolve(res.data);
          })
          .catch(err => {
            console.log({ err });

            reject(false);
          });
      });
    };

export const Add_bulk_txn = () => dispatch => {
  return new Promise((resolve, reject) => {
    AuthInstance.post(
      `${url}/api/accounting/create_bulk_txn_entry`
    )
      .then(res => {
        console.log(res.data, "1234");

        resolve(res.data);
      })
      .catch(err => {
        console.log({ err });

        reject(false);
      });
  });
};

export const upload_payment_statement =
  ({ body, options }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        // alert("jj")
        AuthInstance.post(
          `${url}/api/accounting/Upload_payconfirm_CSV`,
          body,
          options
        )
          .then(res => {
            console.log(res, "1234");
            // dispatch({
            // 	type: FETCH_TXN_POINT,
            // 	payload:res.data
            // });
            resolve(res.data);
          })
          .catch(err => {
            console.log({ err });

            reject({ err: err.response });
          });
      });
    };

export const generate_ledgerReport =
  ({ body }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        // alert("jj")
        AuthInstance.post(
          `${url}/api/accounting/Ledger_Report`,
          body
        )
          .then(res => {
            console.log(res.data, "1234");
            dispatch({
              type: FETCH_LEDGER_REPORT,
              payload: res.data,
            });
            resolve(res.data);
          })
          .catch(err => {
            console.log({ err }, "error");

            reject({ err: err.response });
          });
      });
    };

export const generate_invoice_report =
  ({ body }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        // alert("jj")
        AuthInstance.post(
          `${url}/api/accounting/fetch_order_invoice_report`,
          body
        )
          .then(res => {
            console.log(res.data, "1234");
            dispatch({
              type: FETCH_INVOICE_REPORT,
              payload: res.data,
            });
            resolve(res.data);
          })
          .catch(err => {
            console.log({ err }, "error");

            reject({ err: err.response });
          });
      });
    };

export const generate_creditnote_report =
  ({ body }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        // alert("jj")
        AuthInstance.post(
          `${url}/api/accounting/fetch_order_cerditnote_report`,
          body
        )
          .then(res => {
            console.log(res.data, "1234");
            dispatch({
              type: FETCH_CREDITNOTE_REPORT,
              payload: res.data,
            });
            resolve(res.data);
          })
          .catch(err => {
            console.log({ err }, "error");

            reject({ err: err.response });
          });
      });
    };

export const generate_donation_creditnote_report =
  ({ body }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        // alert("jj")
        AuthInstance.post(
          `${url}/api/accounting/fetch_donation_cerditnote_report`,
          body
        )
          .then(res => {
            console.log(res.data, "1234");
            dispatch({
              type: FETCH_DONATION_CREDITNOTE_REPORT,
              payload: res.data,
            });
            resolve(res.data);
          })
          .catch(err => {
            console.log({ err }, "error");

            reject({ err: err.response });
          });
      });
    };

export const upload_courier_statement =
  ({ body }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        // alert("jj")
        AuthInstance.post(
          `${url}/api/accounting/Upload_courier_statement_CSV`,
          body
        )
          .then(res => {
            console.log(res.data, "1234");
            // dispatch({
            // 	type: FETCH_TXN_POINT,
            // 	payload:res.data
            // });
            resolve(res.data);
          })
          .catch(err => {
            console.log({ err });

            reject({ err: err.response });
          });
      });
    };

export const fetch_courier_error_action = () => dispatch => {
  return new Promise((resolve, reject) => {
    AuthInstance.get(
      `${url}/api/accounting/view_courier_error`
    )
      .then(res => {
        console.log(res.data.data, "569851234");
        dispatch({
          type: FETCH_COURIER_ERROR,
          payload: res.data.data,
        });
        resolve(res.data);
      })
      .catch(err => {
        console.log({ err });

        reject(false);
      });
  });
};

export const fetch_payment_error_action = () => dispatch => {
  return new Promise((resolve, reject) => {
    AuthInstance.get(
      `${url}/api/accounting/view_payment_error`
    )
      .then(res => {
        console.log(res.data.data, "569851234");
        dispatch({
          type: FETCH_PAYMENT_ERROR,
          payload: res.data.data,
        });
        resolve(res.data);
      })
      .catch(err => {
        console.log({ err });

        reject(false);
      });
  });
};

export const fetch_bank_statement_error_action = () => dispatch => {
  return new Promise((resolve, reject) => {
    AuthInstance.get(
      `${url}/api/accounting/view_bank_statment_error`
    )
      .then(res => {
        console.log(res.data.data, "569851234");
        dispatch({
          type: FETCH_BANK_STATEMENT_ERROR,
          payload: res.data.data,
        });
        resolve(res.data);
      })
      .catch(err => {
        console.log({ err });

        reject(false);
      });
  });
};

export const fetch_bank_statement_Filter_action =
  ({ page, no_row }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        AuthInstance.get(
          `${url}/api/accounting/fetch_bank_statement_enterFilter/${page}/${no_row}`
        )
          .then(res => {
            console.log(res.data, "1234");
            dispatch({
              type: FETCH_BANK_STATEMENT,
              payload: { data: res.data.data, page },
            });
            resolve(res.data);
          })
          .catch(err => {
            console.log({ err });

            reject(false);
          });
      });
    };

export const fetch_rulestable_bytxnpoint =
  ({ txnpoint_id }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        AuthInstance.get(
          `${url}/api/accounting/fetch_rules_tabel_by_txnpoint/${txnpoint_id}`
        )
          .then(res => {
            console.log(res.data, "1234");
            dispatch({
              type: FETCH_RULES_TABEL_BYTXN,
              payload: res.data,
            });
            resolve(res.data);
          })
          .catch(err => {
            console.log({ err });

            reject(false);
          });
      });
    };

export const fetch_txn_point_status =
  ({ order_id }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        AuthInstance.get(
          `${url}/api/accounting/fetch_txndetail_orderid/${order_id}`
        )
          .then(res => {
            console.log(res.data, "1234");
            dispatch({
              type: FECTH_TXNPOINT_STATUS,
              payload: res.data,
            });
            resolve(res.data);
          })
          .catch(err => {
            console.log({ err });

            reject({ err: err.response.data });
          });
      });
    };

export const fetch_rulestable_bytxnpoint_ledger =
  ({ txnpoint_id, ledger_id }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        AuthInstance.get(
          `${url}/api/accounting/fetch_rules__by_txnpoint_ledger/${txnpoint_id}/${ledger_id}`
        )
          .then(res => {
            console.log(res.data, "1234");
            dispatch({
              type: FECTH_RULES_BYLEDGER,
              payload: res.data,
            });
            resolve(res.data);
          })
          .catch(err => {
            console.log({ err });

            reject(false);
          });
      });
    };

export const Add_bank_only_keyword_rule =
  ({ body }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        AuthInstance.post(
          `${url}/api/accounting/create_onlystatement_keyword_rule`,
          body
        )
          .then(res => {
            console.log(res.data, "1234");

            resolve(res.data);
          })
          .catch(err => {
            console.log({ err });

            reject(false);
          });
      });
    };

export const Add_txn_single_statement =
  ({ body }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        AuthInstance.post(
          `${url}/api/accounting/create_txn_for_single_statement`,
          body
        )
          .then(res => {
            // console.log(res.data,"1234");

            resolve(true);
          })
          .catch(err => {
            console.log({ err });
            reject({ err });
          });
      });
    };

export const fetch_txn_pointdonation_status =
  ({ donation_id }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        AuthInstance.get(
          `${url}/api/accounting/fetch_txndetail_donations/${donation_id}`
        )
          .then(res => {
            console.log(res.data, "1234");
            dispatch({
              type: FECTH_DONATION_TXNPOINT_STATUS,
              payload: res.data,
            });
            resolve(res.data);
          })
          .catch(err => {
            console.log({ err });

            reject({ err: err.response.data });
          });
      });
    };

export const Create_Manual_Transaction_donation =
  ({ donation_id }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        AuthInstance.post(
          `${url}/api/accounting/create_manual_txn_dontaion/${donation_id}`
        )
          .then(res => {
            console.log(res.data, "1234");
            dispatch({
              type: CREATE_TRANSACTION,
              payload: "",
            });
            resolve(res.data);
          })
          .catch(err => {
            console.log({ err });

            reject({ err: err.response.data });
          });
      });
    };

export const Add_Ledger_head =
  ({ body }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        AuthInstance.post(
          `${url}/api/accounting/create_ledger_head`,
          body
        )
          .then(res => {
            console.log(res.data, "1234");
            dispatch({
              type: CREATE_LEDGER_HEAD,
              payload: "",
            });
            resolve(res.data);
          })
          .catch(err => {
            console.log({ err });

            reject(false);
          });
      });
    };

export const fetch_Ledger_head = () => dispatch => {
  return new Promise((resolve, reject) => {
    AuthInstance.get(
      `${url}/api/accounting/fetch_ledger_head`
    )
      .then(res => {
        console.log(res.data, "1234");
        dispatch({
          type: FETCH_LEDGER_HEAD,
          payload: res.data,
        });
        resolve(res.data);
      })
      .catch(err => {
        console.log({ err });

        reject(false);
      });
  });
};

export const Update_Ledger =
  ({ id, body }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        AuthInstance.patch(
          `${url}/api/accounting/update_Ledger_data/${id}`,
          body
        )
          .then(res => {
            console.log(res.data, "1234");
            // dispatch({
            // 	type: FETCH_LEDGER_HEAD,
            // 	payload:res.data
            // });
            resolve(res.data);
          })
          .catch(err => {
            console.log({ err });

            reject(false);
          });
      });
    };

export const generate_Each_ledgerReport =
  ({ body }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        // alert("jj")
        AuthInstance.post(
          `${url}/api/accounting/Each_Ledger_Report`,
          body
        )
          .then(res => {
            console.log(res.data, "1234");
            dispatch({
              type: FETCH_EACH_LEDGER_REPORT,
              payload: { data: res.data.data, ledger_data: res.data.ledger_data },
            });
            resolve(res.data);
          })
          .catch(err => {
            console.log({ err });
            reject({ err });
          });
      });
    };

export const fetch_keyword_banktxn =
  ({ txnpoint_id }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        AuthInstance.get(
          `${url}/api/accounting/fetch_keyword_bankrule/${txnpoint_id}`
        )
          .then(res => {
            console.log(res.data, "1234");
            dispatch({
              type: FETCH_KEYWORD_BANKRULE,
              payload: res.data,
            });
            resolve(res.data);
          })
          .catch(err => {
            console.log({ err });

            reject(false);
          });
      });
    };

export const create_order_invoice =
  ({ order_id }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        // alert("jj")
        AuthInstance.get(
          `${url}/api/accounting/creating_invoice_pdf/${order_id}`,
          { responseType: "blob" }
        )

          .then(response => {
            //Create a Blob from the PDF Stream
            const file = new Blob([response.data], { type: "application/pdf" });
            //Build a URL from the file
            const fileURL = URL.createObjectURL(file);
            //Open the URL on new Window
            // window.open(fileURL,"Invoice.pdf");

            // create <a> tag dinamically
            var fileLink = document.createElement("a");
            fileLink.href = fileURL;

            // it forces the name of the downloaded file
            fileLink.download = "pdf_name";

            // triggers the click event
            window.open(fileLink, "Mypddf");
          })
          .catch(err => {
            console.log({ err });

            reject(false);
          });
      });
    };

export const fetch_txn_point_status_wallet =
  ({ wallet_id }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        AuthInstance.get(
          `${url}/api/accounting/fetch_txndetail_Wallet/${wallet_id}`
        )
          .then(res => {
            console.log(res.data, "1234");
            dispatch({
              type: FETCH_WALLET_TXNENTRY,
              payload: res.data,
            });
            resolve(res.data);
          })
          .catch(err => {
            console.log({ err });

            reject({ err: err.response.data });
          });
      });
    };

export const Create_Manual_Transaction_wallet =
  ({ wallet_id }) =>
    dispatch => {
      //   alert("action")
      return new Promise((resolve, reject) => {
        AuthInstance.post(
          `${url}/api/accounting/create_manual_txn_Wallet/${wallet_id}`
        )
          .then(res => {
            console.log(res.data, "1234");
            dispatch({
              type: CREATE_MANUAL_TRANSACTION_WALLET,
              payload: { wallet_id },
            });
            resolve(res.data);
          })
          .catch(err => {
            console.log({ err });

            reject(false);
          });
      });
    };

export const Create_Autotxn_and_Invoice = body => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${config.get(
          "apiDomain"
        )}/api/accounting/create_txn_point_and_Invoice`,
        body
      )
      .then(res => {
        console.log(res, "mark");
        // alert(res.data.message)
        // dispatch({
        // 	type: FILTER_NOT_TXNORDER,
        // 	payload: { data: res.data, page }
        // });
        resolve(res.data);
      })
      .catch(err => {
        console.log(err, "error");
      });
  });
};

export const Create_DonationAutotxn = body => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${config.get(
          "apiDomain"
        )}/api/accounting/create_Donationtxn_point_and_Invoice`,
        body
      )
      .then(res => {
        console.log(res, "mark");
        // alert(res.data.message)
        // dispatch({
        // 	type: FILTER_NOT_TXNORDER,
        // 	payload: { data: res.data, page }
        // });
        resolve(res.data);
      })
      .catch(err => {
        console.log(err, "error");
      });
  });
};

export const update_transaction_status = () => dispatch => {
  return new Promise((resolve, reject) => {
    AuthInstance.get(
      `${url}/api/accounting/update_courier_transactions`
    )
      .then(res => {
        console.log(res, "mark");
        resolve(res.data);
      })
      .catch(err => {
        console.log(err, "error");
      });
  });
};

export const Create_WalletAutotxn = body => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${url}/api/accounting/create_AutoWallettxn_point`,
        body
      )
      .then(res => {
        console.log(res, "mark");
        // alert(res.data.message)
        // dispatch({
        // 	type: FILTER_NOT_TXNORDER,
        // 	payload: { data: res.data, page }
        // });
        resolve(res);
      })
      .catch(err => {
        console.log(err, "error");
      });
  });
};

export const generate_pickupinvoice_report =
  ({ body }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        // alert("jj")
        AuthInstance.post(
          `${url}/api/accounting/fetch_pickup_invoice_report`,
          body
        )
          .then(res => {
            console.log(res.data, "1234");
            dispatch({
              type: FETCH_PICKUPINVOICE_REPORT,
              payload: res.data,
            });
            resolve(res.data);
          })
          .catch(err => {
            console.log({ err }, "error");

            reject({ err: err.response });
          });
      });
    };

export const add_txndate_order = body => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/api/accounting/Add_txn_date`, body)
      .then(res => {
        console.log(res, "mark");
        // alert(res.data.message)
        // dispatch({
        // 	type: FILTER_NOT_TXNORDER,
        // 	payload: { data: res.data, page }
        // });
        resolve(res.data);
      })
      .catch(err => {
        console.log(err, "error");
      });
  });
};

export const add_txndate_donation = body => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${url}/api/accounting/Add_txn_date_donation`,
        body
      )
      .then(res => {
        console.log(res, "mark");
        // alert(res.data.message)
        // dispatch({
        // 	type: FILTER_NOT_TXNORDER,
        // 	payload: { data: res.data, page }
        // });
        resolve(res.data);
      })
      .catch(err => {
        console.log(err, "error");
      });
  });
};

export const add_txndate_wallet = body => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${url}/api/accounting/Add_txn_date_wallet`,
        body
      )

      .then(res => {
        console.log(res, "mark");
        // alert(res.data.message)
        // dispatch({
        // 	type: FILTER_NOT_TXNORDER,
        // 	payload: { data: res.data, page }
        // });
        resolve(res.data);
      })
      .catch(err => {
        console.log(err, "error");
      });
  });
};

export const Create_Auto_order_creditnotes = body => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${config.get(
          "apiDomain"
        )}/api/v1/order_details_api/create_all_creditnotes_inloop`,
        body
      )
      .then(res => {
        console.log(res, "mark");

        resolve(res.data);
      })
      .catch(err => {
        console.log(err, "error");
      });
  });
};

export const Create_Auto_partialcreditnotes = body => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${config.get(
          "apiDomain"
        )}/api/v1/order_details_api/create_partialwallet_creditnotes_inloop`,
        body
      )
      .then(res => {
        console.log(res, "mark");

        resolve(res.data);
      })
      .catch(err => {
        console.log(err, "error");
      });
  });
};

export const Create_Auto_donationcreditnotes = body => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${config.get(
          "apiDomain"
        )}/api/v1/order_details_api/create_credit_notes_donation`,
        body
      )
      .then(res => {
        console.log(res, "mark");

        resolve(res.data);
      })
      .catch(err => {
        console.log(err, "error");
      });
  });
};
