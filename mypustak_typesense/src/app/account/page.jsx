import dynamic from "next/dynamic";
const NoSSRComponentAcount = dynamic(() => import("../../components/user/Acount"), { ssr: false });
function Page() {
    return (
        <NoSSRComponentAcount />
    );
}
export default Page;