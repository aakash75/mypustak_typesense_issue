import React from 'react';
import { useStats } from 'react-instantsearch';

export function CustomStats() {
  const { nbHits, processingTimeMS, query } = useStats();

  return (
    <span style={{textTransform:'capitalize'}}>
      {/* {nbHits.toLocaleString()} results found in{' '}
      {processingTimeMS.toLocaleString()}ms for <q>{query}</q>. */}
      Show all {nbHits .toLocaleString()} results
    </span>
  );
}