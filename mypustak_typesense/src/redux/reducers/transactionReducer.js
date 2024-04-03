import {
  FETCH_TRANSACTION_DETAIL,
  FETCH_LEDGER,
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
  FETCH_LEDGER_HEAD,
  FETCH_EACH_LEDGER_REPORT,
  FETCH_KEYWORD_BANKRULE,
  FETCH_WALLET_TXNENTRY,
  FETCH_PICKUPINVOICE_REPORT,
} from "../constants/types";

const initialState = {
  fetch_datalist: [],
  fetch_ledger: [],
  transaction_points: [],
  fetch_rules: [],
  fetch_txnpoint_list: [],
  fetch_bank_statement: [],
  ledger_report_data: [],
  invoice_report_data: [],
  invoice_amount: [],
  courier_error_list: [],
  payment_error_list: [],
  bank_statement_err_list: [],
  fetch_rules_bytxnpoint: [],
  txn_point_status: [],
  rules_byledger: "",
  fetch_ledger_head: [],
  ledger_data: [],
  ledger_bal: [],
  bank_keyword: [],
  pickupinvoice_report_data: [],
  pickupinvoice_amount: [],
  invoice_creditnote_data: [],
  invoice_creditnote_amount: [],
  invoice_donation_creditnote_data: [],
  invoice_donation_creditnote_amount: [],
};

export default function getTransaction (state = initialState, action) {
  switch (action.type) {
    case FETCH_TRANSACTION_DETAIL:
      // alert("2")
      console.log(action.payload.data, "quo2");
      if (action.payload.page > 0) {
        console.log(action.payload, "action.payload");

        return {
          ...state,
          fetch_datalist: [...state.fetch_datalist, ...action.payload.data],
        };
      } else {
        return {
          ...state,
          fetch_datalist: action.payload.data,
        };
      }

    case FETCH_LEDGER:
      return {
        ...state,
        fetch_ledger: action.payload.data,
      };

    case FETCH_TRANSACTION_POINT:
      return {
        ...state,
        transaction_points: action.payload.data,
      };

    case FETCH_RULES_TABEL:
      return {
        ...state,
        fetch_rules: action.payload.data,
      };

    case FETCH_TXN_POINT:
      return {
        ...state,
        fetch_txnpoint_list: action.payload.data,
      };

    case FETCH_BANK_STATEMENT:
      // alert("2")
      console.log(action.payload.data, "quo2");
      if (action.payload.page > 0) {
        console.log(action.payload, "action.payload");

        return {
          ...state,
          fetch_bank_statement: [
            ...state.fetch_bank_statement,
            ...action.payload.data,
          ],
        };
      } else {
        return {
          ...state,
          fetch_bank_statement: action.payload.data,
        };
      }
    case FETCH_LEDGER_REPORT:
      return {
        ...state,
        ledger_report_data: action.payload.data,
      };
    case FETCH_INVOICE_REPORT:
      return {
        ...state,
        invoice_report_data: action.payload.data,
        invoice_amount: action.payload.amount,
      };
    case FETCH_CREDITNOTE_REPORT:
      return {
        ...state,
        invoice_creditnote_data: action.payload.data,
        invoice_creditnote_amount: action.payload.amount,
      };
    case FETCH_DONATION_CREDITNOTE_REPORT:
      return {
        ...state,
        invoice_donation_creditnote_data: action.payload.data,
        invoice_donation_creditnote_amount: action.payload.amount,
      };

    case FETCH_COURIER_ERROR:
      // alert("h")
      console.log(action.payload, "56985");
      return {
        ...state,
        courier_error_list: action.payload,
      };
    case FETCH_PAYMENT_ERROR:
      // alert("h")
      console.log(action.payload, "56985");
      return {
        ...state,
        payment_error_list: action.payload,
      };

    case FETCH_BANK_STATEMENT_ERROR:
      // alert("h")
      console.log(action.payload, "56985");
      return {
        ...state,
        bank_statement_err_list: action.payload,
      };

    case FETCH_RULES_TABEL_BYTXN:
      return {
        ...state,
        fetch_rules_bytxnpoint: action.payload.data,
      };
    case FECTH_TXNPOINT_STATUS:
      return {
        ...state,
        txn_point_status: action.payload.data,
      };
    case FECTH_RULES_BYLEDGER:
      return {
        ...state,
        rules_byledger: action.payload.data,
      };
    case FECTH_DONATION_TXNPOINT_STATUS:
      return {
        ...state,
        txn_point_status: action.payload.data,
      };

    case FETCH_LEDGER_HEAD:
      return {
        ...state,
        fetch_ledger_head: action.payload.data,
      };
    case FETCH_EACH_LEDGER_REPORT:
      // console.log(action.payload.ledger_data,"ledgerr",action.payload.data)
      // alert("hh")
      return {
        ...state,
        ledger_data: action.payload.ledger_data,
        ledger_bal: action.payload.data[0],
      };
    case FETCH_KEYWORD_BANKRULE:
      return {
        ...state,
        bank_keyword: action.payload.data[0],
      };
    case FETCH_WALLET_TXNENTRY:
      return {
        ...state,
        txn_point_status: action.payload.data,
      };

    case FETCH_PICKUPINVOICE_REPORT:
      return {
        ...state,
        pickupinvoice_report_data: action.payload.data,
        pickupinvoice_amount: action.payload.amount,
      };
    default:
      return state;
  }
}
