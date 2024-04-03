"use client"

import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from "react-redux";
import CardCategory2 from "@/components/CardCategory2/CardCategory2";
import PaginationNew from "@/components/Pagination/PaginationNew";
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import NcImage from "@/components/NcImage/NcImage";
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import DashboardAddCategory from "../AddCategory/DashboardAddCategory"
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import { getCategoriesData ,updateCategory_status} from "../../redux/actions/blogAction"

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
const DashboardViewCategory = (props) => {
   
    const [page, setPage] = useState(1)
    const [loader,setLoader] = useState(true)
    const searchParama = useSearchParams();
   
    const  [categoryId,setCategoryId]=useState(null)
    const [deleteCategoryPopup, setDeleteCategoryPopup] = React.useState(false);
    const [categoryPopup, setCategoryPopup] = React.useState(false);
    const [categoryDetails, setCategoryDetails]=useState({})
    const handleClickOpen = (item) => {
        setCategoryPopup(true);
        if (item){
            setCategoryDetails(item)
            setCategoryId(item?.id)
        }
        else{
            setCategoryDetails({})
        }
    };
    const handleClose = () => {
        setCategoryPopup(false);
        window.history.replaceState(null, null, '/blog/dashboard/view-category');

    };
    const dispatch = useDispatch();
    const pageChange = (pageNo) => {
        setPage(pageNo)
    }
    useEffect(() => {
        props.getCategoriesData({ pageNo: page, NoOfRecords: 10 })?.then((res)=>{
    setLoader(false)
        }).catch((err)=>{
             setLoader(false)  
        })
       
   
      
            // window.scrollTo(100,100)
    }, [page]);

     console.log(props.categoryState
            , "225220");
  
    const handleDeleteCategory= (id) => {
     setDeleteCategoryPopup(false)
        props.updateCategory_status(id).then((res)=>{
            
            console.log(res,"2222525");
           
            if(res.status==200){
                toast.success('Category Deleted');
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            }else{
                toast.error("Something Went Wrong ! Please Try Again");

            }

        }).catch((err) => {
            toast.error(err.message);
        });
       setCategoryId(null)

    }
 const  onHandleDeleteCategory=(id)=>{
  setDeleteCategoryPopup(true)
  setCategoryId(id)
  }
    return (
        <div>
  
            <div className="flex flex-col space-y-10">
                <div style={{ display: "flex", justifyContent: "end" }}  ><ButtonPrimary  >
                    <span onClick={() => handleClickOpen()}>
                    
                        Add Category
                    </span>
                </ButtonPrimary></div>

                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full px-1 sm:px-6 lg:px-18">
                        <div className="shadow dark:border dark:border-neutral-800 overflow-hidden sm:rounded-lg">

                            <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
                                <thead className="bg-neutral-50 dark:bg-neutral-800">
                                    <tr className="text-start text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                                        <th scope="col" className="px-6 py-3">
                                            Category
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Rank
                                        </th>

                                        <th scope="col" className="relative px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                {
                                    props?.categoryState?.data && <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800">
                                        {props?.categoryState?.
                                        data?.map((item) => (
                                                <tr key={item?.id}>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center w-96 lg:w-auto max-w-md overflow-hidden">
                                                            <NcImage
                                                                containerClassName="flex-shrink-0 h-12 w-12 rounded-lg relative z-0 overflow-hidden lg:h-14 lg:w-14"
                                                                src={item?.category_image}
                                                                fill
                                                                   placeholder="blur"
   blurDataURL={item?.category_image}
                                                                sizes="90px"
                                                                alt="post"
                                                            />
                                                            <div className="ms-4 flex-grow">
                                                                <h2 className="inline-flex line-clamp-2 text-sm font-semibold  dark:text-neutral-300">
                                                                    {item?.
                                                                        category_title
                                                                    }
                                                                </h2>

                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="px-2 inline-flex text-sm text-neutral-500 dark:text-neutral-400 rounded-full">
                                                            <span style={{ fontWeight: "500", color: "orange" }}>{
                                                                item?.category_status} </span>

                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                                                        <span> {item?.category_rank
                                                        }</span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-neutral-300">
                                                        <button onClick={()=>handleClickOpen(item)} className="text-blue-800 dark:text-primary-500 hover:text-primary-900">
                                                          
                                                                Edit

                                                     </button>

                                                        {` | `}


                                                        <button
                                                            onClick={() =>onHandleDeleteCategory(item?.id)}
                                                            className="text-rose-600 hover:text-rose-900"
                                                        >
                                                           
                                                             Delete
                                                        </button>

                                                    </td>

                                                </tr>
                                            ))}
                                    </tbody>
                                }
                            
                                {
                             
                                    loader && <tr style={{ textAlign: "center", margin: "auto", width: "90vw", height: "70vh" }}>
                                        <td colSpan={5}>
                                           <h3 className="font-bold" >Loading...</h3>

                                        </td>
                                    </tr>
                                }
                           

                            </table>
                        </div>
                    </div>
                </div>
           
             
                {
                    props?.categoryState?.total_data_count <1 ?  <h1 > No data found</h1>:""
              }


            </div>
            {/* Pagination  */}
            <div className="flex flex-col mt-6 lg:mt-6 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-center sm:items-center">
                <div >
                    {
                        props?.categoryState?.total_data_count > 10 && <PaginationNew totalItems={props?.categoryState?.total_data_count} itemsPerPage={10} onclick={pageChange} />

                    }
                </div>
            </div>
   {/* Category  Dialog  */}
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={categoryPopup}
                maxWidth="sm"
                fullWidth
                // sx={{maxWidth:'sm'}}
          
                
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Category Details
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
              
                    <DashboardAddCategory 
                        categoryDetails={ categoryDetails} 
                        categoryId={categoryId}
                    />
                 
                </DialogContent>
           
            </BootstrapDialog>
            {/* Category  Dialog  */}

            {/* Delete Category  Dialog  */}
            <BootstrapDialog
                // onClose={()=>setDeleteCategoryPopup(false)}
                aria-labelledby="customized-dialog-title"
                open={deleteCategoryPopup}
                maxWidth="xs"
                fullWidth

                // sx={{ maxWidth: 'sm' }}


            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Confirmation Message
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={()=>setDeleteCategoryPopup(false)}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent >

                    <h1>Are you sure you want to delete</h1>

                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' color='primary' sx={{ textTransform:"capitalize"}} onClick={() => setDeleteCategoryPopup(false)} >
                        No 
                    </Button> 
                    <Button variant='outlined' color='info' sx={{ textTransform:"capitalize"}} onClick={() => {
                   
                        handleDeleteCategory(categoryId)
                     }}>
                        Yes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
            {/* Delete Category  Dialog  */}
       
           </div>
    )
}

const mapStateToProps = state => ({

    categoryState: state.blogState.categoriesData,

});

export default connect(mapStateToProps,
    { getCategoriesData,updateCategory_status}
)(DashboardViewCategory);
