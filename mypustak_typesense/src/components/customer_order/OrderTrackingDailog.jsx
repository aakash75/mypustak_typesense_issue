import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

const OrderTrackingDailog = ({ message, show, handlecloseDialog }) => {
  return (
    <Dialog
      open={show}
      onClose={handlecloseDialog}
      aria-labelledby='form-dialog-title'
      size='sm'>
      <DialogContent>
        <p
          style={{
            textAlign: "center",
            fontWeight: "bold",
          }}>{`${message} !`}</p>
        <p>
          Tracking Details Will Be Updated Once Your order Will be Dispatched{" "}
        </p>
        <div style={{ fontSize: "0.7rem" }}>
          <span style={{ textAlign: "center" }}>
            {`For Further Query, Kindly  Call Or WhatsApp Us   `}
            <span style={{ color: "green", fontWeight: "bold" }}>
              033-418-04333{" "}
            </span>
          </span>
          <span style={{ textAlign: "center" }}>
            ( Timing : 9:30 AM TO 6:00 PM)
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default OrderTrackingDailog;
