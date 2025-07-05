import React from 'react'
import Box from '@mui/material/Box';
import { Card, Typography } from '@mui/material';

// export default function MyFooter() {
//     return(
//         <Box>
//             <h1>Darkup</h1>
//         </Box>
//     );
// }


export default function MyFooter() {
  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
      <Card variant="outlined" sx={{ width: '51.05vw', height: '45vh', p: 2, borderRadius: "12px 12px 0 0", marginTop: '1.85vh' }}>
        <Typography align="center">
          © {new Date().getFullYear()} Darkup. Все права защищены. Или нет. Я не знаю.
        </Typography>
      </Card>
    </Box>
  );
};