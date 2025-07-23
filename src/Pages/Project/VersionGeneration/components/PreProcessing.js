import { ButtonBase, Card, CardContent, Icon, IconButton, ImageList, ImageListItem, styled, Typography } from '@mui/material';
import React from 'react';





// function PhotoGridButtons() {
//   const StyledImageList = styled(ImageList)({
//     width: '100%',
//   });

//   // Массив объектов с фотографиями и названиями
//   const photosData = [
//     {
//       imgUrl: 'https://avatars.mds.yandex.net/i?id=f8f02c8dbc22e95cd396670598ba7112_l-12938831-images-thumbs&n=13',
//       title: 'Фото 1'
//     },
//     {
//       imgUrl: 'https://avatars.mds.yandex.net/i?id=2a000001982c92e2c74a974626d40be786b5-469746-fast-images&n=13',
//       title: 'Фото 2'
//     },
//     {
//       imgUrl: 'https://i.pinimg.com/originals/7d/2e/9e/7d2e9eb4e19f39ca9747eaba0c579586.jpg',
//       title: 'Фото 3'
//     },
//     // Добавьте остальные фото сюда...
//   ];
//   return (
//     <StyledImageList cols={3}>
//       {photosData.map((item) => (
//         <ImageListItem key={item.imgUrl}>
//           {/* Кнопка-картинка */}
//           <ButtonBase onClick={() => {
//             console.log("clicked: " + item.title);
//           }}>
//             <img src={item.imgUrl} alt={item.title} style={{ width: '100%', height: 'auto' }} />
//           </ButtonBase>
//           <Typography variant="caption">{item.title}</Typography>
//         </ImageListItem>
//       ))}
//     </StyledImageList>
//   );
// }

function OriginalViewer({ image_id }) {
  // Тут должен получаться оригинал изображения по id
  const photosData = [
    {
      imgUrl: 'https://s.optlist.ru/i/97/66/14bde26456138dd6-9766-1.jpg',
      title: 'Фото 1'
    },
  ]
  return (
    <>
      <img src={photosData[0].imgUrl} alt={photosData[0].title} style={{ width: '100%', height: 'auto' }} />
      <Typography variant="caption">Оригинальное изображение</Typography>
    </>
  );
}

function IsolateObject() {
  const photosData = [
    {
      imgUrl: 'https://s.optlist.ru/i/97/66/14bde26456138dd6-9766-1.jpg',
      title: 'Фото 1'
    },
  ]
  return (
    <>
      <ImageListItem>
        <ButtonBase onClick={() => {
          // console.log("clicked: " + item.title);
        }}>
          <img src={photosData[0].imgUrl} alt={photosData[0].title} style={{ width: '100%', height: 'auto' }} />
        </ButtonBase>
        <Typography variant="caption">Изолировать объект</Typography>
      </ImageListItem>
    </>
  );
}


function ChangeSize(){
// Изменение размеров
  const photosData = [
    {
      imgUrl: 'https://s.optlist.ru/i/97/66/14bde26456138dd6-9766-1.jpg',
      title: 'Фото 1'
    },
  ]
  return (
    <>
      <ImageListItem>
        <ButtonBase onClick={() => {
          // console.log("clicked: " + item.title);
        }}>
          <img src={photosData[0].imgUrl} alt={photosData[0].title} style={{ width: '100%', height: 'auto' }} />
        </ButtonBase>
        <Typography variant="caption">Изменение размеров</Typography>
      </ImageListItem>
    </>
  );
}

function Grayscale(){

  const photosData = [
    {
      imgUrl: 'https://s.optlist.ru/i/97/66/14bde26456138dd6-9766-1.jpg',
      title: 'Фото 1'
    },
  ]
  return (
    <>
      <ImageListItem>
        <ButtonBase onClick={() => {
          // console.log("clicked: " + item.title);
        }}>
          <img src={photosData[0].imgUrl} alt={photosData[0].title} style={{ width: '100%', height: 'auto' }} />
        </ButtonBase>
        <Typography variant="caption">grayscale</Typography>
      </ImageListItem>
    </>
  );
}

function ActionsGrid() {

  const StyledImageList = styled(ImageList)({
    width: '100%',
  });

  return (
    <StyledImageList cols={3}>
      <IsolateObject />
      <ChangeSize/>
      <Grayscale/>
    </StyledImageList>
  );
}

function Result(){

  const photosData = [
    {
      imgUrl: 'https://cache3.youla.io/files/images/780_780/5b/29/5b291688047cb15026429f4e.jpg',
      title: 'Фото 1'
    },
  ]
  return (
    <>
      <img src={photosData[0].imgUrl} alt={photosData[0].title} style={{ width: '100%', height: 'auto' }} />
      <Typography variant="caption">Результат предобработки</Typography>
    </>
  );
}

export default function PreProcessing() {

  return (<>
    <Card
      sx={{
        borderRadius: "12px",
        width: "51.05vw",
        marginBottom: '1.85vh',
      }}>
      <CardContent>
        <Typography
          gutterBottom
          variant="h3"
          component="div"
          textAlign="center">
          Предварительная обработка
        </Typography>
      </CardContent>
      {/* <CardContent>
        <OriginalViewer id={0} />
      </CardContent> */}
      <CardContent>
        <ActionsGrid />
      </CardContent>
      {/* <CardContent>
        <Result/>
      </CardContent> */}
    </Card>
  </>);
}