"use client"

import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import NcImage from "@/components/NcImage/NcImage";
import Pagination from "@/components/Pagination/Pagination";
import PaginationNew from "@/components/Pagination/PaginationNew";
import { ToastContainer, toast } from "react-toastify";
const moment = require('moment');
import { getPostByUser, deleteBlogById, updateBlogById } from "@/redux/actions/blogAction"

import CustomModal from "@/components/CustomModal/CustomModal"
import { useRouter } from "next/navigation";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
const DashboardPosts = (props) => {
  const [pageNo, setPageNo] = useState(1)
  const dispatch = useDispatch();
  const [deletePopup, setDeletePopup] = useState(false)
  const [postDetails, setPostDetails] = useState({})
  const router = useRouter()
  const [dataLoader, setDataLoader] = useState(true)


  const [email, setEmail] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loader, setLoader] = useState(false)
  const openModal = () => {
    setModalIsOpen(true);
  };
  console.log(props.postByUser, "1111")
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleConfirm = () => {
    closeModal();
  };

  useEffect(() => {
    props.getPostByUser({ page: pageNo, row: 10 })?.then((res) => {
      setDataLoader(false)
    })?.catch((err) => {
      console.log(err)
    })
    window.scrollTo(100, 100);

  }, [pageNo]);
  const handleDeletePopup = (item) => {
    setDeletePopup(true)
    setPostDetails(item)
  }
  const handleDeletePost = () => {

    // openModal();
    props.deleteBlogById(postDetails?.id)
      ?.then((res) => {
        setDeletePopup(false)
        window.location.reload()
        toast.success('Form Submitted!');
      }).catch((err) => {
        toast.error(`"Something Went Wrong${err.message}`);
      })
  }



  const handleUpdatePost = (blogId, status) => {
    const article_status = status

    props.updateBlogById(article_status, blogId).then((res) => {
      if (res.status == 200) {
        toast.success('Form Submitted!');
        window.location.reload()
      } else {
        toast.error("Something Went Wrong ! Please Try Again");
      }
      console.log(res.status, "5544")

    }).catch((err) => {
      toast.error(`"Something Went Wrong${err.message}`);
    })
    // setLoader(true)
    // props.getPostByUser({ page: pageNo, row: 10 })


  }

  const onhandle = (page) => {
    setPageNo(page)
  }



  return (
    <div className="flex flex-col space-y-8">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full px-1 sm:px-6 lg:px-8">
          <div className="shadow dark:border dark:border-neutral-800 overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
              <thead className="bg-neutral-50 dark:bg-neutral-800">
                <tr className="text-start text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                  <th scope="col" className="px-6 py-3">
                    Article
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Payment
                  </th>

                  <th scope="col" className="relative px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              {/* {
                dataLoader && <h3 className="font-bold" >Loading...</h3>
              } */}
              {
                props?.postByUser?.isLoading && <tr style={{ textAlign: "center", margin: "auto", width: "90vw", height: "70vh" }}>
                  <td colSpan={5}>
                    <h3 className="font-bold" >Loading...</h3>

                  </td>
                </tr>
              }


              <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800">
                {props?.postByUser?.data.map((item) => (
                  <tr key={item?.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center w-96 lg:w-auto max-w-md overflow-hidden">
                        <NcImage
                          containerClassName="flex-shrink-0 h-12 w-12 rounded-lg relative z-0 overflow-hidden lg:h-14 lg:w-14"
                          src={item?.article_thumb}
                          fill
                             placeholder="blur"
   blurDataURL={item?.article_thumb}
                          sizes="90px"
                          alt="post"
                        />
                        <div className="ms-4 flex-grow">
                          <h2 className="inline-flex line-clamp-2 text-sm font-semibold  dark:text-neutral-300">
                            {item?.article_title}
                          </h2>
                          <div className=" inline-flex text-xs text-neutral-500 dark:text-neutral-400 rounded-full">
                            {item?.is_admin ? item.i_by : null}
                          </div>
                          <h2 className=" text-xs text-neutral-500 dark:text-neutral-400 rounded-full">
                            {/* {item?.article_title} */}
                            <div>Created Date: {moment(item.i_date * 1000).format('DD-MM-YYYY hh:mm a')} </div>
                            {item.u_by == null ? " " : <span>  Last Updated on: {moment(item.u_date * 1000).format('DD-MM-YYYY hh:mm a')}</span>}
                          </h2>
                        </div>
                      </div>
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                        {item?.article_status !== 0 ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-teal-100 text-teal-900 lg:text-sm">
                            Active
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-sm text-neutral-500 dark:text-neutral-400 rounded-full">
                            Deactive
                          </span>
                        )}
                      </td> */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-sm text-neutral-500 dark:text-neutral-400 rounded-full">
                        <span style={{ fontWeight: "500", color: "orange" }}> {item?.article_status == 0 ? "Inactive" : ""}</span>
                        <span style={{ fontWeight: "500", color: "green" }}>      {item?.article_status == 1 ? "Active" : ""}</span>
                        <span style={{ fontWeight: "500", color: "red" }}> {item?.article_status == 2 ? "Deleted" : ""}</span>

                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                      <span> {"Not Applicable"}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-neutral-300">

                      {
                        item?.article_status == 2 ? <span className="cursor-not-allowed">
                          Edit
                        </span> : <Link
                          href={{ pathname: `/blog/dashboard/submit-post`, query: { id: item?.id } }}
                          className="text-blue-800 dark:text-primary-500 hover:text-primary-900"

                        >
                          Edit
                        </Link>
                      }


                      {` | `}
                      <Link
                        // href={{ pathname: "/this-is-single-slug", query: { slug: item?.article_slug } }}
                        href={`/blog/preview/${item?.slug}`}
                        target="_blank"

                        className="text-blue-800 dark:text-primary-500 hover:text-primary-1000"
                      >
                        View
                      </Link>
                      {` | `}
                      {
                        item?.article_status == 2 ? <span className="cursor-not-allowed"> Delete</span> : <button
                          onClick={() => handleDeletePopup(item)}
                          disabled={item?.article_status == 2 ? true : false}
                          className="text-rose-600 hover:text-rose-900  "
                        >

                          Delete
                        </button>
                      }

                      {item?.is_admin ? <span>
                        &nbsp;| &nbsp;
                        {item?.article_status == 0 ?
                          <button
                            onClick={() => handleUpdatePost(item?.id, 1)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Activate
                          </button> : null}

                        {item?.article_status == 1 ?
                          <button
                            onClick={() => handleUpdatePost(item?.id, 0)}
                            className="text-rose-600 hover:text-rose-900"
                          >
                            Deactivate
                          </button> : null}

                      </span> : null}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <CustomModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        onConfirm={handleConfirm}

      />


      {
        props?.postByUser?.
          total_data_count > 10 && <PaginationNew onclick={onhandle} totalItems={props?.postByUser?.
            total_data_count}
            itemsPerPage={10} />
      }
      {
        props?.postByUser?.
          total_data_count < 1 ? <h1 > No data found</h1> : ""
      }
      {/* Delete post  Dialog  */}
      <BootstrapDialog
        // onClose={()=>setDeleteCategoryPopup(false)}
        aria-labelledby="customized-dialog-title"
        open={deletePopup}
        maxWidth="xs"
        fullWidth

      // sx={{ maxWidth: 'sm' }}


      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Confirmation Message
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setDeletePopup(false)}
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
          <Button variant='outlined' color='primary' sx={{ textTransform: "capitalize" }} onClick={() => setDeletePopup(false)} >
            No
          </Button>
          <Button variant='outlined' color='info' sx={{ textTransform: "capitalize" }} onClick={() => {

            handleDeletePost()
          }}>
            Yes
          </Button>
        </DialogActions>
      </BootstrapDialog>
      {/* Delete post  Dialog  */}


    </div>
  );
};

const mapStateToProps = state => ({
  // userComponentStatus: state.accountR.userComponentStatus,
  postByUser: state.blogState.getPostByUser,

});

export default connect(mapStateToProps,
  { getPostByUser, deleteBlogById, updateBlogById }
)(DashboardPosts);
