export async function generateMetadata({ params, searchParams }, parent) {
  console.log(params.slug, "params+2");
  console.log(searchParams, "searchParams+2");
  const seo_url = "https://www.mypustak.com" + params
    
    // req.url.replace("=", "")
    console.log(seo_url, "seo_url/*/*/*/*")
    const seobody = {
      url: seo_url
    };
    const seo_res = await fetch(`https://api.mypustak.com/api/v1/seo_tags/seo-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(seobody)

    })
    const seo_data = await seo_res.json()
    console.log(seo_data, "seo_data")
    if (seo_data.redirect_url) {

      console.log(seo_data.redirect_url, "seo_data.redirect_url")
      res.setHeader("Location", seo_data.redirect_url);
      res.statusCode = 301;
      res.end();
    }
    let schema_markup = null;
    if (seo_data.schema_markup) {
      schema_markup = seo_data.schema_markup
    }


    let queryString = resolvedUrl.split("?")[0];
    let bookid = Object.keys(query)[0];
    let url_query_arr = [];
    url_query_arr.push(queryString);
    url_query_arr.push(bookid);
    let url_query;
    if (url_query_arr.length > 1) {
      url_query = url_query_arr[1];
    } else {
      url_query = url_query_arr[0];
    }
    let book_id, tb_no;
    if (url_query_arr.length > 1) {
      if (url_query.indexOf("&") > 0) {
        book_id = url_query.split("&")[0];
        tb_no = url_query.split("&")[1].split("=")[1];
      } else {
        book_id = url_query;
        tb_no = 0;
      }
    } else {
      book_id = query.slug;
      tb_no = 1;
    }
    let error = "";
    let SplitmultipleAuthor = "",
      multipleAuthor = "";
    let condition_obj = {},
      selectedConditon = {},
      SelectCond = "",
      defaultImgSrc = "",
      is_out_of_stack = "",
      nodata = false,
      table_type;
    let new_book_data = {};
    let newbook_conditionarr = [
      "BrandNewN",
      "AlmostNewN",
      "VeryGoodN",
      "AverageButInReadableConditionN",
    ];
    let newbook_condition = "";
    let default_book_data = {};
    let slug = query.slug;
    if (book_id) {
      slug = book_id.replace("?", "");
    }
    let result = await // this.props.getBook()
      fetch(`${url}/api/v1/get/product/v2/new/${slug ? slug : 0}/${tb_no}`);
    let response = await result.json();
    console.log(`${url}/api/v1/get/product/v2/new/${slug ? slug : 0}/${tb_no},"fetch product`);
    console.log(response);
    if (response) {
      console.log(response, "***********************************");
      multipleAuthor = response.books_details?.author;
      is_out_of_stack = response.is_out_of_stack;
      table_type = response.table_type;
      if (multipleAuthor) {
        SplitmultipleAuthor = multipleAuthor.split(",");
      }
      const bookdetails = response.books_details,
        bookConditions = response.old_book;
      let data;
      let bestCond = "";
      const AvailableConditions = Object?.keys(bookConditions);
      const AvailableConditionsNewBook = Object.keys(
        response.new_books_details
      )[0];
      newbook_condition = AvailableConditionsNewBook
        ? newbook_conditionarr[AvailableConditionsNewBook]
          ?
          newbook_conditionarr[AvailableConditionsNewBook] : ""
        : "";
      console.log(
        AvailableConditions,
        AvailableConditionsNewBook,

        "newbook_condition",
        newbook_condition,
        "AvailableConditions"
      );
      let bookInventory;
      // if (is_out_of_stack)
      let book_length = Object.getOwnPropertyNames(
        response.new_books_details
      ).length;
      let new_book_length = Object.getOwnPropertyNames(
        response.books_details
      ).length;
      // console.log(book_length, "book_lenght");
      let old_book_length = Object.getOwnPropertyNames(response.old_book).length;
      if (new_book_length || old_book_length) {
        // if (table_type == 2 || table_type == 1)
        if (new_book_length) {
          console.log("New Book");
          selectedConditon = AvailableConditionsNewBook
            ? response.new_books_details[AvailableConditionsNewBook]
            : response.new_books_details;
          new_book_data = AvailableConditionsNewBook
            ? response.new_books_details[AvailableConditionsNewBook]
            : response.new_books_details;
          console.log(new_book_data, "new_book_datanew_book_datanew_book_data");
          defaultImgSrc = `https://d1f2zer3rm8sjv.cloudfront.net/${new_book_data.image}`;
        }
        if (old_book_length) {
          console.log(
            "=============================IN OLD BOOK",
            AvailableConditions
          );
          // selectedConditon = response.old_book
          AvailableConditions.map(condition => {
            bookInventory = bookConditions[condition];

            const {
              author,
              binding,
              book_desc,
              isbn,
              language,
              no_of_pages,
              publication,
              slug,
              title,
              total_qty,
              rack_no,
              book_inv_id,
              crop_img,
              front_image,
              shipping,
              publication_date,
              edition,
              image,
              barcode,
              is_study_material,
              MRP,
              price_is_updated,
              book_id,
              category,
            } = bookInventory;
            data = {
              qty: total_qty,
              rack_no: rack_no,
              book_inv_id: book_inv_id,
              crop_img: `https://d239pyg5al708u.cloudfront.net/uploads/books/medium/cropped_image/${crop_img}`,
              front_image: `https://d239pyg5al708u.cloudfront.net/uploads/books/medium/front_image/${front_image}`,
              shipping: shipping,
              publication_date: publication_date,
              edition: edition,
              image: `https://d1f2zer3rm8sjv.cloudfront.net/${image}`,
              author,
              binding,
              book_desc,
              isbn,
              language,
              no_of_pages,
              publication,
              slug,
              title,
              barcode,
              is_study_material,
              MRP,
              price_is_updated,
              book_id,
              category,
            };
            condition_obj[[condition]] = data;
          });
          console.log(condition_obj, "condition_obj--------");
          if (AvailableConditions.includes("BrandNew")) {
            bestCond = "BrandNew";

            selectedConditon = condition_obj["BrandNew"];
            (SelectCond = bestCond),
              (defaultImgSrc = condition_obj["BrandNew"].image);
          } else if (AvailableConditions.includes("AlmostNew")) {
            bestCond = "AlmostNew";

            selectedConditon = condition_obj["AlmostNew"];
            (SelectCond = bestCond),
              (defaultImgSrc = condition_obj["AlmostNew"].image);
          } else if (AvailableConditions.includes("VeryGood")) {
            bestCond = "VeryGood";

            selectedConditon = condition_obj["VeryGood"];
            (SelectCond = bestCond),
              (defaultImgSrc = condition_obj["VeryGood"].image);
          } else if (
            AvailableConditions.includes("AverageButInReadableCondition")
          ) {
            bestCond = "AverageButInReadableCondition";

            selectedConditon = condition_obj["AverageButInReadableCondition"];
            (SelectCond = bestCond),
              (defaultImgSrc =
                condition_obj["AverageButInReadableCondition"].image);
          }

          console.log("Afer condn");
        }
      }
      // OUT OF STOCK, stored the data of book_details variable coming from API response
      // This data is showed when new book and old book is out of stock or not present
      else if (book_length) {
        selectedConditon = response.books_details;
        default_book_data = response.books_details;
        defaultImgSrc = `https://d1f2zer3rm8sjv.cloudfront.net/${response.books_details.image}`;
      } else {
        nodata = true;
      }
    }


    // ---------------- recommendation  Api
    const getCookiesId = (userid) => {
      const cookies = req.headers.cookie || '';
      const parsedCookies = parse(cookies);
      let cookie_name = "unbxd." + userid
      console.log(parsedCookies[cookie_name], "456987123")
      // console.log(cookie_name, "456987123")
      // console.log(parsedCookies.cookie_name, "456987123")

      const myCookieValue = parsedCookies[cookie_name] || '';
      return myCookieValue
    }
    let unbxd_body = {
      uid: getCookiesId("userId"),
      page_type: "HOME",
    }
    const unbxd_rec = await fetch(`${url}/api/v1/unbox/unbxd_recs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(unbxd_body)
    })
    let unbxd_recommendations = []
    if (unbxd_rec.status == 200) {
      let unbxd_rec_data = await unbxd_rec.json()
      unbxd_recommendations = unbxd_rec_data?.message?.response?.widgets
      console.log(unbxd_recommendations, "unbxd_rec_data....")
    } else {
      console.log("error while fetching unbxd recommendations")
    }
  return {
    title: title_tag,
    description: meta_description,
    openGraph: {
      description: meta_description,
      type: "website",
      url: "https://www.mypustak.com/" + params,
      title: title_tag,
      image: "https://d239pyg5al708u.cloudfront.net/uploads/icons/MyPustakLogo.png",
    }
  }
    // return {
    //   props: {
    //     query,
    //     SplitmultipleAuthor,
    //     condition_obj,
    //     selectedConditon,
    //     SelectCond,
    //     defaultImgSrc,
    //     error,
    //     is_out_of_stack,
    //     new_book_data,
    //     book: response.books_details,
    //     bookCondition: response.old_book,
    //     new_books_details: response.new_books_details,
    //     response,
    //     nodata,
    //     newbook_condition,
    //     og_url: "https://www.mypustak.com/" + req.url,
    //     schema_markup,
    //     unbxd_recommendations
    //   },
    // };
}


export default function Layout({ children }) {
  return (
    <div>
      {children}
    </div>
  )
}