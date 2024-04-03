import React from "react";
import { url } from "../../helper/api_url";
import BookCard from "../bookcard/BookCard";
function BookSuggestion(props) {
  React.useEffect(() => {
    console.log(props.books, props.code, "PROPSS");
    let body = {};
    let ParentCategoryArr = [
      187, 190, 191, 192, 193, 216, 217, 228, 238, 244, 252, 253, 266, 280, 288,
      303, 304, 315, 322, 329, 355,
    ];
    if (ParentCategoryArr.includes(props.code)) {
      body["category_url"] = props.category;
      body["query_by"] = "parent_category";
      body["sort_by"] = "num_is_out_of_stack:asc,i_date:desc";
    } else {
      if (isNaN(props.code)) {
        body["category_url"] = props.category;
        body["query_by"] = "BISAC_CODES";
        body["sort_by"] = "num_is_out_of_stack:asc,i_date:desc";
      } else {
        body["category_url"] = props.category;
        body["query_by"] = "category";
        body["sort_by"] = "num_is_out_of_stack:asc,i_date:desc";
      }
    }
    var payload = new FormData();
    payload.append("json", JSON.stringify(body));
    if (props.books.title == "Similar Books") {
      console.log(props.books.api_url, "APIURL");
      const data = fetch(`${url}${props.books.api_url}${props.code}/1/0`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.data.hits);
          setbookdata(data.data.hits);

          data.data.hits.map(d => {
            console.log(d.document);
          });
        });
    } else {
      console.log(props.books.api_url, "APIURL");
      const data = fetch(`${url}${props.books.api_url}`, { method: "POST" })
        .then(response => response.json())
        .then(data => {
          setbookdata(data.data);
          data.data.map(d => {
            console.log(d.document, "DOCDOC");
          });
        });
    }
  }, []);
  const [bookdata, setbookdata] = React.useState([]);

  return (
    <div>
      {bookdata ? (
        <div className='mainDiv'>
          <div className='titleDiv'>
            <span className='title'>{props.books.title}</span>{" "}
            <span className='viewmore'>View More</span>
          </div>
          <div
            style={{
              borderLeft: "1px solid #ddd",
              borderRight: "1px solid #ddd",
            }}
            className='row g-0'>
            {bookdata.slice(0, 6).map(b => (
              <div
                key={b.document.book_id}
                className='col-6 col-sm-4 col-md-4 col-lg-2'>
                <BookCard
                  categories={
                    b.document.author != "na"
                      ? b.document.author
                      : b.document.publication
                  }
                  image={b.document.thumb}
                  book={b.document}
                  Booktitle={b.document.title}
                  price={b.document.price}
                />
              </div>
            ))}
          </div>
        </div>
      ) : <div className="mainDiv">

        </div>}
      <style jsx>
        {`
          .title {
            font-weight: 500;
            font-size: 1.25rem;
            // line-height: 23px;
            color: #2258ae;
            margin-left: 1.5rem;
          }
          .bookDiv {
            // min-width: 79.313rem;
            // max-width: 79.313rem;
            max-height: fit-content;
          }
          .viewmore {
            font-weight: 500;
            font-size: 1.25rem;
            margin-right: 1.5rem;
            color: #2258ae;
            cursor: pointer;
            opacity: 0.95;
          }
          .viewmore:hover {
            opacity: 1;
            // transition:0.5s;
            font-size: 1.27rem;
          }
          .titleDiv {
            display: flex;
            align-items: center;
            border: 0.5px solid #ddd;
            background-color: #fff;
            // min-width:${props.page == "HOME" ? "79.313rem" : "74.313rem"};
            // max-width:${props.page == "HOME" ? "79.313rem" : "74.313rem"};;
            min-width:100%;
            min-height: 3.125rem;
            justify-content: space-between;
            max-height: 3.125rem;
            margin-bottom: 10px;
          }
          .mainDiv {
            // min-width:${props.page == "HOME" ? "79.313rem" : "74.313rem"};;
            // max-width:${props.page == "HOME" ? "83.313rem" : "74.313rem"};;
            // width:96.79vw;
            max-width: 100%;
            overflow: hidden;
            margin-bottom: 10px;
          }
        `}
      </style>
    </div>
  );
}

export default BookSuggestion;
