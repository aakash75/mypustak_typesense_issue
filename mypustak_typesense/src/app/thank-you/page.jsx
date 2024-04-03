import dynamic from "next/dynamic";
const NoSSRComponentThankyou = dynamic(() => import("../../components/thankyou/Thankyous2"), { ssr: false, });
function Page() {
  return <NoSSRComponentThankyou />;
}

export default Page;
