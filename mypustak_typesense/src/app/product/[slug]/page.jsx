import React from "react";
import { redirect, permanentRedirect } from "next/navigation";
import ProductPage from "../../../components/product/ProductPage";
export async function generateMetadata({ params, searchParams }) {
  console.log(params, "=-=-=-=-=-=-=-=-params---=--=-=-=-");
  console.log(searchParams, "7777");
  const bookid = Object.keys(searchParams)[0];
  const product_page_url =
    "product/" + params["slug"] + "?" + Object.keys(searchParams)[0];
  console.log(product_page_url, "searchParams");
  const seo_url = "https://www.mypustak.com/" + product_page_url;
  let url = "https://api.mypustak.com";
  const seobody = {
    url: seo_url,
  };
  // console.log(JSON.stringify(seobody), "JSON.stringify(seobody)");
  const seo_res = await fetch(
    `https://api.mypustak.com/api/v1/seo_tags/seo-data`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(seobody),
    }
  );
  let seo_data = {};
  let main_Seo_data = {};

  console.log(seo_res.status);
  const result = await // this.props.getBook()
  fetch(`${url}/api/v1/get/product/v2/new/${bookid}/0`);
  const response = await result.json();
  const book_data = response["books_details"];

  if (seo_res.status == 400) {
    console.log("Data not found");
    // hit product page api

    console.log(response["books_details"]);
    main_Seo_data.title_tag = book_data.title;
    main_Seo_data.url = seo_url;
    main_Seo_data.meta_desc =
      "Buy" +
      book_data.title +
      " From mypustak.com. Quality Assured books, Free of Cost. In Good Condition in " +
      book_data?.language +
      book_data?.publication +
      "Written by" +
      book_data?.author;
    main_Seo_data.seo_keywords = "";
  } else {
    if (seo_res) {
      seo_data = await seo_res.json();
    }
    // console.log(seo_data, "seo_data")
    if (seo_data.title_tag) {
      main_Seo_data.title_tag = seo_data.title_tag;
    }
    if (seo_data.url) {
      main_Seo_data.url = seo_data.url;
    }
    if (seo_data.meta_desc) {
      main_Seo_data.meta_desc = seo_data.meta_desc;
    }
    if (seo_data.seo_keywords) {
      main_Seo_data.seo_keywords = seo_data.seo_keywords;
    }
    if (seo_data.schema_markup) {
      main_Seo_data.schema_markup = seo_data.schema_markup;
    }
    if (seo_data.redirect_url) {
      main_Seo_data.redirect_url = seo_data.redirect_url;
      console.log(seo_data.redirect_url, "seo_data.redirect_url");
      permanentRedirect(seo_data.redirect_url);
    }
  }

  // twitter: {
  //   card: 'app',
  //     title: 'Next.js',
  //       description: 'The React Framework for the Web',
  //         siteId: '1467726470533754880',
  //           creator: '@nextjs',
  //             creatorId: '1467726470533754880',
  //               images: {
  //     url: 'https://nextjs.org/og.png',
  //       alt: 'Next.js Logo',
  //   },
  const image_url =
    "https://mypustak-6.s3.amazonaws.com/books/" + book_data.image;
  return {
    title: main_Seo_data.title_tag,
    description: main_Seo_data.meta_desc,
    author: book_data.author,
    openGraph: {
      title: main_Seo_data.title_tag,
      description: main_Seo_data.meta_desc,
      url: seo_url,
      images: [image_url],
      locale: "en_US",
      type: "website",
    },
  };
}

