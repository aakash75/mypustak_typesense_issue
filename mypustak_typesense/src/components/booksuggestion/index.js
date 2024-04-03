import { NoSsr } from "@mui/material";
import React from "react";
import BookSuggestion from "./BookSuggestion";

function Book_Suggestion(props) {
  return (
    <div>
      <NoSsr>
        <BookSuggestion page='HOME' key={props.key} books={props.books}/>
      </NoSsr>
    </div>
  );
}

export default Book_Suggestion;
