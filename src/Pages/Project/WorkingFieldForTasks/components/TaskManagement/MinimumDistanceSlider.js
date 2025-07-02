import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';
import axios from 'axios';
import settings from '../../../../../settings.json';

function valuetext(value) {
  return `${value}°C`;
}

const minDistance = 0;

export default function MinimumDistanceSlider() {
  const [value1, setValue1] = React.useState([70, 90]);
  const [imageCount, setImageCount] = React.useState(0);
  
  async function getTaskImageCount() {
      let url = `/get_task_image_count/${JSON.parse(localStorage.getItem('last_task_id'))}`;
      try {
          axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
          const res = await axios.get(`${settings.server.addr}${url}`);
          if (res.status === 200 || res.status === 201) {
            setImageCount(res.data.image_count);
          } else {
          }
      } catch (err) {
          console.error('Ошибка загрузки:', err.message);
      }
  }

  React.useEffect(()=>{
    getTaskImageCount();
  },[])

  

  const handleChange1 = (event, newValue, activeThumb) => {
    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
    console.log(Math.floor(imageCount*(Number((imageCount-value1[1])/100))))
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
      <Typography>Всего размеченных фотографий: {imageCount}</Typography>
      <Typography>train: {value1[0]}%, test: {value1[1]-value1[0]}%, valid: {100 - value1[1]}%</Typography>
      <Typography>train: {Math.ceil(imageCount*(Number(value1[0]/100)))}, 
        test: {Math.floor(imageCount*(Number((value1[1]-value1[0])/100)))}, 
        valid: {(imageCount - Math.ceil(imageCount*(Number(value1[0]/100))) - 
        Math.floor(imageCount*(Number((value1[1]-value1[0])/100))))}</Typography>
    
    </Box>
  );
}
