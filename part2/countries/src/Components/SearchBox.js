import React from "react";

const SearchBox = ({ onChange, value }) => {
  return (
    <div>
      Find countries: <input value={value} onChange={onChange} />
    </div>
  );
};

export default SearchBox;
