import { Button } from "@mui/material";
import React, { useState } from "react";
import { useRange } from "react-instantsearch";

const unsetNumberInputValue = "";

function CustomRangeInput(props) {
  const { start, range, canRefine, refine } = useRange(props);
  const [minstate, setminstate] = useState(range.min);
  const [maxstate, setmaxstate] = useState(range.max);
  const step = 1 / Math.pow(10, 0);
  const values = {
    min:
      start[0] !== -Infinity && start[0] !== range.min
        ? start[0]
        : unsetNumberInputValue,
    max:
      start[1] !== Infinity && start[1] !== range.max
        ? start[1]
        : unsetNumberInputValue,
  };
  const [prevValues, setPrevValues] = useState(values);

  const [{ from, to }, setRange] = useState({
    from: values.min?.toString(),
    to: values.max?.toString(),
  });

  if (values.min !== prevValues.min || values.max !== prevValues.max) {
    setRange({ from: values.min?.toString(), to: values.max?.toString() });
    setPrevValues(values);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      style={{
        margin: "0.3rem 0.8rem 0.5rem 0rem",
        border: "1px solid #ddd",
        padding: "0.5rem 0.2rem",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <input
        type="number"
        min={range.min}
        max={range.max}
        // placeholder={range.min?.toString()}
        style={{
          width: "28%",
          height: "1.75rem",
          fontSize: "0.8rem",
          marginLeft: "0.2rem",
        }}
        className="border-1  border-gray-400 rounded-md"
        step={1 / Math.pow(10)}
        value={minstate || ""}
        onChange={(event) => setminstate(event.currentTarget.value)}
      />
      {" - "}
      <input
        type="number"
        min={range.min}
        max={range.max}
        // placeholder={range.max?.toString()}
        style={{ width: "28%", height: "1.75rem", fontSize: "0.8rem" }}
        step={1 / Math.pow(10)}
        value={maxstate || ""}
        className="border-1  border-gray-400 rounded-md"
        onChange={(event) => setmaxstate(event.currentTarget.value)}
      />
      <Button
        type="submit"
        style={{
          textTransform: "capitalize",
          margin: "0.3rem 0.5rem",
          fontSize: "0.8rem",
          minWidth: "1.2rem",
        }}
        variant="contained"
        size="small"
      >
        Go
      </Button>
    </form>
    // <form
    //   onSubmit={(event) => {
    //     event.preventDefault();

    //     refine([from ? Number(from) : undefined, to ? Number(to) : undefined]);
    //   }}
    // >
    //   <label>
    //     <input
    //       type="number"
    //       min={range?.min}
    //       max={range?.max}

    //       value={stripLeadingZeroFromInput(from || unsetNumberInputValue)}
    //       step={step}
    //       placeholder={range.min?.toString()}
    //       disabled={!canRefine}
    //       onInput={({ currentTarget }) => {
    //         const value = currentTarget.value;

    //         setRange({ from: value || unsetNumberInputValue, to });
    //       }}
    //     />
    //   </label>
    //   <span>to</span>
    //   <label>
    //     <input
    //       type="number"
    //        min={range?.min}
    //       max={range?.max}
    //       // min={start[0]}
    //       // max={start[1]}
    //       value={stripLeadingZeroFromInput(to || unsetNumberInputValue)}
    //       step={step}
    //       placeholder={range.max?.toString()}
    //       disabled={!canRefine}
    //       onInput={({ currentTarget }) => {
    //         const value = currentTarget.value;

    //         setRange({ from, to: value || unsetNumberInputValue });
    //       }}
    //     />
    //   </label>
    //   <button type="submit">Go</button>
    // </form>
  );
}

function stripLeadingZeroFromInput(value) {
  return value.replace(/^(0+)\d/, (part) => Number(part).toString());
}

export default CustomRangeInput;
