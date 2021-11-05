import React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ProductSelectSize = (props) => {
  const [size, setSize] = React.useState('');

  const handleSizeChange = (e) => {
    setSize(e.target.value)
  }


    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Size</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={size}
            label="Select Size"
            onChange={handleChange} >
            {/* <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem> */}
            {/** create selectSizeEntry component and map out SKUs here */}
          </Select>
        </FormControl>
      </Box>
    )
}

export default ProductSelectSize