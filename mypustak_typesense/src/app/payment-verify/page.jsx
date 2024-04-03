import dynamic from "next/dynamic";
const NoSSRComponent = dynamic(() => import("../../components/payment/Paymentverify"), { ssr: false, });
function Page() {
  return <NoSSRComponent />;
}

export default Page;
