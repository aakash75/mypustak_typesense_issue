import dynamic from "next/dynamic";
const NoSSRComponentthanku = dynamic(() => import("../../../components/donate-books/thank-you"), {
  ssr: false,
});
function Page() {
  return <NoSSRComponentthanku />;
}
export default Page;
