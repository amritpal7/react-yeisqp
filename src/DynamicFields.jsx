import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

const FormFields = () => {
  const [select1, setSelect1] = useState({
    id: uuid(),
    type: 'select',
    properties: {
      label: 'Select1',
      options: [
        // {
        //   id: uuid(),
        //   label: null,
        //   value: {
        //     labelTxt: 'text1',
        //     childOptions: [],
        //   },
        // },
        // {
        //   id: uuid(),
        //   label: null,
        //   value: {
        //     labelTxt: 'text2',
        //     childOptions: [],
        //   },
        // },
      ],
    },
    parentId: null,
  });
  const [element1, setElement1] = useState({
    type: 'radio',
    properties: {
      label: 'Radio question field.',
      options: [],
      columns: 1,
    },
    fillableByCandidate: true,
    fillableByHR: false,
    required: false,
  });
  const [element2, setElement2] = useState({
    type: 'checkbox',
    properties: {
      label: 'Checkbox question field.',
      options: [],
      columns: 1,
    },
    required: false,
    fillableByCandidate: true,
    fillableByHR: false,
  });

  const initialValues = [
    JSON.parse(JSON.stringify(select1)),
    JSON.parse(JSON.stringify(element1)),
    JSON.parse(JSON.stringify(element2)),
  ];

  const [selectValues, setSelectValues] = useState([]);
  const [optionVal, setOptionVal] = useState('');
  const [checked, setChecked] = useState(false);
  const [condition, setCondition] = useState(false);
  const [formElements, setFormElements] = useState(initialValues);
  const [selectedElem, setSelectedElem] = useState(null);

  function handleElementChange(e) {
    const objId = e.target.value;

    formElements.map((elem) => {
      if (elem.id === objId) {
        setSelectedElem(elem);
        console.log(elem);
      }
    });
  }

  function toggleCondition(e) {
    setChecked((checked) => !checked);
  }

  function addOptionsVal(type) {
    // setSelect1((prevState) => {
    //   const options = [...prevState.properties.options];
    //   options.push({
    //     id: uuid(),
    //     label: optionVal,
    //     value: {
    //       labelTxt: optionVal,
    //       childOptions: [],
    //     },
    //   });

    //   console.log(options);
    //   return { ...prevState, options };
    // });

    setSelect1((prevState) => {
      const options = [
        ...prevState.properties.options,
        {
          id: uuid(),
          label: optionVal,
          value: {
            labelTxt: optionVal,
            childOptions: [],
          },
        },
      ];
      return {
        ...prevState,
        properties: {
          ...prevState.properties,
          options,
        },
      };
    });

    if (type === 'radio') {
      setElement1((prevState) => {});
    }
    setOptionVal('');
  }

  function handleValueChange(e) {
    setOptionVal(e.target.value);
  }

  function handleOptionsRemove(index) {
    let newValues = [...selectValues];
    newValues.splice(index, 1);
    console.log(newValues);
    setSelectValues(newValues);
  }

  return (
    <>
      {'``````````````Dynamically add select options``````````````````'}
      <div>
        <select name="" id="">
          <option value="">--select--</option>
          {select1.properties.options.map((option) => {
            return <option>{option.label}</option>;
          })}
        </select>

        <input
          type="checkbox"
          value="male"
          checked={checked}
          onChange={toggleCondition}
          id="condition"
        />
        <label htmlFor="condition">Apply condition</label>
      </div>
      <div>
        {/* {selectValues.map((val, i) => {
          return (
            <div>
              <ul>
                <li key={i}>
                  {val} <span onClick={() => handleOptionsRemove(i)}>🗑</span>
                </li>
              </ul>
            </div>
          );
        })} */}
        <input
          type="text"
          value={optionVal}
          onChange={(e) => handleValueChange(e)}
        />
        <button onClick={addOptionsVal}>Add options</button>
      </div>
      {checked ? (
        <div>
          {'When '}
          {
            <select onChange={handleElementChange}>
              <option value="">--Select--</option>
              {formElements.map((elem) => {
                return <option value={elem.id}>{elem.type}</option>;
              })}
            </select>
          }
          {selectedElem?.type === 'radio' ? (
            <div>
              <div>
                <input type="radio" value="male" id="gender" name="gender" />
                <label htmlFor="gender">Male</label>
                <input type="radio" value="female" id="gender" name="gender" />
                <label htmlFor="gender">Female</label>
              </div>
              ;
            </div>
          ) : selectedElem?.type === 'checkbox' ? (
            <div>
              <input type="checkbox" value="" id="" />
              <label htmlFor="">CheckBox</label>
            </div>
          ) : null}
          {'Value = '}
          {selectedElem?.type === 'radio' ||
          selectedElem?.type === 'checkbox' ? (
            'Disabled '
          ) : (
            <select>
              <option value="">--Select--</option>
              {selectValues?.map((val) => {
                return <option>{val}</option>;
              })}
            </select>
          )}
          {' Show '}
          <select>
            <option value="">--Select--</option>
            {formElements.map((elem) => {
              return <option>{elem.type}</option>;
            })}
          </select>
        </div>
      ) : null}
    </>
  );
};

export default FormFields;