export async function ServerSideData({ params, searchParams }) {
  console.log(
    "-================================= server side====================================="
  );
  console.log(searchParams);
  const bookid = Object.keys(searchParams)[0];
  const product_page_url =
    "product/" + params["slug"] + "?" + Object.keys(searchParams)[0];
  console.log(product_page_url, "searchParams");
  const seo_url = "https://www.mypustak.com/" + product_page_url;
  let url = "https://api.mypustak.com";

  const result = await // this.props.getBook()
  fetch(`${url}/api/v1/get/product/v2/new/${bookid}/0`);
  const response = await result.json();
  const book_data = response["books_details"];

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
  let slug = params["slug"];

  if (response) {
    // console.log(response, "***********************************");
    multipleAuthor = response.books_details?.author;
    is_out_of_stack = response.is_out_of_stack;
    table_type = response.table_type;
    if (multipleAuthor) {
      SplitmultipleAuthor = multipleAuthor.split(",");
    }
    const bookdetails = response.books_details,
      bookConditions = response.old_book,
      importBookConditions = response.imported_books;
    let data;
    let bestCond = "";
    const AvailableConditions = Object?.keys(bookConditions);
    const AvailableImportConditions = Object?.keys(importBookConditions);
    const AvailableConditionsNewBook = Object.keys(
      response.new_books_details
    )[0];
    // console.log(AvailableImportConditions, "AvailableImportConditions==");
    newbook_condition = AvailableConditionsNewBook
      ? newbook_conditionarr[AvailableConditionsNewBook]
        ? newbook_conditionarr[AvailableConditionsNewBook]
        : ""
      : "";
    let bookInventory;
    let book_length = Object.getOwnPropertyNames(
      response.new_books_details
    ).length;
    let new_book_length = Object.getOwnPropertyNames(
      response.books_details
    ).length;
    let old_book_length = Object.getOwnPropertyNames(response.old_book).length;
    let import_book_length = Object.getOwnPropertyNames(
      response.imported_books
    ).length;
    if (new_book_length || old_book_length || import_book_length) {
      if (new_book_length) {
        console.log("New Book");
        selectedConditon = AvailableConditionsNewBook
          ? response.new_books_details[AvailableConditionsNewBook]
          : response.new_books_details;
        new_book_data = AvailableConditionsNewBook
          ? response.new_books_details[AvailableConditionsNewBook]
          : response.new_books_details;
        console.log(new_book_data, "new_book_datanew_book_datanew_book_data");
        defaultImgSrc = `https://mypustak-6.s3.amazonaws.com/books/${new_book_data.image}`;
      }
      if (old_book_length) {
        // console.log(
        //   "=============================IN OLD BOOK",
        //   AvailableConditions
        // );
        // selectedConditon = response.old_book
        AvailableConditions.map((condition) => {
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
            book_condition_id,
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
            image: `https://mypustak-6.s3.amazonaws.com/books/${image}`,
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
            book_condition_id,
          };
          condition_obj[[condition]] = data;
        });
        // console.log(condition_obj, "condition_obj--------");
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

        // console.log("Afer condn");
      }
      if (import_book_length) {
        AvailableImportConditions.map((condition) => {
          bookInventory = importBookConditions[condition];
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
            book_condition_id,
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
            image: `https://mypustak-6.s3.amazonaws.com/books/${image}`,
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
            book_condition_id,
          };
          condition_obj[[condition]] = data;
        });
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
      }
    } else if (book_length) {
      selectedConditon = response.books_details;
      default_book_data = response.books_details;
      defaultImgSrc = `https://mypustak-6.s3.amazonaws.com/books/${response.books_details.image}`;
    } else {
      nodata = true;
    }
  }
  return {
    props: {
      SplitmultipleAuthor,
      condition_obj,
      selectedConditon,
      SelectCond,
      defaultImgSrc,
      error,
      is_out_of_stack,
      new_book_data,
      book: response.books_details,
      bookCondition: response.old_book,
      new_books_details: response.new_books_details,
      response,
      nodata,
      newbook_condition,
      og_url: seo_url,
      main_Seo_data: {},
    },
  };
}

const page = async ({ params, searchParams }, props) => {
  const bookData = await ServerSideData({ params, searchParams });

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: bookData?.book?.title,
    image: `https://mypustak-6.s3.amazonaws.com/books/${bookData?.book?.image}`,
    description: bookData?.book?.book_desc,
    sku: bookData?.book?.isbn,
    brand: {
      "@type": "Organization",
      name: bookData?.book?.publication,
    },

    publisher: {
      "@type": "Organization",
      name: bookData?.book?.publication,
    },
    isbn: bookData?.book?.isbn,
    author: {
      "@type": "Person",
      name: bookData?.book?.author,
    },
  };
  //   console.log(bookData, "bookdata");
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      {/* <div>page</div> */}
      <ProductPage bookData={bookData?.props} />
    </div>
  );
};

export default page;
