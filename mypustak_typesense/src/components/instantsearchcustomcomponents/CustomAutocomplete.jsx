import { useConnector } from 'react-instantsearch';
import connectAutocomplete from 'instantsearch.js/es/connectors/autocomplete/connectAutocomplete';
import { Button } from '@mui/material';
import CallMadeIcon from "@mui/icons-material/CallMade";
import SearchIcon from "@mui/icons-material/Search";


export function useAutocomplete(props) {
    return useConnector(connectAutocomplete, props);
  }

const CustomAutocomplete = (props) => {
    // const { indices, currentRefinement, refine } = useAutocomplete(props);
    // const {showautocomp,closeshowauto} = props;
    return (
        <div>
            hiii {showautocomp}
        </div>
    );
}

export default CustomAutocomplete;