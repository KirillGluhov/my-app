import React from 'react';
import ReactDOM from 'react-dom/client';
import {Header} from "./components/Header";
import { Main } from "./components/Main"
import "../src/styles/root.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <>
      <Header styleOfElement="plain" proportion="9/3" mainColor="#D9D9D9" secondColor="#7B7B7B"/>
      <Main mainColor='#D9D9D9' secondColor="#7B7B7B" top="5" bot="3"/>
    </>
  </React.StrictMode>
);

/* styleOfElement - строка со значением plain, outlined, soft, solid. Стиль из MUI JoyUI для элементов
proportion - два целых числа, разделённых чертой деления и сумма из двух чисел = 12. Соотношение размера между профиль и остальными кнопками с логотипом по ширине
mainColor - задний цвет
secondColor - цвет остальных элементов

top - отступ внешний сверху
bot - отступ между карточками
*/
