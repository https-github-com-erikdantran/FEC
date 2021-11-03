// import React , { useState, useEffect } from 'react';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import _ from 'underscore';

export default function InfoPopUp(props) {

  function createData(current, char, clicked) {
    return { current, char, clicked };
  }

  // console.log(props.current.features)
  // console.log(props.info.features)

  let current = props.current.features;
  let clicked = props.info.features;
  let combined = [];

  // three scenarios
      // 1. both have the feature so both need to be added into the object
      // 2. only current has feature so that value and null need to be added to object
      // 3. only click has feature so that null and value need to be added to object

  current.forEach(currentFeat => {
    clicked.forEach(clickedFeat => {
      let single = {};
      if (currentFeat.feature === clickedFeat.feature) {
        single['current'] = currentFeat.value
        single['char'] = currentFeat.feature
        single['clicked'] = clickedFeat.value
        combined.push(single);
      }
    })

  })

  console.log(combined);

  // [ { current: 'Rubber', char: 'Sole', clicked: 'Rubber' },
  // { current: null, char: 'Material', clicked: 'FullControlSkin' },
  // { current: 'ControlSupport Arch Bridge', char: 'Mid-Sole', clicked: null },
  // { current: 'Double Stitch', char: 'Stitching', clicked: 'Double Stitch' } ]

  // // console.log(_.uniq(test))

  // // Current product
  // [{ feature: 'Fabric', value: '100% Cotton' },
  //   { feature: 'Cut', value: 'Skinny' }]

  // // Clicked Product
  // [{ feature: 'Fabric', value: 'Canvas' },
  // { feature: 'Buttons', value: 'Brass' }]

  // need to map over props for current and clicked and char to get rows array
  // still need to remove border from row lines
  const rows = [
    createData('Frozen', 159, 6.0),
    createData('Frozen', 159, 6.0)
  ];

  return (
    // <TableContainer component={Paper}>
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell align="center">{props.current.name}</TableCell>
          <TableCell align="center">Characteristics</TableCell>
          <TableCell align="center">{props.info.name}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, i) => (
          <TableRow
            key={i}
          // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row" align="center">{row.current}</TableCell>
            <TableCell align="center">{row.char}</TableCell>
            <TableCell align="center">{row.clicked}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    // </TableContainer>
  );
}
