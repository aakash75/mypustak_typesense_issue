import dynamic from "next/dynamic";
const NoSSRComponentBulkOredr = dynamic(() => import("../../components/bulkorder/bulkorder"), { ssr: false });
function Page() {
    return (
        <NoSSRComponentBulkOredr />
    );
}
export default Page;