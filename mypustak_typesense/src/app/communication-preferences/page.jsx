import dynamic from "next/dynamic";
const NoSSRComponentCommunicationPreferences = dynamic(() => import("../../components/user/communicationPreferences"), { ssr: false });
function Page() {
    return (
        <NoSSRComponentCommunicationPreferences />
    );
}
export default Page;