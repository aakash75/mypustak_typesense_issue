import React, { useEffect, useRef, useState } from "react";
import NcModal from "@/components/NcModal/NcModal";
import Textarea from "@/components/Textarea/Textarea";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import ButtonThird from "../Button/ButtonThird";
import { RadioGroup } from "@/app/headlessui";
import twFocusClass from "@/utils/twFocusClass";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getBlogDetails,reportAbuse } from "../../redux/actions/blogAction";
import { useRouter, useParams } from "next/navigation";
import { connect, useDispatch, useSelector } from "react-redux";


const problemPlansDemo = [
  { name: "Conflict", id: "Conflict", label: "Conflict" },
  { name: "Trouble", id: "Trouble", label: "Trouble" },
  { name: "Spam", id: "Spam", label: "Spam" },
  { name: "Other", id: "Other", label: "Other" },
];

const ModalReportItem = ({ problemPlans = problemPlansDemo, show, onCloseModalReportItem ,getBlogDetails,blogState,reportAbuse}) => {
  const textareaRef = useRef(null);

  const [problemSelected, setProblemSelected] = useState(problemPlans[0]);


 
  const router = useRouter();
  const param = useParams();

  const slug = param.slug;

  useEffect(() => {
    getBlogDetails(slug);
  }, [slug]);
  useEffect(() => {
    if (show) {
      setTimeout(() => {
        const element = textareaRef.current;
        if (element) {
          element.focus();
        }
      }, 400);
    }
  }, [show]);
  console.log("state:", blogState?.data?.article_category_id);
  const handleClickSubmitForm = (e) => {
    e.preventDefault();
    const reportMsg = textareaRef.current;

    if (reportMsg.value && problemSelected.name) {
     reportAbuse({ reportMsg: reportMsg.value, problem: problemSelected.name, id: blogState?.data?.article_category_id})
      ?.then((res) => {
    
        toast.success(res.message);
        setTimeout(() => {
          onCloseModalReportItem();
        }, 1000)
      }).catch((err) => {
        toast.error(err.message);
      });
    } else {
      toast.error("Please fill in all the fields!");
    }
  };

  const renderCheckIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const renderContent = () => (
    <form action="#">
      {/* RADIO PROBLEM PLANS */}
      <RadioGroup value={problemSelected} onChange={setProblemSelected}>
        <RadioGroup.Label className="sr-only">Problem Plans</RadioGroup.Label>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {problemPlans.map((plan) => (
            <RadioGroup.Option
              key={plan.name}
              value={plan}
              className={({ checked }) => (
                `${checked
                  ? " bg-blue-600 text-white dark:bg-primary-700"
                  : "bg-white border-t border-neutral-50 "
                } relative shadow-lg rounded-lg px-3 py-3 cursor-pointer flex sm:px-5 sm:py-4 focus:outline-none ` +
                twFocusClass(true)
              )}
            >
              {({ checked }) => (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <div className="text-sm">
                      <RadioGroup.Label
                        as="p"
                        className={`font-medium line-clamp-1 ${checked ? "text-white " : "text-neutral-900"
                          }`}
                      >
                        {plan.label}
                      </RadioGroup.Label>
                    </div>
                  </div>
                  {checked && (
                    <div className="flex-shrink-0 text-white">
                      {renderCheckIcon()}
                    </div>
                  )}
                </div>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>

      {/* TEXAREA MESSAGER */}
      <div className="mt-4">
        <h4 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200">
          Message
        </h4>
        <span className="text-sm text-neutral-6000 dark:text-neutral-400">
          Please provide any additional information or context that will help
          us understand and handle the situation.
        </span>
        <Textarea
          placeholder="..."
          className="mt-3 border-2"
          ref={textareaRef}
          required={true}
          rows={4}
          id="report-message"
        />
      </div>

      <div className="mt-4 space-x-3 rtl:space-x-reverse">
        <ButtonPrimary handleSubmit={handleClickSubmitForm} type="submit" className=" border-5 bg-blue-600 text-white" >
          Submit
        </ButtonPrimary>
        <ButtonThird type="button" handleSubmit={onCloseModalReportItem} className="border-5 bg-blue-100 text-rose-600">
          Cancel
        </ButtonThird>
      </div>
    </form>
  );

  const renderTrigger = () => null;

  return (
    <NcModal
      isOpenProp={show}
      onCloseModal={onCloseModalReportItem}
      contentExtraClass="max-w-screen-md"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle="Report Abuse"
    />
  );
};

const mapStateToProps = (state) => ({
  blogState: state.blogState.blogDetalis,
});

export default connect(mapStateToProps, {
  getBlogDetails,reportAbuse
})(ModalReportItem);

