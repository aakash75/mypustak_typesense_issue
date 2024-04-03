import React, { Component } from 'react'
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

class OnChangeDebouncedInput extends Component {
    timerId = null;

  state = {
    value: this.props.currentRefinement
  };
  componentDidMount() { 
    const queryParams = new URLSearchParams(window.location.search);
    const name = queryParams.get("value");
    this.setState({
      value:name,
    })
   }
  onChangeDebounced = event => {
    const { refine } = this.props;
    const value = event.currentTarget.value;

    window.clearTimeout(this.timerId);
    this.timerId = window.setTimeout(() => {
      refine(value)
      if (value.length > 0) {
        this.props.setshowautocomp(true);
      } else {
        this.props.setshowautocomp(false);
      }
    }, 350);

    this.setState(() => ({
      value
    }));
  };
  render() {
    return (
      <div>
        <form
        onSubmit={e => {
          e.preventDefault();
          window.location.replace(`/search?value=${this.props.currentRefinement}`);
        }}
        style={{ display: "flex", alignItems: "center" }}
        >
          <input
          className='searchInput'
          placeholder='Search for books by title, author, Publication or ISBN '
          value={this.state.value}
          // onChange={event => {
          //   if (event.currentTarget.value.length > 0) {
          //     setshowautocomp(true);
          //   } else {
          //     setshowautocomp(false);
          //   }
          //   refine(event.currentTarget.value);
          // }}
          onChange={this.onChangeDebounced}
          />
          <button aria-label="searchButton"  type='submit' className='searchButton'>
            <SearchOutlinedIcon style={{ color: "#fff" }} />
          </button>
        </form>
        <style jsx>
          {`
          .searchInput {
            // max-width: 28.063rem;
            width:28.063rem;
            
            height: 2rem;
            // border-radius: 8px 0px 0px 8px;
            border: none;
            focus: none;
          }
          .searchButton {
            width: 4rem;
            height: 2rem;
            margin: 5px 0;
            border: none;
            background-color: #ff723b;
            box-shadow: 2px 1px 1px rgba(255, 255, 255, 0.1);
            // border-radius: 0px 7px 7px 0px;
            margin-left: -8px;
          }
          .searchButton:hover {
            background: #ff5e1f;
          }
          @media screen and (max-width: 992px) {
            .searchInput {
              width: 22rem;
            }
          }
          @media screen and (max-width: 768px) {
            .searchInput {
              width: 14rem;
            }
            .searchButton {
              width: 2rem;
            }
          }
          `}
        </style>
        </div>
    )
  }
}

export default OnChangeDebouncedInput