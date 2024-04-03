"use client"
import React, { useEffect, useState } from "react";
import Input from "@/components/Input/Input";
import { connect, useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";

import { ToastContainer, toast } from 'react-toastify';
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Label from "@/components/Label/Label";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';
// import { updateCategory } from "@/Redux/Features/Category/UpdateCategorySlice";
import {createCategory,updateCategory } from "../../redux/actions/blogAction"

import dynamic from 'next/dynamic'

// using this dynamic import, window is not defined
// const MyEditor = dynamic(() => import('@/components/MyEditor'), {
//     ssr: false
// })

const DashboardAddCategory = (props) => {
    console.log(props?.categoryDetails?.category_rank

        , "202200");
    const [loader, setLoader] = useState(false)
    const router = useRouter();
    const searchParama = useSearchParams();
    const categoryId = parseInt(props?.categoryDetails.id)
    const [tempImg, setTempImg] = useState({
        category_main_thumb: props?.categoryDetails?.category_image,
        category_thumb: props?.categoryDetails?.category_thumb,
    });
    const [image, setImage] = useState({
        category_main_thumb: props?.categoryDetails?.category_image,
        category_thumb: props?.categoryDetails?.category_thumb
    });

    const dispatch = useDispatch();



    const [categoryData, setcategoryData] = useState({
        postTitle: props?.categoryDetails?.category_title,
        categoryRank: props?.categoryDetails?.category_rank,
        category_status: props?.categoryDetails?.category_status,
    })




    const handleInput = (e) => {
        console.log(e.target.name, e.target.value)
        setcategoryData({ ...categoryData, [e?.target?.name]: e?.target?.value });
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
        if (categoryData?.postTitle && image?.category_main_thumb && image?.category_thumb) {
            props.createCategory(categoryData,image).then((res)=>{
                console.log(res, "25522");
                if (res?.status == 200) {
                    toast.success('Category Created!');
                  

                    setcategoryData({
                        postTitle: null,
                        categoryRank: null,
                    })
                    setImage({
                        category_main_thumb: "",
                        category_thumb: ""
                    })
                    setTempImg({
                        category_main_thumb: "",
                        category_thumb: ""
                    })
                    window.location.reload()


                    // props.setCategoryPopup(false)
                } else {
                    toast.error("Category name already present",);
                }

                console.log(res.status, "25522");
                setLoader(false)

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

        console.log("initial", {
            categoryData,
            image,
            categoryId
        })
        if (categoryData?.postTitle && image?.category_main_thumb && image?.category_thumb) {
            props.updateCategory( categoryData,image,categoryId).then((res)=>{
                     setLoader(false)
                console.log(res, "225665");
                if (res.status == 200) {
                    toast.success('Post Updated');
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000)
                } else {
                    toast.error("Something Went Wrong");
                }
            }).catch((err) => {
                toast.error(err.message);
                setLoader(false)

            });
          
        } else {
            toast.error("Please fill all fields!");
        }


    }

    const handleCategoryImage = (e) => {
        e.preventDefault();
        // console.log('Featured', e.target.name)
        setTempImg({ ...tempImg, [e?.target?.name]: null });
        setImage({ ...image, [e?.target?.name]: null })

    }
    function isInteger(value) {
        return Number.isInteger(value);
    }
    return (
        <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
            <form className="grid md:grid-cols-2 gap-6" action="#" method="post">
                <label className="block md:col-span-2">
                    <Label>Category Title *</Label>

                    <Input
                        type="text"
                        className="mt-1"
                        name="postTitle"
                        required
                        data={categoryData?.postTitle ? categoryData?.postTitle : null}
                        onChange={handleInput} />
                </label>
                <label className="block md:col-span-2">
                    <Label>Category Rank(Optional) </Label>

                    <Input
                        type="number"
                        className="mt-1 [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]"
                       
                        name="categoryRank"
                        placeholder="Enter number only"
                        data={categoryData?.categoryRank == 0 || categoryData?.categoryRank
                            ? categoryData?.categoryRank
                            : null}
                        onChange={handleInput} />
                </label>




                <div className="block md:col-span-2">
                    <Label>Category  Image</Label>

                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-700 border-dashed rounded-md">
                        {!(tempImg?.category_main_thumb) && <div className="space-y-1 text-center">
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
                                    <span className="text-blue-500">Upload a file</span>
                                    <input
                                        id="file-upload"
                                        name="category_main_thumb"
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
                        {(tempImg?.category_main_thumb) && (
                            <img
                                src={tempImg?.category_main_thumb && tempImg.category_main_thumb}
                                alt="Article Main thumbnail"
                                width={1635} />)}
                    </div>
                    {tempImg?.category_main_thumb && <div className="flex justify-end	">
                        <button name="category_main_thumb" className="font-medium text-purple-900" onClick={handleCategoryImage}>
                            Change Image
                        </button>
                    </div>}
                </div>

                <div className="block md:col-span-2">
                    <Label>Category Thumb Image</Label>

                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-700 border-dashed rounded-md">
                        {!(tempImg?.category_thumb) && <div className="space-y-1 text-center">
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
                                    <span className="text-blue-500">Upload a file</span>
                                    <input
                                        id="file-upload1"
                                        name="category_thumb"
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

                        {(tempImg?.category_thumb) && (
                            <img
                                src={tempImg?.category_thumb && tempImg.category_thumb}
                                alt="Article thumbnail"
                                width={500} />)}
                    </div>

                    {tempImg?.category_thumb && <div className="flex justify-end	">
                        <button name="category_thumb" className="font-medium text-purple-900" onClick={handleCategoryImage}>
                            Change Image
                        </button>
                    </div>}
                </div>


                <ButtonPrimary disabled={loader} className="md:col-span-2" handleSubmit={categoryId ? handleUpdatePost : handleSubmit}>


                    {
                        loader ? <CircularProgress size={20} style={{ color: "white" }} /> : categoryId ? "Update Now" : " Add Category"
                    }

                </ButtonPrimary>
            </form>
        </div>
    );
};
const mapStateToProps = state => ({

    // categoryState: state.blogState.categoriesData,

});

export default connect(mapStateToProps,
    { createCategory,updateCategory}
)(DashboardAddCategory);


