import React from "react";
import dynamic from "next/dynamic";
const NoSSRComponentPassbook = dynamic(() => import("../../../components/passbook/Passbook"), { ssr: false, });

export default function Page() {
  return (
    <div>
      <NoSSRComponentPassbook />
    </div>
  );
}
