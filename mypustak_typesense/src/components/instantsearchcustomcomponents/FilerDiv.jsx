import React from 'react'
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import CustomClearRefinements from "../instantsearchcustomcomponents/ClearRefinements";
import CustomRefinementList from "../instantsearchcustomcomponents/RefinementList";
import CustomNumericMenu from './NumericMenu';

function FilerDiv() {
  return (
    <div>
        <div
            className='filterDiv bg-white col-3 d-none d-sm-block d-md-block d-lg-block align-items-center'
            style={{
              maxWidth: "14.563rem",
              minWidth: "14.563rem",
              boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
              height: "fit-content",
            }}>
            <div
              className=''
              style={{
                background: " linear-gradient(90deg, #2157AD 0%, #6190DA 100%)",
                height: "2.063rem",
                display: "flex",
                alignItems: "center",
              }}>
              <div
                style={{
                  margin: "0.5rem 0rem 0.5rem 1rem",
                  display: "flex",
                  alignItems: "center",
                }}>
                <FilterAltOutlinedIcon
                  fontSize='small'
                  style={{ color: "#fff" }}
                />
                <h3 style={{ margin: 0, fontSize: "1rem", color: "#fff" }}>
                  Filters
                </h3>
              </div>
            </div>

            <div style={{ margin: "0.5rem 0rem 0.5rem 1rem" }}>
              <CustomClearRefinements />
            </div>

            <div style={{ margin: "0.5rem 0rem 0.5rem 1rem" }}>
              <h5 className='Refineheader'>Authors</h5>
              <CustomRefinementList
                searchable={true}
                transformItems={items =>
                  items.map(item => ({
                    ...item,
                    label:
                      item.label == "na" || item.label == " "
                        ? "Others"
                        : item.label,
                  }))
                }
                attribute='author'
              />
            </div>
            <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
              <h5 className='Refineheader'>Binding</h5>
              <CustomRefinementList attribute='binding' />
            </div>

            <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
              <h5 className='Refineheader'>Language</h5>
              <CustomRefinementList attribute='language' />
            </div>
            <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
              <h5 className='Refineheader'>Book Type</h5>
              <CustomRefinementList
                defaultRefinement={"0"}
                transformItems={items =>
                  items.map(item => ({
                    ...item,
                    label: item.label == "0" ? "Used Books" : "New Books",
                  }))
                }
                attribute='book_type'
              />
            </div>

            {/* <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
              <h5 className="Refineheader">Stock</h5>
              <CustomRefinementList defaultRefinement={'n'} 
              transformItems={items =>
                items.map(item => ({
                  ...item,
                  label: item.label=='N'||item.label=='n'?"In Stock":'Out Of Stock',
                }))
              }
              attribute="is_out_of_stack" />
            </div> */}

            <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
              <h5 className='Refineheader'>Publication</h5>
              <CustomRefinementList
                searchable={true}
                transformItems={items =>
                  items.map(item => ({
                    ...item,
                    label:
                      item.label == "na" || item.label == " "
                        ? "Others"
                        : item.label,
                  }))
                }
                attribute='publication'
              />
            </div>

            <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
              <h5 className='Refineheader'>Book Condition</h5>
              <CustomRefinementList attribute='book_condition' 
              
              />
            </div>

            {/* <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
              <h5 className='Refineheader'>Category</h5>
              <CustomRefinementList attribute='category' />
            </div> */}

            {/* <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                <h5 className="Refineheader">Parent Category</h5>
                <CustomRefinementList  attribute="parent_category" />
              </div> */}

            <div style={{ margin: "0.5rem 0rem 0.5rem 1rem" }}>
              <h5 className='Refineheader'>Shiping and Handling</h5>
              {/* <CustomRangeSlider
      attribute={"new_pricing"}/>
              <CustomRangeInput attribute="new_pricing" /> */}
              <CustomNumericMenu
                attribute='new_pricing'
                items={[
                  { label: "Less than ₹99", start: 0, end: 99 },
                  { label: "Less than ₹499", start: 100, end: 500 },
                  { label: "More than ₹500", start: 500 },
                ]}
              />
            </div>
          </div>
          <style jsx>
        {`
          .filterDiv {
            margin-right: 1.873rem;
          }
          .sort {
            margin-right: 1rem;
            font-size: 0.89rem;
            font-weight: bold;
          }
          .Refineheader {
            font-size: 0.875rem;
            font-weight: 500;
            color: #2248ae;
            width: max-content;
            // padding:0 2px;
            // border-bottom:2px solid #2248AE;
          }
          @media (min-width: 992px) and (max-width: 1055px) {
            .filterDiv {
              margin-right: 0.75rem;
            }
          }
        `}
      </style>
    </div>
  )
}

export default FilerDiv