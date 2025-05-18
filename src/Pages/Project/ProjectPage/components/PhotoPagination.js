import React, { useEffect, useState } from 'react';
import { ButtonGroup, Button, Typography, Card, CardContent, Box, Fab, Grid } from '@mui/material';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import settings from "../../../../settings.json"
import ImageViewer from './ImageViewer';
import { useNavigate } from 'react-router';


function PhotoPagination({ getListOfImages}) {
  const navigate = useNavigate()
  const [totalPhotos, setTotalPhotos] = useState(0);
  const [unwrap, setUnwrap] = useState(false);
  const [listImages, setListImages] = useState([]);

  async function getListOfImages(project_id, startIndex) {
    if (startIndex == 0) return;
    let url = "/get_projects_images_list/" + project_id + "/" + startIndex;

    try {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
      const res = await axios.get(`${settings.server.addr}${url}`);

      if (res.status === 200 || res.status === 201) {
        // setUnwrap(false);
        setListImages(res.data.ids);
        setTotalPhotos(res.data.total_images_count)
        localStorage.setItem("list_of_ids_images", JSON.stringify({ startIndex: startIndex, ids: res.data.ids }));
        setUnwrap(true);
      } else {
        // throw new Error('Ошибка при отправке данных');
      }
    } catch (err) {
      console.error(err);
      // throw err;
    }
  }
  

  useEffect(() => {
    if (unwrap) {
      getListOfImages(localStorage.getItem("last_project_id"), 1);
    }
  }, [unwrap]);
  const photosPerPage = 50;
  const pagesCount = Math.ceil(totalPhotos / photosPerPage) + 1; // Всего страниц

  const [currentPage, setCurrentPage] = useState(1); // Текущая страница

  // Перемещаемся на следующую страницу
  const nextPage = () => {
    if (currentPage < pagesCount) {
      getListOfImages(localStorage.getItem('last_project_id'), currentPage + 1);
      setCurrentPage(currentPage + 1);
    }
  };

  // Перемещаемся на предыдущую страницу
  const previousPage = () => {
    if (currentPage - 1 > 0) {
      getListOfImages(localStorage.getItem('last_project_id'), currentPage - 1);
      setCurrentPage(currentPage - 1);
    }
  };

  // Форматируем номер страницы кратно 50
  const startPhotoNumber = currentPage * photosPerPage - 50 + 1;

  return (
    <>
      <Card sx={{ borderRadius: "12px", width: "51.05vw", minHeight: "100px", marginTop: '1.85vh' }}>
        <CardContent>
          <Typography gutterBottom variant="h3" component="div" textAlign="center">
            Фотографии
          </Typography>
        </CardContent>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Fab size="medium" aria-label="добавить фото в проект" onClick={() => { navigate("/upload-images") }}>
              <AddIcon />
            </Fab>
            <Fab size="medium" aria-label="Развернуть список" sx={{ marginLeft: "10px" }} onClick={() => { setUnwrap(!unwrap) }}>
              {unwrap ? <KeyboardArrowUpOutlinedIcon /> : <KeyboardArrowDownOutlinedIcon />}
            </Fab>
          </Box>
        </CardContent>
      </Card>

      {unwrap ? (
        <>
          <Card sx={{ borderRadius: "12px", width: "51.05vw", marginTop: '1.85vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CardContent>
              <ButtonGroup variant="contained" color="primary" aria-label="pagination buttons group">
                <Button disabled={currentPage <= 1} onClick={previousPage}>Назад</Button>
                <Button disabled={currentPage >= pagesCount - 1} onClick={nextPage}>Вперед</Button>
              </ButtonGroup>
            </CardContent>
            <Typography variant="h6" gutterBottom>
              Фото: {startPhotoNumber}/{startPhotoNumber + JSON.parse(localStorage.getItem("list_of_ids_images")).ids.length - 2} из {totalPhotos}
            </Typography>

          </Card>
          <Box sx={{ width: "51.05vw" }}>
            <Grid container spacing={1} sx={{ marginTop: '1vh' }}>
              {listImages.map((id) => (
                <Grid size={3}>
                  <ImageViewer image_id={id} setCanvasSize={() => { }}/>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Card sx={{ borderRadius: "12px", width: "51.05vw", marginTop: '1.85vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CardContent>
              <ButtonGroup variant="contained" color="primary" aria-label="pagination buttons group">
                <Button disabled={currentPage <= 1} onClick={previousPage}>Назад</Button>
                <Button disabled={currentPage >= pagesCount - 1} onClick={nextPage}>Вперед</Button>
              </ButtonGroup>
            </CardContent>
            <Typography variant="h6" gutterBottom>
              Фото: {startPhotoNumber}/{startPhotoNumber + JSON.parse(localStorage.getItem("list_of_ids_images")).ids.length - 2} из {totalPhotos}
            </Typography>

          </Card>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default PhotoPagination;