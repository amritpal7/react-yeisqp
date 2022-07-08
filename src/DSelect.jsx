import React, { useState } from 'react';
import Select from 'react-select';
import { v4 as uuid } from 'uuid';

function DSelect() {
  const [select1, setSelect1] = useState({
    id: uuid(),
    type: 'select',
    properties: {
      label: 'Select1',
      options: [
        {
          id: uuid(),
          value: 'red 🔴',
          label: '',
          childOptions: [],
        },
        {
          id: uuid(),
          value: 'green 🟢',
          label: '',
          childOptions: [],
        },
        {
          id: uuid(),
          value: 'blue 🔵',
          label: '',
          childOptions: [],
        },
      ],
    },
    parentId: null,
  });
  const formElements = [
    {
      id: uuid(),
      type: 'select',
      value: 1,
      label: 'Select',
    },
    {
      id: uuid(),
      type: 'checkbox',
      value: 2,
      label: 'Checkbox',
    },
    {
      id: uuid(),
      type: 'text',
      value: 3,
      label: 'TextBox',
    },
    {
      id: uuid(),
      type: 'radio',
      value: 4,
      label: 'Radio',
    },
    {
      id: uuid(),
      type: 'password',
      value: 5,
      label: 'Password',
    },
  ];

  // set value for default selection
  const [selectedValue, setSelectedValue] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState([]);

  // handle onChange event of the dropdown
  const handleChange = (e) => {
    console.log(e);
    setSelectedValue(Array.isArray(e) ? e.map((x) => x.id) : []);
    setSelectedLabel(Array.isArray(e) ? e.map((x) => x.label) : []);
  };

  // console.log(selectedValue);

  function add() {
    setSelect1((prevState) => {
      return {
        ...prevState,
        properties: {
          label: 'Select1',
          options: [
            ...prevState.properties.options,
            {
              id: uuid(),
              value: 'blahh',
              label: 'Blaahh',
              childOptions: [
                {
                  id: uuid(),
                  value: 'another blahh',
                  label: 'Another Blahhh',
                  childOptions: [],
                },
              ],
            },
          ],
        },
      };
    });
  }
  console.log(selectedValue);
  return (
    <div className="App">
      <h3>
        Get selected by only value for multi select -{' '}
        <a href="https://www.cluemediator.com">Clue Mediator</a>
      </h3>

      <Select
        className="dropdown"
        placeholder="Select Option"
        value={formElements.filter((obj) => selectedValue.includes(obj.id))} // set selected values
        options={formElements} // set list of the data
        onChange={handleChange} // assign onChange function
        isMulti
        isClearable
      />

      {selectedValue && (
        <div style={{ marginTop: 20, lineHeight: '25px' }}>
          <div>
            <b>Selected Value: </b> {JSON.stringify(selectedValue, null, 2)}
          </div>
          <div>
            <strong>
              Selected Label:{' '}
              {selectedLabel && JSON.stringify(selectedLabel, null, 2)}
            </strong>
          </div>
        </div>
      )}
      <button onClick={add}>ADD</button>
    </div>
  );
}

export default DSelect;
