import React from 'react';
import Select from 'react-select';

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' },
// ];

function ReactSelect({ options, elements }) {
  // let values = options?.map(op => {
  //   console.log(op.optionName)
  // })

  console.log(elements)
  return (
    <div>
      <Select options={options} />
    </div>
  );
}

export default ReactSelect;
