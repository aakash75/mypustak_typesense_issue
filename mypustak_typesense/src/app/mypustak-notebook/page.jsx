import React from 'react'
import { url } from '../../helper/api_url';
import MyPustakNoteBook from "../../components/noteBook/MyPustakNoteBook"
export async function ServerSideData() {

 

    // const seo_url = "https://www.mypustak.com/mypustak-notebook"
    // console.log(seo_url, "seo_url/*/*/*/*")
    // const seobody = {
    //     url: seo_url
    // };
    // const seo_res = await fetch(`https://api.mypustak.com/api/v1/seo_tags/seo-data`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(seobody)

    // })
    // const seo_data = await seo_res.json()
    // console.log(seo_data, "seo_data")

    // let title_tag = ""
    // let meta_description = ""
    // if (seo_data.title_tag) {
    //     title_tag = seo_data.title_tag
    //     meta_description = seo_data.meta_desc

    // }
    // else {
    //     title_tag = 'Mypustak Notebook books online |used books online India !'
    //     meta_description = 'Only online free books used bookstore . Delivering in all pincodes in India. Providing fast delivery. 100% Quality assured. Engineering, medical, government jobs, novels, olympiad, school, children, university and many more books available.'
    // }
    // if (seo_data.redirect_url) {

    //     console.log(seo_data.redirect_url, "seo_data.redirect_url")
    //     res.setHeader("Location", seo_data.redirect_url);
    //     res.statusCode = 301;
    //     res.end();
    // }
    // let schema_markup = null;
    // if (seo_data.schema_markup) {
    //     schema_markup = seo_data.schema_markup
    // }
    // console.log(Object.keys(query)[1],"serverside query");
    // let product_id = Object.keys(params)[0]
    // console.log(product_id, "product_id");
    // if (product_id) {
    //     console.log("product id")
    // }
    let product_id = 83846575
    if (product_id) {
        console.log("product id")
    }
    else {
        product_id = 83846575
    }
    // let order_id = Object.keys(query)[0]
    // const user_data = JSON.parse(localStorage.getItem("user_info"));

    // let user_id = user_data.id
    let result = await fetch(
        `${url}/api/v2/notebook/fetch_notebook/${product_id}`
    );
    let response = await result.json();
    // this.setState({
    //   save_review_book:response.books_details
    // })
    let note_book_details = response.data
    console.log(note_book_details.images, "notebook_data");
    let quantity_arr = []
    quantity_arr[0] = response.data.min_order_qty
    quantity_arr[1] = response.data.min_order_qty + (response.data.qty_group_by * 1)
    quantity_arr[2] = response.data.min_order_qty + (response.data.qty_group_by * 2)
    quantity_arr[3] = response.data.min_order_qty + (response.data.qty_group_by * 3)
    quantity_arr[4] = response.data.min_order_qty + (response.data.qty_group_by * 4)
    quantity_arr[5] = response.data.min_order_qty + (response.data.qty_group_by * 5)

    let discount_percent = 0
    note_book_details.qty_discount.map(discount => {
        // console.log(response.data.min_order_qty ,discount.min_qty , discount.max_qty  ,"componentDidUpdate235"  )

        if (response.data.default_selected_qty >= discount.min_qty && response.data.min_order_qty <= discount.max_qty) {
            discount_percent = discount.discount_percent
        }
    })
    return {
        props: {
            // title_tag, meta_description,
            // og_url: 'https://www.mypustak.com/free-books',
            note_book_details: note_book_details,
            quantity_arr: quantity_arr,
            discount_percent: discount_percent,
        },
    };
}

const page = async () => {
    const bookData = await ServerSideData()
  return (
    <div>
          <MyPustakNoteBook bookData={bookData?.props} />
       
    </div>
  )
}

export default page