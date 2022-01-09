import React from 'react';

import { Box, Meter, Text, Tip } from 'grommet';

const amountFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

export const columns = [
  
  {
    property: 'ProductName',
    header: 'ProductName',
  },
  {
    property: 'productCategory',
    header: 'productCategory',
  },
  {
    property: 'Quantity',
    header: 'Quantity',
  },
  {
    property: 'mrp',
    header: 'mrp',
  },
  {
    property: 'costPrice',
    header: 'costPrice',
  },

];

export const groupColumns = [...columns];
const first = groupColumns[0];
groupColumns[0] = { ...groupColumns[1] };
groupColumns[1] = { ...first };
groupColumns[0].footer = groupColumns[1].footer;
delete groupColumns[1].footer;



export const data = [];

for (let i = 0; i < 40; i += 1) {
  data.push({
    name: `Name ${i + 1}`,
    date: `2018-07-${(i % 30) + 1}`,
    percent: (i % 11) * 10,
    paid: ((i + 1) * 17) % 1000,
  });
}

const url="/src/temp_prediction.json"

fetch(url)
  .then(res=>res.json())
  .then(res=>{
    // console.log(res);
    Data(res);
    })

export function Data(res){
console.log(res.orderlist);

};

