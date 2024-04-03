import { NoSsr } from "@mui/material";
import DonationForm from "../../../components/donation_form/DonationForm";
function Page() {
  return (
    <div>
      <NoSsr>
        <DonationForm />
      </NoSsr>
    </div>
  );
}

export default Page;
