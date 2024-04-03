// import { USERWISHLIST, SETRELOADWISHLIST, WISHLISTCOUNT } from "../constants/types";
import axios from "axios";
import { url, AuthInstance, url2 } from "../../helper/api_url";
import {
    GETACTIVEBLOG, GETACTIVECATEGORY, GETACTIVETAGS, GETCATEGORYDATA, GETBLOGDETAILS, GET_TAG_BY_SLUG, GET_POST_BY_USER
    , USER_POST_BY_SLUG, GET_CATEGORIES, GET_BLOG_BY_ID, GET_USER_DETAILS
} from "../constants/types";


export const getActiveBlogData = ({ pageNo, NoOfRecords }) => (dispatch) => {
    axios
        .get(`${url2}/api/bloggin_api/search_article_list/${pageNo}/${NoOfRecords}`,)
        .then((res) => {
            dispatch({
                type: GETACTIVEBLOG,
                payload: res.data,
            });
        })
        .catch((err) => console.log(err));
};

export const getActiveCategoryData = ({ pageNo, NoOfRecords }) => (dispatch) => {
    axios
        .get(`${url2}/api/bloggin_api/fetch_active_blog_category/${pageNo}/${NoOfRecords}`,)
        .then((res) => {
            dispatch({
                type: GETACTIVECATEGORY,
                payload: res.data,
            });
        })
        .catch((err) => console.log(err));
};


export const getActiveTagsData = ({ pageNo, NoOfRecords }) => (dispatch) => {
    axios
        .get(`${url2}/api/bloggin_api/fetch_tags/${pageNo}/${NoOfRecords}`,)
        .then((res) => {
            dispatch({
                type: GETACTIVETAGS,
                payload: res.data,
            });
        })
        .catch((err) => console.log(err));
};

export const subscribeLetter = ({ email }) => (dispatch) => {
    return new Promise((resolve, reject) => {

        axios
            .post(`${url2}/api/bloggin_api/news_letter`, { email: email })
            .then((res) => {
                resolve(res.data);
                // return res.data;
            })
            .catch((err) => {
                console.log(err)
                reject(false)
            })
    })
}

export const getCategoryData = (data) => (dispatch) => {
    const { category_slug, pageNo, NoOfRecords } = data;

    axios
        .post(`${url2}api/bloggin_api/fetch_blog_by_category_by_slug/${pageNo}/${NoOfRecords}`, { category_slug })
        .then((res) => {
            dispatch({
                type: GETCATEGORYDATA,
                payload: res.data,
            });
        })
        .catch((err) => console.log(err));
};


export const getBlogDetails = (data) => (dispatch) => {
    const body = { "slug": data }

    axios
        .post(`${url2}api/bloggin_api/fetch_article_by_slug`, body)
        .then((res) => {
            dispatch({
                type: GETBLOGDETAILS,
                payload: res.data,
            });
        })
        .catch((err) => console.log(err));
};


export const get_tag_by_slug = ({ pageNo, NoOfRecords, tag_name }) => (dispatch) => {
    const data = { tag_name: tag_name }
    axios
        .post(`${url2}api/bloggin_api/fetch_blog_by_tag_name/${pageNo}/${NoOfRecords}`, data)
        .then((res) => {
            dispatch({
                type: GET_TAG_BY_SLUG,
                payload: res.data,
            });
        })
        .catch((err) => console.log(err));
};


export const getPostByUser = ({ page, row }) => (dispatch) => {

    AuthInstance
        .post(`${url2}api/bloggin_api/article_by_user_id_v2/${page}/${row}`)
        .then((res) => {
            dispatch({
                type: GET_POST_BY_USER,
                payload: res.data,
            });
        })
        .catch((err) => console.log(err));
};


export const deleteBlogById = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {

        AuthInstance
            .post(`${url2}/api/bloggin_api/delete_article/${id}`)
            .then((res) => {
                resolve(res.data);
                // return res.data;
            })
            .catch((err) => {
                console.log(err)
                reject(false)
            })
    })
}


export const updateBlogById = (article_status, id) => (dispatch) => {

    let blogData = new FormData();
    blogData.append("article_status", article_status);

    return new Promise((resolve, reject) => {

        AuthInstance
            .patch(`${url2}/api/bloggin_api/update_blog/${id}`, blogData)
            .then((res) => {
                resolve(res.data);
                console.log(res)

                return res;
            })
            .catch((err) => {
                console.log(err)
                reject(false)
            })
    })
}


export const userPostBySlug = (data) => (dispatch) => {

    AuthInstance
        .post(`${url2}api/bloggin_api/fetch_article_by_slug_user`, data)
        .then((res) => {
            dispatch({
                type: USER_POST_BY_SLUG,
                payload: res.data,
            });
        })
        .catch((err) => console.log(err));
};

