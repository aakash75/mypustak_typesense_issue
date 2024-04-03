"use client";
import { useEffect, useRef } from "react";

export const INSTANTSEARCHSCHEMA = "books_collection";
export const CLUSTERHOST = "g4z9t7cmykvowrnup-1.a1.typesense.net";
export const INSTANTSEARCHAPIKEY = "WcC50Q6xiobuAnmeydV47hQSRyuNyqWT";
export function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

export const DisableLoginClick = () => {
  if (typeof window !== "undefined") {
    // const disbaled_pathname = ['/view-cart','/customer/customer_account','/customer/customer_order','/mypustak-wallet','/customer/Myprofile','/customer/manage_address','/wallet/passbook/']
    const disbaled_pathname = ["/account/Loginpage"];
    const curent_pathname = window.location.pathname;
    return disbaled_pathname.includes(curent_pathname) ? true : false;
  } else {
    return false;
  }
};

export const logout = () => {
  // console.log({cookie:document.cookie});

  return new Promise((resolve, reject) => {
    sessionStorage.clear();
    localStorage.removeItem("items");
    localStorage.removeItem("user_info");
    document.cookie = "I=;expires = Thu, 01 Jan 1970 00:00:00 UTC;path=/";

    // console.log({ cookie: document.cookie });

    window.location.href = "/";

    resolve(true);
  });
};

export const validateEmail = (email) => {
  const re =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^\d{10}$/;
  return re.test(phone);
};

export const AddToLocalstorage = (cartDetails) => {
  // console.log({cartDetails});

  let fetched_cart = localStorage.getItem("items");
  if (fetched_cart) {
    let current_cart = JSON.parse(fetched_cart);
    console.log(cartDetails, "Inclludes", current_cart);

    for (let i in current_cart) {
      let bookInvId = cartDetails.bookInvId;
      if (i == bookInvId) {
        console.log(cartDetails, "cartDetails");
        console.log(current_cart, "current_cart");
        if (bookInvId.toString().includes("KOL") > -1) {
          console.log("Notebook", current_cart[i].bookQty);
          // current_cart[i].bookQty=9
        } else {
          current_cart[i] = { ...current_cart[i], ...cartDetails };
          console.log("for book");
          console.log(current_cart[i], "exists", {
            ...current_cart[i],
            ...cartDetails,
          });
        }
      } else {
        let bookInvId = cartDetails.bookInvId;
        current_cart[bookInvId] = cartDetails;
      }
    }
    let new_data = [JSON.stringify(current_cart)];
    console.log(new_data, "new_data");
    localStorage.setItem("items", new_data);
  } else {
    let bookInvId = cartDetails.bookInvId;
    let cart_obj = {};
    cart_obj[bookInvId] = cartDetails;
    let new_data = [JSON.stringify(cart_obj)];

    localStorage.setItem("items", new_data);
    // console.log();
  }
};

export const readCartLocalStorage = () => {
  let fetched_cart = localStorage.getItem("items");
  if (fetched_cart) {
    let current_cart = JSON.parse(fetched_cart);
    let cart_arr = [];
    for (let i in current_cart) {
      cart_arr.push(current_cart[i]);
    }
    return cart_arr;
  } else {
    return [];
  }
};

export const removeCartBookFromLocalStorage = (book_inv_id) => {
  let fetched_cart = localStorage.getItem("items");
  if (fetched_cart) {
    let current_cart = JSON.parse(fetched_cart);
    // console.log({current_cart},Object.keys(current_cart).length);

    if (current_cart.hasOwnProperty(book_inv_id)) {
      delete current_cart[`${book_inv_id}`];
    }
    // alert(Object.keys(current_cart).length)
    if (Object.keys(current_cart).length) {
      let new_data = [JSON.stringify(current_cart)];
      localStorage.setItem("items", new_data);
    } else {
      localStorage.removeItem("items");
    }
    return true;
  } else {
    return false;
  }
};

export const update_url_search = (body, query) => {
  console.log({ body }, "12365", { query });
  for (let item in query) {
    console.log(item, "123456aa");

    switch (item) {
      case "language":
        body["lang_filter_by"] = query[item].split(",");
        break;
      case "binding":
        body["bind_filter_by"] = query[item].split(",");

        break;
      case "bookType":
        let a = query[item].split(",");
        let result = a.map(function (x) {
          return parseInt(x, 10);
        });
        body["bookType_filter_by"] = result;
        break;
      case "book_condition":
        body["cond_filter_by"] = query[item].split(",");

        break;
      case "subject":
        body["subject_filter_by"] = query[item].split(",");

        break;

      case "classes":
        body["classes_filter_by"] = query[item].split(",");

        break;

      case "category":
        body["category"] = query[item].split(",");

        break;
      case "Latest_filter_by":
        body["Latest_filter_by"] = query[item];

        break;
      case "author":
        body["author_filter_by"] = query[item].split(",");

        break;
      case "publication":
        body["publication_filter_by"] = query[item].split(",");

        break;
      case "sort_by":
        body["sort_by"] = query[item];

        break;
        // case "authorname":
        //   body['authornameProps'] =query[item]

        // break;
        // case "publicationname":
        //   body['publicationNameProps'] =query[item]

        break;

      default:
        break;
    }
  }

  console.log(body, "123456newbody");
  return body;
};

export const Unbxd = {
  cookies: {
    visitId: "visitId",
    userId: "userId",
  },
  readCookie: function (cookieName) {
    let cookie_name = "unbxd." + cookieName;
    var name = cookie_name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(";");

    for (var i = 0; i < cookieArray.length; i++) {
      var cookie = cookieArray[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }

    return null;
  },
  setCookie: function (cookieName, cookieValue, expirationDate) {
    console.log(cookieName, "cookieName");
    let cookie_name = "unbxd." + cookieName;
    var cookie = cookie_name + "=" + encodeURIComponent(cookieValue);
    if (expirationDate) {
      cookie += "; expires=" + expirationDate.toUTCString();
    }
    document.cookie = cookie;
  },
};

export const createSlug = (title) => {
  // Remove special characters using regex
  let slug = title.replace(/[^\w\s]/gi, "");

  // Replace spaces with "-"
  slug = slug.replace(/\s+/g, "-");

  // Convert to lowercase
  slug = slug.toLowerCase();

  return slug;
};



export const getDiscountPercentage = (price, mrp) => {
  // Calculate the discount value
  let discountValue = mrp - price;

  // Calculate the discount percentage
  let discountPercentage = (discountValue / mrp) * 100;

  // Round the discount percentage to two decimal places
  discountPercentage = Math.round(discountPercentage * 100) / 100;

  return { percentage: parseInt(discountPercentage), value: parseInt(discountValue) };
}