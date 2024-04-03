import { useConnector } from 'react-instantsearch';
import connectAutocomplete from 'instantsearch.js/es/connectors/autocomplete/connectAutocomplete';

export function useAutocomplete(props) {
  return useConnector(connectAutocomplete, props);
}

export function TrendingSearch2(props) {
  const { indices, currentRefinement, refine } = useAutocomplete(props);

  return <>{/* Your JSX */}</>;
}