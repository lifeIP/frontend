import { useCallback, useState } from 'react';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function DragDropFileUpload({ onFileUpload }) {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event) => {
    event.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      setDragOver(false);
      if (event.dataTransfer.files && event.dataTransfer.files[0]) {
        onFileUpload(event.dataTransfer.files);
      }
    },
    [onFileUpload]
  );

  const handleChange = useCallback(
    (event) => {
      if (event.target.files && event.target.files[0]) {
        onFileUpload(event.target.files);
      }
    },
    [onFileUpload]
  );

  return (
    <Paper
      variant="outlined"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      sx={{
        border: dragOver ? '2px dashed #000' : '2px dashed #aaa',
        textAlign: 'center',
        cursor: 'pointer',
        // background: dragOver ? '#eee' : '#fafafa',
      }}
    >
      <input
        accept=".png, .jpg, .jpeg"
        style={{ display: 'none' }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={handleChange}
      />
      <label htmlFor="raised-button-file">
        <Box display="flex" flexDirection="column" alignItems="center"
            sx={{
                paddingTop: "20px",
                paddingBottom: "20px",
            }}
        >
          <IconButton color="primary" aria-label="upload picture" component="span">
            <CloudUploadIcon style={{ fontSize: 60 }} />
          </IconButton>
          <Typography>Перетащите файлы сюда или нажмите, чтобы выбрать файлы</Typography>
        </Box>
      </label>
    </Paper>
  );
}

export default DragDropFileUpload;