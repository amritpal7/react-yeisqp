import React from 'react';
function Playground() {
  // var arObj = [
  //   { name: 'Jon', age: 24 },
  //   { name: 'Mark', age: 32 },
  //   { name: 'Kacy', age: 22 },
  // ];

  // var ar2 = []; // create empty array to hold copy

  // for (var i = 0, len = arObj.length; i < len; i++) {
  //   ar2[i] = {}; // empty object to hold properties added below
  //   for (var prop in arObj[i]) {
  //     ar2[i][prop] = arObj[i][prop]; // copy properties from arObj to ar2
  //   }
  // }

  // // modify property value in copy
  // ar2[1].name = 'Amrit';
  // // view property value in original (unchanged)
  // console.log(arObj); // Mark
  // console.log(ar2); // Mark

  //variables predefined
  var category = ['Automobile', 'Fashion', 'Music Instruments'];
  var products = [
    'LandRover',
    'Guitar',
    'vintage',
    'Drums',
    'Maserati',
    'Piano',
  ];

  //create a object categories where later we will add our products!
  var categories = {};

  //add values(category & products)
  categories[category[0]] = [products[0], products[4]]; //Automobile
  categories[category[1]] = [products[2]]; //Fashion
  categories[category[2]] = [products[1], products[3], products[5]];
  // console.log(categories)
  return (
    <>
      <ul>
        {categories.Automobile.map((autos) => {
          <li>{autos}</li>;
        })}
      </ul>
      <ul>
        {categories.Automobile.map((autos) => {
          <li>{autos}</li>;
        })}
      </ul>
      <ul>
        {categories.Automobile.map((autos) => {
          <li>{autos}</li>;
        })}
      </ul>
    </>
  );
}

export default Playground;
