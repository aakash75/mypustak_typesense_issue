import dynamic from "next/dynamic";
const NoSSRComponentofferpage = dynamic(() => import("../../components/offerpage/offerpage"), { ssr: false });
function Page() {
  return (
    <NoSSRComponentofferpage />
  );
}
export default Page;