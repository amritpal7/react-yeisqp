import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import ReactSelect from './ReactSelect';
import SelectBox from './Select';
import NewModal from './NewModal'
;
const FormFields = () => {
  const [select1, setSelect1] = useState({
    id: uuid(),
    type: 'select',
    properties: {
      label: 'Select1',
      options: [
        // {
        //   id: uuid(),
        //   optionName: 'red 🔴',
        //   value: '',
        //   childOptions: [],
        // },
        // {
        //   id: uuid(),
        //   optionName: 'green 🟢',
        //   value: '',
        //   childOptions: [],
        // },
        // {
        //   id: uuid(),
        //   optionName: 'blue 🔵',
        //   value: '',
        //   childOptions: [],
        // },
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
          name: 'radio-type',
          value: 'male',
          label: 'Male',
          childOptions: [],
        },
        {
          id: uuid(),
          name: 'radio-type',
          value: 'female',
          label: 'Female',
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
      options: [
        {
          id: uuid(),
          value: 'java',
          label: 'JAVA',
          childOptions: [],
        },
        {
          id: uuid(),
          value: 'python',
          label: 'Python',
          childOptions: [],
        },
      ],
      columns: 1,
    },
    required: false,
    fillableByCandidate: true,
    fillableByHR: false,
  });

  const initialElements = [
    JSON.parse(JSON.stringify(select1)),
    JSON.parse(JSON.stringify(element1)),
    JSON.parse(JSON.stringify(element2)),
  ];

  const formElements = initialElements;

  const [selectValues, setSelectValues] = useState([]);
  const [optionVal, setOptionVal] = useState('');
  const [checked, setChecked] = useState(false);
  const [filteredElem, setFilteredElem] = useState([]);
  const [selectedElem, setSelectedElem] = useState(null);
  const [elemType, setElemType] = useState('');
  const [render, setRenderer] = useState(false);
  const [dependencies, setDependencies] = useState({
    selectedElement: null,
    selectedElementValue: null,
    showElementId: null,
  });

  const [newFormElements, setNewFormElements] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [getFormElementId, setFormElementId] = useState(null);

  let elementOptions = [];

  function toggleCondition(e) {
    setChecked((checked) => !checked);
  }

  function addOptionsVal() {
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

    // setSelect1((prevState) => {
    //   const options = [
    //     ...prevState.properties.options,
    //     {
    //       id: uuid(),
    //       optionName: optionVal,
    //       value: optionVal,
    //       label: optionVal.charAt(0).toUpperCase() + optionVal.slice(1),
    //       childOptions: [],
    //     },
    //   ];
    //   return {
    //     ...prevState,
    //     properties: {
    //       ...prevState.properties,
    //       options
    //     },
    //   };
    // });

    setNewFormElements(prevElems => {
      return prevElems.map(prevObj => prevObj.id === getFormElementId ? {...prevObj, properties: {
        ...prevObj.properties,
        options: [
          ...prevObj.properties.options,
          {
            id: uuid(),
            label: optionVal
          }
        ]
      }}: prevObj)
    })
   
    setOptionVal('');
  }

  console.log(elementOptions)

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

  function showElementHandler(e) {
    setDependencies((prevDeps) => ({
      ...prevDeps,
      showElementId: e.target.value,
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

  function displayRenderer(e) {
    const { selectedElementValue } = dependencies;
    selectedElementValue === e.target.value
      ? setRenderer(true)
      : setRenderer(false);
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



  function FormElementsHandler(e) {
    const elemType = e.target.value;
    if (!elemType) return;

    setNewFormElements((prevState) => {
      return [
        ...prevState,
        {
          id: uuid(),
          type: elemType,
          properties: {
            label: elemType,
            value: '',
            name: null,
            options: [],
          },
          parentId: null,
        },
      ];
    });
  }

  const BUTTON_WRAPPER_STYLES = {
    position: "relative",
    zIndex: 1,    
  }

  function getElementIdHandler(e) {
    setIsOpen(true);
    setFormElementId(e.target.id)
  }

  return (
    <>
      <select onChange={FormElementsHandler}>
        <option value="">--Form Elements--</option>
        <option value="select">Dropdown</option>
        <option value="radio">Radio</option>
        <option value="checkbox">Checkbox</option>
        <option value="text">TextBox</option>
      </select>
      {newFormElements.map((elem) => {
        const { label, value, name } = elem.properties;
        return elem.type === 'select' ? (
          <div>
          <select onChange={}>
            <option value="">----</option>
            {elem.properties.options.map((option) => {
              return <option value={option.id}>{option.label}</option>;
            })}
          </select>
          {!isOpen && <button style={BUTTON_WRAPPER_STYLES} onClick={getElementIdHandler} id={elem.id}>Settings</button>}
          </div>
        ) : elem.type === 'radio' ? (
          <div>
            <input type="radio" value={value} name={name} />
            <label htmlFor="">{label}</label>
            {!isOpen && <button style={BUTTON_WRAPPER_STYLES} onClick={getElementIdHandler} id={elem.id}>Settings</button>}
          </div>
        ) : elem.type === 'checkbox' ? (
          <div>
            <input type="checkbox" value={value} name={name} />
            <label htmlFor="">{label}</label>
            {!isOpen && <button style={BUTTON_WRAPPER_STYLES} onClick={getElementIdHandler} id={elem.id}>Settings</button>}
          </div>
        ) : elem.type === 'text' ? (
          <div>
            <label htmlFor="">{label}</label>
            <input type="text" />
            {!isOpen && <button style={BUTTON_WRAPPER_STYLES} onClick={getElementIdHandler} id={elem.id}>Settings</button>}
          </div>
        ) : (
          []
        );
      })}
      <NewModal open={isOpen} onClose={() => setIsOpen(false)}>
          <div>
          <input type="text" value={optionVal} onChange={handleValueChange} />
          <button onClick={addOptionsVal}>add options</button>
        </div>
          <div>
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
            <option>--select--</option>
            {newFormElements.map((elem) => {
              return <option value={elem.id}>{elem.type}</option>;
            })}
          </select>
          <label htmlFor=""> Value: </label>
          {formElement && (
            <select name="" id="" onChange={elementValueHandler}>
              <option>--select--</option>
              {formElement.properties.options.map((option) => {
                return <option value={option.value}>{option.label}</option>;
              })}
            </select>
          )}
          <label htmlFor=""> Show: </label>
          <select name="" id="" onChange={showElementHandler}>
            <option>--select--</option>
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
      </NewModal>
      <br />
      {'``````````````Dynamically add select options``````````````````'}
      <div>
        {dependencies.showElementId !== select1.id && (
          <select name="" id="" onChange={displayRenderer}>
            <option value="">--select--</option>
            {select1.properties.options.map((option) => {
              return <option value={option.value}>{option.label}</option>;
            })}
          </select>
        )}

        <div>
          {dependencies.showElementId !== element1.id &&
            element1.properties.options.map((option) => {
              return (
                <div>
                  <input
                    type="radio"
                    name={option.name}
                    value={option.value}
                    onChange={displayRenderer}
                  />
                  <label htmlFor="">{option.label}</label>
                </div>
              );
            })}
        </div>
        <div>
          {dependencies.showElementId !== element2.id &&
            element2.properties.options.map((option) => {
              return (
                <div>
                  <input
                    type="checkbox"
                    value={option.value}
                    onChange={displayRenderer}
                  />
                  <label htmlFor="">{option.label}</label>
                </div>
              );
            })}
        </div>

        {render && dependencies.showElementId !== null
          ? formElements.map((elem) => {
              if (
                elem.id === dependencies.showElementId &&
                elem.type === 'radio'
              ) {
                return (
                  <div>
                    {elem.properties.options.map((option) => {
                      return (
                        <div>
                          <input type="radio" name={option.name} />
                          <label>{option.label} </label>
                        </div>
                      );
                    })}
                  </div>
                );
              } else if (
                elem.id === dependencies.showElementId &&
                elem.type === 'checkbox'
              ) {
                return (
                  <div>
                    {elem.properties.options.map((option) => {
                      return (
                        <div>
                          <input type="checkbox" />
                          <label htmlFor="">{option.label}</label>
                        </div>
                      );
                    })}
                  </div>
                );
              } else if (
                elem.id === dependencies.showElementId &&
                elem.type === 'select'
              ) {
                return (
                  <select>
                    <option value="">--select--</option>
                    {elem.properties.options.map((option) => {
                      return <option>{option.label}</option>;
                    })}
                  </select>
                );
              }
            })
          : []}

        <div>
          <input type="text" value={optionVal} onChange={handleValueChange} />
          <button onClick={addOptionsVal}>add options</button>
        </div>

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
            <option>--select--</option>
            {formElements.map((elem) => {
              return <option value={elem.id}>{elem.type}</option>;
            })}
          </select>
          <label htmlFor=""> Value: </label>
          {selectedElem && (
            <select name="" id="" onChange={elementValueHandler}>
              <option>--select--</option>
              {selectedElem.properties.options.map((option) => {
                return <option value={option.value}>{option.label}</option>;
              })}
            </select>
          )}
          <label htmlFor=""> Show: </label>
          <select name="" id="" onChange={showElementHandler}>
            <option>--select--</option>
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
