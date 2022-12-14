import React, { Fragment } from "react";

const Table = (props) => {
  const renderPlates = (array) => {
      return array.map((plate, index) => {
          return <div className="empty-plate" style={{ top: -7 * index }} key={index} />
      })
  };

  return (
    <Fragment>
      <h1 className="remaining">You have: ${props.bank} remaining!</h1>
      <div className="table">
        <div className="stack">
          {
            /* 
               renderPlates takes an array 
               and renders an empty plate
               for every element in the array
            */
            renderPlates(props.sushiPlate)
          }
        </div>
      </div>
    </Fragment>
  );
};

export default Table;
