"use client"
// import { getUserById, getUser } from "@/Redux/Features/User/getUserDataSlice";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Input from "@/components/Input/Input";
import Label from "@/components/Label/Label";
import { connect, useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
// import { helpers } from "@/helper/helpers";
import { getUserData } from "@/redux/actions/blogAction"
const DashboardEditProfile = (props) => {
  const [userDetails, setUserDetails] = useState({})
  const [email, setEmail] = useState("")
  const [fname, setFname] = useState("")
  const [Lname, setLname] = useState("")

  const dispatch = useDispatch();

  useEffect( () => {
  props.getUserData()?.then((res)=>{
      console.log(res,"res11");
    setUserDetails(res)
   setEmail(res?.email)
       setFname(res?.name)
  }).catch((err)=>{
   console.log(err,"err");
  })

}, []);



  return (
    <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
      <form className="grid md:grid-cols-2 gap-6" action="#" method="post">
        <label className="block">
          <Label>First name</Label>
          <Input type="text" className="mt-1" value={fname ? fname : ""} />
        </label>
        <label className="block">
          <Label>Last name</Label>
          <Input type="text" className="mt-1" value={Lname ? Lname : ""} />
        </label>
        {/* <label className="block">
          <Label>Current password</Label>
          <Input placeholder="***" type="password" className="mt-1" />
        </label>
        <label className="block">
          <Label>New password</Label>
          <Input type="password" className="mt-1" />
        </label> */}
        <label className="block md:col-span-2">
          <Label> Email address</Label>
          <Input
            type="email"
            placeholder="example@example.com"
            className="mt-1"
            value={email ? email : ""}
          />
        </label>
        <ButtonPrimary className="md:col-span-2" type="submit">
          Update profile
        </ButtonPrimary>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  // userComponentStatus: state.accountR.userComponentStatus,
  // postByUser: state.blogState.getPostByUser,

});

export default connect(mapStateToProps,
  {  getUserData}
)(DashboardEditProfile);
