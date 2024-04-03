import dynamic from "next/dynamic";
const NoSSRComponent_login = dynamic(
  () => import('./Login'),
  {
    ssr: false
  }
);
function index() {
  return (

      <NoSSRComponent_login />

  );
}
export default index;