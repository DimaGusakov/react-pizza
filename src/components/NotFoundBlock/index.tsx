import React from 'react';
import style from './NotFoundBlock.module.scss';

const NotFoundBlock : React.FC = () => {
  return (
    <>
      <div className={style.root}>
        <h1>
          <span>😞</span>
          <br />
          Страница не найдена
        </h1>
        <p>Упс! Что-то пошло не так, этой страницы не существует</p>
      </div>
    </>
  );
}


export default NotFoundBlock;

