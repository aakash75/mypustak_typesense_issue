import dynamic from "next/dynamic";
const NoSSRComponent = dynamic(() => import("../../components/payment/paymentconfirmation"), { ssr: false, });
function Page() {
  return <NoSSRComponent />;
}

export default Page;
