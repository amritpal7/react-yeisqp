import React from 'react';
import { v4 as uuid } from 'uuid';
import Modal from './Modal';

export default function SelectBox() {
  const [childObj, setChildObj] = React.useState(undefined);
  const [selected, setSelected] = React.useState('');
  const [selectedElementId, setSelectedElementId] = React.useState(undefined);
  const [getElementOptions, setElementOptions] = React.useState(null);
  const [showElements, setShowElements] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [toggle, setToggle] = React.useState(false);
  const [elType, setElType] = React.useState(null);
  const [element1, setElement1] = React.useState({
    id: uuid(),
    type: 'select',
    properties: {
      label: 'Select1',
      options: [
        {
          id: uuid(),
          label: 'text1',
          value: {
            labelTxt: 'text1',
            childOptions: [],
          },
        },
        {
          id: uuid(),
          label: 'text2',
          value: {
            labelTxt: 'text2',
            childOptions: [],
          },
        },
      ],
    },
    parentId: null,
  });
  const [element2, setElement2] = React.useState({
    id: uuid(),
    type: 'select',
    properties: {
      label: 'Select2',
      options: [
        {
          id: uuid(),
          label: 'text3',
          value: {
            labelTxt: 'text3',
            childOptions: ['aa', 'bb'],
          },
        },
        {
          id: uuid(),
          label: 'text4',
          value: {
            labelTxt: 'text4',
            childOptions: ['xx', 'yy'],
          },
        },
      ],
    },
    parentId: null,
  });
  const [element3, setElement3] = React.useState({
    id: uuid(),
    type: 'checkbox',
    properties: {
      label: 'checkbox',
      options: [
        { id: uuid(), optionLabel: '' },
        { id: uuid(), optionLabel: '' },
      ],
      value: `checkbox${Date.now()}`,
    },
    parentId: null,
  });
  const [element4, setElement4] = React.useState({
    id: uuid(),
    type: 'radio',
    properties: {
      label: 'radio',
      value: `checkbox${Date.now()}`,
    },
    parentId: null,
  });
  const [element5, setElement5] = React.useState({
    id: uuid(),
    type: 'input',
    properties: {
      label: 'input box',
      value: `input${Date.now()}`,
    },
    parentId: null,
  });
  const [dependencies, setDependencies] = React.useState({
    if: null,
    value: null,
    show: null,
    showFields: null,
  });

  function showModal(e) {
    setShow((s) => !s);
  }

  const arrElements = [
    JSON.parse(JSON.stringify(element1)),
    JSON.parse(JSON.stringify(element2)),
    JSON.parse(JSON.stringify(element3)),
    JSON.parse(JSON.stringify(element4)),
    JSON.parse(JSON.stringify(element5)),
  ];

  function saveConditions() {
    setDependencies((oldDependencies) => ({
      ...oldDependencies,
      dependencies,
    }));
    setShow((s) => !s);
    console.log('saved');
  }

  function setParentObj(e) {
    for (let i = 0; i < arrElements.length; i++) {
      if (arrElements[i].id !== e.target.value) {
        arrElements[i].parentId = e.target.value;
        setChildObj(arrElements[i]);
        // setVisible(true);
        // console.log(arrElements[i].id);
        // console.log(arrElements[i]);
      }
    }
    // console.log(e.target.value);
  }

  let type = null;
  let options = null;
  let setElement = null;

  function changeSelectOptionHandler(e) {
    selectedElementId === undefined
      ? setSelectedElementId(e.target.value)
      : setSelectedElementId(null);
    arrElements.forEach((elem) => {
      setDependencies((oldDependencies) => ({
        ...oldDependencies,
        if: e.target.value,
      }));
      // dependencies.if = elem.id;
      if (elem.id !== e.target.value) return;

      if (elem.type === 'select') {
        console.log(elem);
        setElementOptions(elem.properties.options);
        elem.properties.options.forEach((option) => {
          setSelected(option.label);
        });
        setElType('select');
      } else if (elem.type === 'checkbox') {
        setElType('checkbox');
      } else if (elem.type === 'radio') {
        setElementOptions(elem.properties.options);

        setElType('radio');
      }
    });
    const showEle = arrElements.filter((ele) => {
      return e.target.value !== ele.id;
    });
    setShowElements(showEle);
    setParentObj(e);
  }

  function handleChangeOptionsVal(e) {
    // let data = document.getElementById('select-options');
    // data.options[data.selectedIndex].getAttribute('data-option');
    setDependencies((oldDependencies) => ({
      ...oldDependencies,
      value: e.target.value,
    }));
    getElementOptions.map((option) => {
      if (option.label === e.target.value) {
        console.log(option);
        return option;
      }
    });
  }

  function handleConditionChange(e) {
    setDependencies((oldDependencies) => ({
      ...oldDependencies,
      show: e.target.value,
    }));

    showElements.map((elem) => {
      if (elem.id === e.target.value) {
        console.log(elem);
        setDependencies((oldDependencies) => ({
          ...oldDependencies,
          showFields: elem,
        }));
      }
    });
  }

  function handleConditionsRender(e) {
    const optionVal = e.target.value;
    const { value } = dependencies;

    optionVal === value ? setToggle(true) : setToggle(false);
  }

  if (selected === 'text1' || selected === 'text2') {
    setElement = element1;
  } else if (selected === 'text3' || selected === 'text4') {
    setElement = element2;
  }

  if (setElement) {
    options = setElement.properties.options.map((option) => {
      return (
        <option data-option={option} value={option.label}>
          {option.label}
        </option>
      );
    });
  }

  return (
    <div>
      {dependencies ? (
        <select name="" id="" onChange={handleConditionsRender}>
          <option value="" selected disabled>
            --Select options--
          </option>
          {arrElements.map((arrEl) => {
            if (arrEl.id === dependencies.if) {
              return arrEl.properties.options.map((option) => {
                return <option value={option.label}>{option.label}</option>;
              });
            }
          })}
        </select>
      ) : null}
      {/* <select name="" id="">
        <option value="" selected disabled>
          --Select options--
        </option>
        {showElements.map((arrEl) => {
          if (arrEl.id === dependencies.if) {
            return <option>{arrEl.properties.label}</option>;
          }
        })}
      </select> */}
      <button
        class="toggle-button"
        id="centered-toggle-button"
        onClick={showModal}
      >
        {'⚙︎'}
      </button>
      <div>
        <br />
        {toggle && (
          <select name="" id="">
            <option value="">--Select--</option>
            {dependencies?.showFields.properties?.options.map((option) => {
              return <option>{option.label}</option>;
            })}
          </select>
        )}
      </div>

      <Modal onClose={showModal} show={show} save={saveConditions}>
        {'If '}
        <select name="" id="" onChange={changeSelectOptionHandler}>
          <option disabled selected>
            --Select elements--
          </option>
          {arrElements.map((arrEl) => {
            if (
              arrEl.type === 'select' ||
              arrEl.type === 'radio' ||
              arrEl.type === 'checkbox'
            ) {
              return (
                <option key={arrEl.id} value={arrEl.id}>
                  {arrEl.properties.label}
                </option>
              );
            }
          })}
        </select>
        {' Value = '}
        <select id="select-options" onChange={handleChangeOptionsVal}>
          <option value="" selected disabled>
            {' '}
            --Select--
          </option>
          {options}
        </select>
        {' Show '}
        <select name="" id="" onChange={handleConditionChange}>
          <option disabled selected>
            --Select elements--
          </option>
          {showElements.map((arrEl) => {
            return (
              <option key={arrEl.id} value={arrEl.id}>
                {arrEl.properties.label}
              </option>
            );
          })}
        </select>
      </Modal>
      <div></div>
    </div>
  );
}
