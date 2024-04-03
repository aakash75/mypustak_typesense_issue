"use client"
import React, { useEffect, useState } from "react";
import Input from "@/components/Input/Input";
import { connect, useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import ButtonPrimary from "@/components/Button/ButtonPrimary";
// import Select from "@/components/Select/Select";
import Label from "@/components/Label/Label";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';
import { getPostByUser, createBlog, getCategoriesData, getBlogById, updateBlog } from "@/redux/actions/blogAction"
// import { createBlog, blog, resetCreateBlogStates } from "@/Redux/Features/Blog/BlogSlice";
// import { getCategories, getCategory } from "@/Redux/Features/Blog/GetCategorySlice";
// import { getBlogById, getBlogId, resetStates } from "@/Redux/Features/Blog/GetBlogByIdSlice";


import dynamic from 'next/dynamic'

// using this dynamic import, window is not defined
const MyEditor = dynamic(() => import('@/components/MyEditor'), {
  ssr: false
})

const DashboardSubmitPost = (props) => {
  const [postContent, setPostConent] = useState("");
  const [loader, setLoader] = useState(false)
  const router = useRouter();

  const [tempImg, setTempImg] = useState({
    article_main_thumb: "",
    article_thumb: ""
  });
  const [excerpt, setExcerpt] = useState('');
  const [image, setImage] = useState({
    article_main_thumb: "",
    article_thumb: ""
  });
  const [categoryState, setCategoryState] = useState(null)
  const dispatch = useDispatch();
  const searchParama = useSearchParams();
  const blogId = searchParama?.get("id");
  // const blogState = useSelector(blog);

  // const updatedBlogState = useSelector(updatedBlog);

  const [blogData, setBlogData] = useState({
    postTitle: null,
    postCategory: null,
    postTags: null,
  })

  useEffect(() => {
    const blog = searchParama?.get("id");
    if (blog) {
      props.getBlogById(blog)?.then((res) => {
        setBlogData({
          ...blogData,
          postTitle: res?.data?.article_title,
          postTags: res?.data?.article_tag,
          postCategory: res?.data?.article_category_id,

        });
        setPostConent(res?.data?.article_content);
        setExcerpt(res?.data?.article_excerpt);
        setTempImg({ ...tempImg, article_main_thumb: res?.data?.article_main_thumb, article_thumb: res?.data?.article_thumb })
        // setImage({ ...image, article_main_thumb: res?.data?.article_main_thumb, article_thumb: res?.data?.article_thumb })

      }).catch((err) => {
        console.log("Blog data state err", err);


      })
    }
  }, [blogId]);




  useEffect(() => {
    props.getCategoriesData({ pageNo: 1, NoOfRecords: 10 })?.then((res) => {
      setCategoryState(res)

    }).catch((err) => {
      console.log(err)
    })
  }, [blogId]);

  console.log(props.categoriesData, '25655cate')




  // !blogId && dispatch(resetStates()); // TODO

  const handleEditorChange = (data) => {
    setPostConent(data);
  };

  const handleExcerpt = (data) => {
    setExcerpt(data);
  }

  const handleInput = (e) => {
    // console.log(e.target.name, e.target.value)
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  }

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setTempImg({ ...tempImg, [e.target.name]: event.target.result });
      };

      reader.readAsDataURL(file);

      setImage({ ...image, [e.target.name]: file })
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (blogData?.postTitle && postContent && image?.article_main_thumb && image?.article_thumb) {
      setLoader(true)
      props.createBlog({
        postContent,
        excerpt,
        blogData,
        image
      })?.then((res) => {
        toast.success('Form Submitted!');
        setLoader(false)
        setTimeout(() => {
          router.push(`/blog/dashboard/posts`);
        }, 2000)
      }).catch((err) => {
        toast.error(err.message);
        setLoader(false)

      });
    } else {
      toast.error("Please fill all fields!");
    }

  }


  const handleUpdatePost = (e) => {
    e.preventDefault();
    console.log("Form Data initial", {
      postContent,
      excerpt,
      blogData,
      image,
      blogId
    })
   
    props.updateBlog( 
      postContent,
      excerpt,
      blogData,
      image,
      blogId
    )?.then((res)=>{
      toast.success('Form Submitted!');
      setLoader(false)

      setTimeout(() => {
        router.push(`/blog/dashboard/posts`);
      }, 2000)
    }).catch((err)=>{
      toast.error(err.message);
      setLoader(false)
    })

  }

  const handleFeaturedImage = (e) => {
    e.preventDefault();

    setTempImg({ ...tempImg, [e.target.name]: null });
    setImage({ ...image, [e.target.name]: null })

  }

  console.log(blogData?.postCategory, "232323")

  return (
    <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
      <form className="grid md:grid-cols-2 gap-6" action="#" method="post">
        <label className="block md:col-span-2">
          <Label>Post Title *</Label>

          <Input
            type="text"
            className="mt-1"
            name="postTitle"
            data={blogData?.postTitle ? blogData?.postTitle : null}
            onChange={handleInput} />
        </label>
        <div className="block md:col-span-2">
          <Label>Post Excerpt</Label>

          <MyEditor data={excerpt} value={excerpt ? excerpt : ""} onChange={handleExcerpt} />

          {/* <Textarea className="mt-1" rows={4} /> */}
          <p className="mt-1 text-sm text-neutral-500">
            Brief description for your article. URLs are hyperlinked.
          </p>
        </div>
        <label className="block">
          <Label>Category</Label>
          <p></p>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={blogData?.postCategory ? blogData?.postCategory : "-1"}
            label="Age"
            fullWidth
            name="postCategory"
            onChange={handleInput}
          >
            {categoryState?.data.map((item) => {
              return (

                <MenuItem value={item?.id} key={item?.id}
                //  seleted={item?.id == blogData?.postCategory}
                > {item?.category_title}</MenuItem>
              )
            })}

          </Select>

        </label>
        <label className="block">
          <Label>Tags</Label>

          <Input type="text" className="mt-1" name="postTags" data={blogData?.postTags ? blogData?.postTags : null} onChange={handleInput} />
        </label>

        <div className="block md:col-span-2">
          <Label>Featured Image</Label>

          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-700 border-dashed rounded-md">
            {!(tempImg?.article_main_thumb) && <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-neutral-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <div className="flex flex-col sm:flex-row text-sm text-neutral-6000">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md font-medium text-primary-6000 hover:text-primary-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                >
                  <span className="text-blue-500" > Upload a file</span>
                  <input
                    id="file-upload"
                    name="article_main_thumb"
                    type="file"
                    className="sr-only"
                    onChange={handleImage}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-neutral-500">
                PNG, JPG, GIF up to 2MB
              </p>
            </div>}
            {(tempImg?.article_main_thumb) && (
              <img
                src={tempImg?.article_main_thumb && tempImg.article_main_thumb}
                alt="Article Main thumbnail"
                width={1635} />)}
          </div>
          {tempImg?.article_main_thumb && <div className="flex justify-end	">
            <button name="article_main_thumb" className="font-medium text-purple-900" onClick={handleFeaturedImage}>
              Change Image
            </button>
          </div>}
        </div>

        <div className="block md:col-span-2">
          <Label>Featured Thumb Image</Label>

          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-700 border-dashed rounded-md">
            {!(tempImg?.article_thumb) && <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-neutral-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <div className="flex flex-col sm:flex-row text-sm text-neutral-6000">
                <label
                  htmlFor="file-upload1"
                  className="relative cursor-pointer rounded-md font-medium text-primary-6000 hover:text-primary-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                >
                  <span className="text-blue-500" >Upload a file</span>
                  <input
                    id="file-upload1"
                    name="article_thumb"
                    type="file"
                    className="sr-only"
                    onChange={handleImage}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-neutral-500">
                PNG, JPG, GIF up to 2MB
              </p>
            </div>}

            {(tempImg?.article_thumb) && (
              <img
                src={tempImg?.article_thumb && tempImg.article_thumb}
                alt="Article thumbnail"
                width={500} />)}
          </div>

          {tempImg?.article_thumb && <div className="flex justify-end	">
            <button name="article_thumb" className="font-medium text-purple-900" onClick={handleFeaturedImage}>
              Change Image
            </button>
          </div>}
        </div>
        <div className="block md:col-span-2">
          <Label> Post Content</Label>

          <MyEditor data={postContent} value={postContent ? postContent : ""} onChange={handleEditorChange} />


        </div>

        {!blogId ? <ButtonPrimary disabled={loader} className="md:col-span-2 bg-blue-600 text-white" handleSubmit={handleSubmit}>


          {
            loader ? <CircularProgress size={20} style={{ color: "white" }} /> : "Submit post "
          }

        </ButtonPrimary> : <ButtonPrimary disabled={loader} className="md:col-span-2 bg-blue-600 text-white" handleSubmit={handleUpdatePost}>
          {
            loader ? <CircularProgress size={20} style={{ color: "white" }} /> : "Update post"
          }
        </ButtonPrimary>}
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  getBlogDetails: state.blogState.getBlogById,
  categoriesData: state.blogState.categoriesData,

});

export default connect(mapStateToProps,
  { getCategoriesData, getBlogById, updateBlog, createBlog }
)(DashboardSubmitPost);



