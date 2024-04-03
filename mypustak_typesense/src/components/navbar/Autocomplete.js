import { useConnector } from "react-instantsearch";
import connectAutocomplete from "instantsearch.js/es/connectors/autocomplete/connectAutocomplete";
import { Button } from "@mui/material";
import CallMadeIcon from "@mui/icons-material/CallMade";
import SearchIcon from "@mui/icons-material/Search";
import { useDetectClickOutside } from "react-detect-click-outside";
import ClickOutside from "../instantsearchcustomcomponents/ClickOutside";
import { CustomStats } from "../instantsearchcustomcomponents/CustomStats";
export function useAutocomplete(props) {
  return useConnector(connectAutocomplete, props);
}

export function Autocomplete(props) {
  const { indices, currentRefinement, refine } = useAutocomplete(props);
  const { showautocomp, closeshowautofun } = props;

  const hits = indices[0].hits;
  //  console.log(indices , "indices")

  const onclickOutside = () => {
    // alert("click outside" + props.closeshowautofun)
    props.closeshowautofun(false);
  };
  return (
    <ClickOutside onClick={onclickOutside}>
      <div>
        {showautocomp ? (
          <div
            className="d-block d-sm-block d-md-block d-lg-block"
            style={{
              position: "absolute",
              zIndex: 100,
              borderRadius: "5px",
              backgroundColor: "#fff",
              width: "27.5rem",
            }}
          >
            {hits.map((hit) => (
              <div key={hit.book_id}>
                <div
                  onClick={() => {
                    window.location.assign(
                      `/search?value=${hit.title}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`
                    );
                  }}
                  style={{ alignItems: "center", margin: 0, padding: 0 }}
                  className="searchDiv d-flex justify-content-between"
                >
                  <SearchIcon
                    className="col-2"
                    fontSize="small"
                    style={{
                      justifySelf: "flex-start",
                      fontSize: "1.1rem",
                      flex: "0.1",
                      margin: 0,
                      padding: 0,
                    }}
                  />
                  <p
                    className="col-8"
                    style={{
                      margin: "0rem 0",
                      padding: "0.5rem 0rem",
                      textTransform: "capitalize",
                      fontSize: "0.8rem",
                      flex: "0.8",
                    }}
                    key={hit.book_id}
                  >
                    {hit.title.length > 75
                      ? hit.title.substring(0, 75).concat("...")
                      : hit.title}
                    ,{hit.author}
                  </p>
                  <CallMadeIcon
                    className="col-2"
                    fontSize="small"
                    style={{ fontSize: "1.1rem", flex: "0.1" }}
                  />
                </div>
              </div>
            ))}
            <Button
              size="small"
              fullWidth
              variant="outlined"
              onClick={() => {
                window.location.assign(
                  `/search?value=${currentRefinement}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`
                );
              }}
            >
              <CustomStats />
            </Button>
          </div>
        ) : null}

        <style jsx>
          {`
            .searchDiv:hover {
              background-color: #f2f3f5;
              cursor: pointer;
              color: #2248ae;
            }
          `}
        </style>
      </div>
    </ClickOutside>
  );
}
