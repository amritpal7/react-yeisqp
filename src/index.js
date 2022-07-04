import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import Fruit from './Fruits';
import DynamicFields from './DynamicFields';
import Playground from './Playground';
import SelectBox from './Select';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    {/* <App /> */}
    {/* <Playground /> */}
    {/* <SelectBox /> */}
    <DynamicFields />
  </StrictMode>
);
