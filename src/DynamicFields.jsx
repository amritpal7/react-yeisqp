import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

const FormFields = () => {
  const [select1, setSelect1] = useState({
    id: uuid(),
    type: 'select',
    properties: {
      label: 'Select1',
      options: [
        {
          id: uuid(),
          optionName: 'red 🔴',
          value: '',
          childOptions: [],
        },
        {
          id: uuid(),
          optionName: 'green 🟢',
          value: '',
          childOptions: [],
        },
        {
          id: uuid(),
          optionName: 'blue 🔵',
          value: '',
          childOptions: [],
        },
      ],
    },
    parentId: null,
  });
  const [element1, setElement1] = useState({
    id: uuid(),
    type: 'radio',
    properties: {
      label: 'Radio question field.',
      options: [
        {
          id: uuid(),
          optionName: 'male',
          value: '',
          childOptions: [],
        },
        {
          id: uuid(),
          optionName: 'female',
          value: '',
          childOptions: [],
        },
      ],
      columns: 1,
    },
    fillableByCandidate: true,
    fillableByHR: false,
    required: false,
  });
  const [element2, setElement2] = useState({
    id: uuid(),
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
  const [filteredElem, setFilteredElem] = useState([]);
  const [formElements, setFormElements] = useState(initialValues);
  const [selectedElem, setSelectedElem] = useState(null);
  const [elemType, setElemType] = useState('');
  const [dependencies, setDependencies] = useState({
    selectedElement: null,
    selectedElementValue: null,
    showElement: null,
  });

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
          optionName: optionVal,
          value: '',
          childOptions: [],
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
    setOptionVal('');
  }
  function handleElementChange(e) {
    const objId = e.target.value;

    formElements.map((elem) => {
      if (elem.id === objId) {
        setSelectedElem(elem);
        setDependencies((prevDeps) => ({
          ...prevDeps,
          selectedElement: elem.id,
        }));
        setElemType(elem.type);
      }
    });

    const updatedElem = formElements.filter((elem) => {
      return elem.id !== objId;
    });

    setFilteredElem(updatedElem);
  }

  function elementValueHandler(e) {
    setDependencies((prevDeps) => ({
      ...prevDeps,
      selectedElementValue: e.target.value,
    }));
  }

  function displayElementHandler(e) {
    setDependencies((prevDeps) => ({
      ...prevDeps,
      showElement: e.target.value,
    }));
    console.log(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setDependencies((prevDeps) => ({
      ...prevDeps,
    }));
    console.log('final', dependencies);
  }

  function displayRenderer() {
    console.log('diaplay');
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
        <select name="" id="" onChange={displayRenderer}>
          <option value="">--select--</option>
          {select1.properties.options.map((option) => {
            return <option>{option.optionName}</option>;
          })}
        </select>

        {dependencies &&
          dependencies.showElement !== null &&
          formElements.map((elem) => {
            if (elem.id === dependencies.showElement.id) {
              showElement.type === 'select' ? (
                <select>
                  <option>--select--</option>
                  {elem.properties.options.map((option) => {
                    return <option>{option.optionName}</option>;
                  })}
                </select>
              ) : showElement.type === 'radio' ? (
                elem.properties.options.map((option) => {
                  return (
                    <div>
                      <input type="radio" />
                      <label htmlFor="">{option.optionName}</label>
                    </div>
                  );
                })
              ) : showElement.type === 'checkbox' ? (
                showElement.properties.options.map((option) => {
                  return (
                    <div>
                      <input type="checkbox" />
                      <label htmlFor="">{option.optionName}</label>
                    </div>
                  );
                })
              ) : null;
            }
          })}
        <input
          type="checkbox"
          value="male"
          checked={checked}
          onChange={toggleCondition}
          id="condition"
        />
        <label htmlFor="condition">Apply condition</label>
      </div>
      {checked && (
        <form onSubmit={handleSubmit}>
          <label htmlFor=""> When: </label>
          <select name="" id="" onChange={handleElementChange}>
            <option value="">--select--</option>
            {formElements.map((elem) => {
              return <option value={elem.id}>{elem.type}</option>;
            })}
          </select>
          <label htmlFor=""> Value: </label>
          {selectedElem && (
            <select name="" id="" onChange={elementValueHandler}>
              <option value="">--select--</option>
              {selectedElem.properties.options.map((option) => {
                return (
                  <option value={option.optionName}>{option.optionName}</option>
                );
              })}
            </select>
          )}
          <label htmlFor=""> Show: </label>
          <select name="" id="" onChange={displayElementHandler}>
            <option value="">--select--</option>
            {filteredElem.map((elem) => {
              return <option value={elem.id}>{elem.type}</option>;
            })}
          </select>
          <br />
          <div>
            <input type="submit" value="Save" />
          </div>
        </form>
      )}
    </>
  );
};

export default FormFields;
