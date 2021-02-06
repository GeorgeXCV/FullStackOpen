import React from 'react';

const Search = ({query, handleSearchChange}) => {  
    return (
            <div>
                Find countries: <input type="text" value={query} onChange={handleSearchChange} />
            </div>
      )
}

export default Search;