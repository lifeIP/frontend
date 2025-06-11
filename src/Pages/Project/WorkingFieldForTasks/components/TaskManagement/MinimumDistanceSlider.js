import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';

function valuetext(value) {
  return `${value}°C`;
}

const minDistance = 0;

export default function MinimumDistanceSlider() {
  const [value1, setValue1] = React.useState([80, 90]);

  const handleChange1 = (event, newValue, activeThumb) => {
    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        track={false}
        aria-labelledby="track-false-range-slider"
        getAriaLabel={() => 'Minimum distance'}
        value={value1}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
      />
      <Typography>train: {value1[0]}%, test: {value1[1]-value1[0]}%, valid: {100 - value1[1]}%</Typography>
    </Box>
  );
}
