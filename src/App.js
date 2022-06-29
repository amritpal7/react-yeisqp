import React from 'react';
import './style.css';
import { v4 as uuid } from 'uuid';

export default function App() {
  const [childArrVal, setChildArrVal] = React.useState(null);
  const [childOptionsval, setChildOptionsval] = React.useState('');
  const [matchedArrObj, setMatchedArrObj] = React.useState({});
  const [arrObj, setArrObj] = React.useState();
  const [element, setElement] = React.useState({
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
    childId: null,
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
            childOptions: [],
          },
        },
        {
          id: uuid(),
          label: 'text4',
          value: {
            labelTxt: 'text3',
            childOptions: [],
          },
        },
      ],
    },
    childId: null,
  });

  const label = element.type;

  let arrElement = [
    JSON.parse(JSON.stringify(element)),
    JSON.parse(JSON.stringify(element2)),
  ];

  function setParentElement(e) {
    const objId = e.target.value;
    console.log(arrElement);
    arrElement.map((arrEl) => {
      if (arrEl.id !== objId) {
        arrEl.childId = objId;
        setArrObj(arrEl);
        console.log(arrEl);
      } else {
        arrEl.parentId = null;
        setMatchedArrObj(arrEl);
      }
    });
    console.log('matched', matchedArrObj);
  }

  function handleChange(e) {
    setParentElement(e);
  }

  function handleValChange(e, id) {
    const options = arrObj.properties.options;
    const val = options.filter((option) => {
      console.log(option);
      if (option.id !== id) {
        setChildOptionsval(e.target.value);
      }
    });
    return val;
  }

  function addChildOptions(e, id) {
    arrObj.properties.options.filter((optionVal) => {
      if (id === optionVal.id) {
        let arr = childOptionsval.split(',');
        optionVal.value.childOptions = [...arr];
      }
    });
    // option.value.childOptions.map(child => {
    //   console.log(child)
    // })
    console.log('arrObj', arrObj);
    setArrObj(arrObj);
  }

  function deleteChildOptions(e, id) {
    arrObj.properties.options.filter((ele) => {
      if (id === ele.id) {
        ele.value.childOptions = [];
      }
    });
    // option.value.childOptions.map(child => {
    //   console.log(child)
    // })
    console.log('arrObj', arrObj);
    // setArrObj(arrObj);
  }

  return (
    <>
      <div>
        <select name="" id="" onChange={handleChange}>
          <option disabled selected>
            --Select Child--
          </option>
          {arrElement.map((arrEl) => {
            return <option value={arrEl.id}>{arrEl.properties.label}</option>;
          })}
        </select>
      </div>
      <div>
        <label htmlFor="">{label} options</label>
        <div>
          <select>
            <option>Select 1</option>
            {element.properties.options.map((arEl) => {
              return <option>{arEl.label}</option>;
            })}
          </select>
        </div>
        <div>
          <select>
            <option>Select 2</option>
            {element2.properties.options.map((option) => {
              return <option>{option.label}</option>;
            })}
          </select>
        </div>
      </div>
      <div>
        {arrObj
          ? arrObj.properties.options.map((option, index) => {
              return (
                <div>
                  <div>
                    <label>{option.label}</label>
                  </div>
                  <div>
                    { childOptionsval &&
                    <div>
                    <div><p>{option?.value?.childOptions?.join(",")}</p></div>
                    <button onClick={(e) => deleteChildOptions(e, option.id)}>
                      Delete
                    </button>
                    </div>
          }
                  </div>
                  <input
                    type="text"
                    value={childOptionsval}
                    onChange={(e) => handleValChange(e)}
                  />
                  <button onClick={(e) => addChildOptions(e, option.id)}>
                    Add
                  </button>
                </div>
              );
            })
          : 'Select parent to render options'}
      </div>
      {'---------------------------------------------------------'}
      <div>
        <select>
          {/* {arrObj
            ? arrObj.properties.options.map((option, index) => {
                return option.value.childOptions.map((childOp) => {
                  return <option>{childOp}</option>;
                });
              })
            : 'Select data will appear here...'} */}
        </select>
      </div>
    </>
  );
}

// const options = element.properties.options.map((el) => {
//   return <option>{el.label}</option>;
// });

//   var student = [10, 11, 21, 30, 31, 14];
// var classes   = [1,   1,  2,  3,  3,  1];

// console.log(
//   student.filter((_, i) => classes[i] === 2)
// );

// let array1 = [1],
//     array2 = [
//       { value: 1, text: 'example1' },
//       { value: 2, text: 'example2' },
//       { value: 3, text: 'example3' },
//       { value: 4, text: 'example4' },
//       { value: 5, text: 'example5' },
//     ],
//     result = array2
//       .filter(({ value }) => array1.includes(value))
//       .map(({ text }) => text);

//   console.log(result);
