"use client";
import React, { useState } from "react";
import ButtonCircle from "@/components/Button/ButtonCircle";
import rightImg from "@/images/SVG-subcribe2.png";
import Badge from "@/components/Badge/Badge";
import Input from "@/components/Input/Input";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { subscribeLetter } from "../../redux/actions/blogAction";
// import { joinNewsLetter } from "@/Redux/Features/Subscribe/NewLetterSlice";

const SectionSubscribe2 = (props) => {
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.includes("@") && email.includes(".com")) {
      // console.log(email, "email");
      setLoader(true);
      props.subscribeLetter({ email }).then((res) => {
        // alert("done");
        setLoader(false);
        // console.log(res, "response");
        toast.success(res.message);
      });
    } else {
      setLoader(false);

      toast.error("Please enter your valid email!");
    }
  };

  return (
    <div
      className={`nc-SectionSubscribe2 relative flex flex-col lg:flex-row items-center `}
    >
      <div className="flex-shrink-0 mb-14 lg:mb-0 lg:me-10 lg:w-2/5">
        <h2 className="font-semibold text-4xl">
          Get Best Books recommendation 🎉
        </h2>
        <span className="block mt-6 text-neutral-500 dark:text-neutral-400">
          Read and share new perspectives on just about any topic. Everyone’s
          welcome.
        </span>
        <ul className="space-y-5 mt-10">
          <li className="flex items-center space-x-4 rtl:space-x-reverse">
            <Badge name="01" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Get more discount
            </span>
          </li>
          {/* <li className="flex items-center space-x-4 rtl:space-x-reverse">
            <Badge color="red" name="02" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Get premium magazines
            </span>
          </li> */}
        </ul>
        <form className="mt-10 relative max-w-sm border-2 rounded-full">
          <Input
            required
            aria-required
            placeholder="Enter your email"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value.trim())}
          />

          <ButtonCircle
            type="submit"
            handleSubmit={handleSubmit}
            disabled={loader}
            className="absolute transform top-1/2 -translate-y-1/2 end-1 dark:bg-neutral-300 dark:text-black"
          >
            <ArrowRightIcon className="w-5 h-5 rtl:rotate-180" />
          </ButtonCircle>
        </form>
      </div>
      <div className="flex-grow">
        <Image
          alt="subsc"
          sizes="(max-width: 768px) 100vw, 50vw"
          src={rightImg}
        />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  // blogState: state.blogState.getActiveBlogs,
});

export default connect(mapStateToProps, {
  subscribeLetter,
})(SectionSubscribe2);
