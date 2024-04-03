import React, { useState } from "react";
import styles from "../../styles/ManageAddress.module.css"
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import officeBuldingicon from "../../assets/officeBuldingicon.svg"
import homeAddressIcon from "../../assets/homeAddressIcon.svg"
import Dialog from "@mui/material/Dialog";
import DialogContent from '@mui/material/DialogContent';
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import { CircularProgress, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditAddress from "./EditAddress";
import { Editaddress } from "../../redux/actions/accountAction"
import { deleteAddressAction, fetchUserAddress } from "../../redux/actions/manageAddressAction"
import ContactsIcon from '@mui/icons-material/Contacts';
import InboxIcon from '@mui/icons-material/Inbox';
import { useSnackbar } from "notistack";
import Image from "next/legacy/image";

function Address(props) {
  const { setShowDialog, getadd, InitialLoader, serverError } = props
  const [DeleteConormDialog, setDeleteConormDialog] = useState(false);
  const [del_addid, setdel_addid] = useState();
  const [showEditDialog, setshowEditDialog] = useState(false);
  const [editData, seteditData] = useState({});
  const [addvar, setaddvar] = useState('')
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const Deleteaddress = () => {
    props.deleteAddressAction(del_addid).then((res) => {
      enqueueSnackbar("Address deleted succesfully", { variant: "success" });
      props.fetchUserAddress()
      setDeleteConormDialog(false)
    }).catch((err) => {
      console.log(err, "del_addid");
    })
  }
  const deleteHand = (Address_id) => {
    setdel_addid(Address_id)
    setDeleteConormDialog(true)
  }
  const editAddressHand = (editData) => {
    setshowEditDialog(true)
    seteditData(editData)
    props.Editaddress(editData);
  }
  return (
    <div className="container">

      <div className="row">
        <div className="d-flex py-2 align-items-center justify-content-between border shadow-sm mt-3 mb-0 col-12 col-sm-12 mx-auto bg">
          <div className={`pl-4 text-white lh-sm d-inline-block`}>
            <b>Manage Address</b>
          </div>
          <div className="mr-lg-5  d-none d-md-block">
            <Button
              onClick={() => setShowDialog(true)}
              onMouseEnter={() => {
                setaddvar("outlined")
              }}
              onMouseLeave={() => {
                setaddvar("")
              }}
              variant={addvar}
              style={{ color: '#fff', outline: "none", borderColor: '#fff', textTransform: 'capitalize' }}>
              <AddBoxOutlinedIcon /> Add New Address
            </Button>
          </div>
        </div>

        <div className="border shadow-sm col-12 col-sm-12 mx-auto bg-transparent">
          <div className="d-md-none d-flex justify-content-between">
            <div
              className="py-3 text-primary lh-sm "
              onClick={() => setShowDialog(true)}
              role="button"
            >
              <b className="" style={{ fontSize: "0.8rem" }}>
                <AddBoxOutlinedIcon /> Add New Address
              </b>
            </div>
          </div>
        </div>

        <span className=" px-0">
          {InitialLoader ?
            <div style={{ textAlign: "center", marginTop: "8rem" }} ><CircularProgress size={40} /></div>
            : serverError ? <div>
              <div style={{ textAlign: "center", padding: "2rem 0rem" }}>
                <InboxIcon style={{ fontSize: "5rem" }} />

                <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                  {" "}
                  Something Went Wrong!
                </div>
                <div style={{ fontSize: "0.9rem" }}>
                  {" "}
                  Seems to be network issue, Try Again
                </div>

                <div>
                  <Button
                    variant='contained'
                    color='primary'
                    style={{ width: "9rem", margin: "1rem 0rem" }}
                    onClick={() => { window.location.reload() }}>
                    {" "}
                    Reload
                  </Button>
                </div>
              </div>
            </div>
              :
              getadd.length ? (
                <div>
                  {getadd.sort(function (a, b) { return b.address_id - a.address_id }).map((data, index) => (
                    <div key={index} className="pt-3 px-3 border bg-white shadow-sm my-3">
                      <div className="text-center text-white btn rounded-pill bg col-lg-3 col-12 mx-auto ">
                        <span className="d-flex align-items-end justify-content-center">
                          <span className="mr-1">
                            {data.title == "Home" ?
                              <Image height={25} width={25} className=" " src={homeAddressIcon} alt="" />
                              :
                              <Image height={25} width={25} className=" " src={officeBuldingicon} alt="" />
                            }
                          </span>
                          <span style={{ fontSize: "1.1rem" }}>
                            {data.title}
                          </span>
                        </span>
                      </div>
                      <div className="pt-2 pl-3">
                        <span className={`${styles.text}`}>
                          <span style={{ color: "black" }}>{data.rec_name}</span> ({data.phone_no})
                        </span>
                        <br />
                        <span className={`${styles.text}`}>{data.address}</span>
                        <br />
                        <span className={`${styles.text}`}>{data.landmark} (landmark)</span>
                        <br />
                        <span className={`${styles.text}`}>{data.city_name}</span>
                        <br />
                        <span className={`${styles.text}`}>
                          {data.state_name} - {data.pincode}
                        </span>
                      </div>
                      <div className="d-flex justify-content-lg-end justify-content-around mr-5 pb-2">
                        <Button size="small" variant="outlined" style={{ outline: "none", textTransform: 'capitalize', marginRight: "0.5rem", fontSize: '0.8rem', padding: '0.3rem 0.6rem' }} className="text-primary mr-5" onClick={() => { editAddressHand(data) }}>
                          <BorderColorOutlinedIcon fontSize="small" /> Edit
                        </Button>
                        <Button size="small" variant="outlined" style={{ outline: "none", textTransform: 'capitalize', fontSize: '0.8rem', padding: '0.3rem 0.6rem' }} className="text-primary" onClick={() => { deleteHand(data.address_id) }}>
                          <DeleteOutlineOutlinedIcon fontSize="small" /> Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) :
                (<div style={{ textAlign: "center", margin: "2rem 0rem" }}>
                  <div>

                    <ContactsIcon
                      style={{ fontSize: "3rem", margin: "1rem 0rem" }}
                    />
                  </div>
                  <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                    No Addresses found in your account!
                  </div>
                  <div style={{ fontSize: "0.8rem" }}>
                    Add a delivery address.
                  </div>
                </div>
                )}

        </span>

      </div>

      {/* Delete Alert Dialog */}
      <Dialog
        open={DeleteConormDialog}
        onClose={() => { setDeleteConormDialog(false) }}
      >
        <DialogContent>
          Are you sure to delete this Address
          <div className={`${styles.btnDiv}`} >
            <Button
              onClick={() => { Deleteaddress() }}
              variant='contained'
              color='primary'
              size="small"
              style={{ marginRight: "0.7rem", textTransform: 'capitalize' }}>
              {" "}
              Yes
            </Button>
            <Button
              onClick={() => { setDeleteConormDialog(false) }}
              variant='outlined'
              size="small"
              style={{ textTransform: 'capitalize' }}
              color='primary'>
              No
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* Edit Dialog Form */}
      <Dialog open={showEditDialog} onClose={() => setshowEditDialog(false)}>
        <IconButton
          aria-label="close"
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          style={{ outline: "none" }}
        >
          <CloseIcon color="#000" style={{ color: '#000', zIndex: 100 }}

            onClick={() => { setshowEditDialog(false) }}
          />
        </IconButton>
        <EditAddress CloseEditAddress={setshowEditDialog} uaddress={editData} />
      </Dialog>
      <style jsx>
        {`

        `}
      </style>
    </div>
  );
}

// export default Address;
const mapStateToProps = (state) => {
  return {
    getadd: state.accountR.getadd
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteAddressAction: (addres_id) => dispatch(deleteAddressAction(addres_id)),
    fetchUserAddress: () => dispatch(fetchUserAddress()),
    Editaddress: (data) => dispatch(Editaddress(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Address);