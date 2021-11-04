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

  function createData(current, feature, clicked) {
    return { current, feature, clicked };
  }

  let current = props.current.features;
  let clicked = props.info.features;
  let combined = {};

  current.forEach(currentFeat => {
    combined[currentFeat.feature] = { current: currentFeat.value, feature: currentFeat.feature, clicked: null };
  });
  clicked.forEach(clickedFeat => {
    if (combined[clickedFeat.feature]) {
      combined[clickedFeat.feature].clicked = clickedFeat.value;
    } else {
      combined[clickedFeat.feature] = { current: null, feature: clickedFeat.feature, clicked: clickedFeat.value };
    }
  })

  // need to map over props for current and clicked and char to get rows array
  // still need to remove border from row lines
  const rows = Object.values(combined).map(feature => (createData(feature.current, feature.feature, feature.clicked)));

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
            <TableCell align="center">{row.feature}</TableCell>
            <TableCell align="center">{row.clicked}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    // </TableContainer>
  );
}
