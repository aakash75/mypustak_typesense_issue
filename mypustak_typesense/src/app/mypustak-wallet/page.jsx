
import dynamic from "next/dynamic";
const Mywallet = dynamic(() => import("../../components/wallet/Mywallet"), { ssr: false });
const MywalletBanner = dynamic(() => import("../../components/wallet/MywalletBanner"), { ssr: false });
function Page() {
    return (
        <div >
            <Mywallet />
            <MywalletBanner />
        </div>
    );
}
export default Page;