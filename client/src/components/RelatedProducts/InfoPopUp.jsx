// import React , { useState, useEffect } from 'react';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
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

  // had to do in-line styles because a different class from the carousel was overriding the class styles
  let compareStyles = {
    'marginLeft': '20px',
    'marginTop': '10px',
    'fontWeight': '100',
    'fontSize': '0.7rem'
  }

  let headerStyles = {
    'fontSize': '0.7rem',
    'lineHeight': '1rem',
    'fontWeight': '900',
    'borderBottom': 'none',
    'paddingLeft': '20px',
    'paddingRight': '20px',
    'paddingTop': '5px',
    'paddingBottom': '5px'
  }

  let rowStyles = {
    'borderBottom': 'none',
    'fontSize': '0.7rem',
    'lineHeight': '0.1',
    'fontWeight': '100',
    'paddingTop': '14px',
    'paddingBottom': '14px'
  }

  // need to map over props for current and clicked and char to get rows array
  // still need to remove border from row lines
  const rows = Object.values(combined).map(feature => (createData(feature.current, feature.feature, feature.clicked)));

  return (
    <div>
      <Typography component="div" style={compareStyles}>Comparing</Typography>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell align="center" style={headerStyles}>{props.current.name}</TableCell >
            <TableCell align="center" style={headerStyles}></TableCell>
            <TableCell align="center" style={headerStyles}>{props.info.name}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row" align="center" style={rowStyles}>{row.current}</TableCell>
              <TableCell align="center" style={rowStyles}>{row.feature}</TableCell>
              <TableCell align="center" style={rowStyles}>{row.clicked}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
