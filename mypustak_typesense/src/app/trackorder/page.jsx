import dynamic from "next/dynamic";
const NoSSRComponent = dynamic(() => import("../../components/trackorder/TrackOrder"), { ssr: false });
function Page() {
  return (
    <NoSSRComponent />

  );
}
export default Page;