export const getBlogById = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        AuthInstance
            .get(`${url2}api/bloggin_api/fetch_blog_by_id/${id}`)
            .then((res) => {
                dispatch({
                    type: GET_BLOG_BY_ID,
                    payload: res.data,
                });
                resolve(res.data)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
};


export const getCategoriesData = ({ pageNo, NoOfRecords }) => dispatch => {
    return new Promise((resolve, reject) => {
        AuthInstance
            .get(`${url2}api/bloggin_api/fetch_blog_category/${pageNo}/${NoOfRecords}`)
            .then((res) => {
                dispatch({
                    type: GET_CATEGORIES,
                    payload: res.data,
                });
                resolve(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
};


export const updateBlog = (postContent,
    excerpt,
    blogData,
    image,
    blogId) => (dispatch) => {

        let Data = new FormData();
        Data.append("article_title", blogData?.postTitle);
        Data.append("article_excerpt", excerpt);
        Data.append("article_content", postContent);
        Data.append("article_main_thumb", image?.article_main_thumb);
        Data.append("article_thumb", image?.article_thumb);
        Data.append("article_tag", blogData?.postTags);
        Data.append("article_category_id", blogData?.postCategory);

        return new Promise((resolve, reject) => {

            AuthInstance
                .patch(`${url2}/api/bloggin_api/update_blog/${blogId}`, Data)
                .then((res) => {
                    resolve(res.data);
                    console.log(res)

                    return res;
                })
                .catch((err) => {
                    console.log(err)
                    reject(false)
                })
        })
    }



export const createBlog = (data) => dispatch => {
    console.log(data,
        "22")
    let blogData = new FormData();

    blogData.append("article_title", data?.blogData?.postTitle);
    blogData.append("article_excerpt", data?.excerpt);
    blogData.append("article_content", data?.postContent);
    blogData.append("article_main_thumb", data?.image?.article_main_thumb);
    blogData.append("article_thumb", data?.image?.article_thumb);
    blogData.append("article_tag", data?.blogData?.postTags);
    blogData.append("article_category_id", data?.blogData?.postCategory);
    return new Promise((resolve, reject) => {
        AuthInstance
            .post(`${url2}api/bloggin_api/create_blog`, blogData)
            .then((res) => {

                resolve(res.data)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
};

export const getUserData = () => dispatch => {
    return new Promise((resolve, reject) => {
        AuthInstance.get(`${url2}/core/user_details/`)
            .then((res) => {
                dispatch({
                    type: GET_USER_DETAILS,
                    payload: res.data,
                });
                resolve(res.data)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
};




export const updateCategory_status = (catId) => (dispatch) => {

    let categoryData = new FormData();

    categoryData.append("category_status", 1);

    return new Promise((resolve, reject) => {

        AuthInstance
            .patch(`${url2}/api/bloggin_api/update_blog_category/${catId}`, categoryData)
            .then((res) => {
                resolve(res.data);
                console.log(res)

                return res;
            })
            .catch((err) => {
                console.log(err)
                reject(false)
            })
    })
}



export const createCategory = (category,image) => dispatch => {
    console.log(category,image,
        "22")
    let categoryData = new FormData();
    categoryData.append("category_title", category
        ?.postTitle);
    categoryData.append("category_image", image?.category_main_thumb);
    categoryData.append("category_thumb", image?.category_thumb);
    categoryData.append("category_rank",category
        ?.categoryRank ? parseInt(category
            ?.categoryRank) : "");
    console.log(parseInt(category
        ?.categoryRank), "2212100");
    return new Promise((resolve, reject) => {
        AuthInstance
            .post(`${url2}api/bloggin_api/add_blog_category`, categoryData)
            .then((res) => {

                resolve(res.data)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
};


export const updateCategory = (category, image, categoryId) => (dispatch) => {
    let categoryData = new FormData();

    categoryData.append("category_title", category
                ?.postTitle);
            categoryData.append("category_image", image?.category_main_thumb);
            categoryData.append("category_thumb", image?.category_thumb);
    categoryData.append("category_status", category?.category_status =="Active" ? 0:1);
    categoryData.append("category_rank",category
        ?.categoryRank != "" ? parseInt(category
                    ?.categoryRank) : 0);

    return new Promise((resolve, reject) => {

        AuthInstance
            .patch(`${url2}/api/bloggin_api/update_blog_category/${categoryId}`, categoryData)
            .then((res) => {
                resolve(res.data);
                console.log(res)

                return res;
            })
            .catch((err) => {
                console.log(err)
                reject(false)
            })
    })
}





export const reportAbuse = (reportData) => (dispatch) => {
    console.log("Report Data", reportData);
    const { id, problem, reportMsg } = reportData;

    return new Promise((resolve, reject) => {

        axios.post(`${url2}/api/bloggin_api/report_blog/${id}111`, { report_tag: problem, report_message: reportMsg }).then((res) => {
                resolve(res.data);
                console.log(res)

                return res;
            })
            .catch((err) => {
                console.log(err)
                reject(false)
            })
    })
}


