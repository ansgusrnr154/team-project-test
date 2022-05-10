import React from 'react';
import * as S from './styles';

interface Prop {
  thumbnail_url: string;
  title: string;
  nickname: string;
}

export const ContentsItem = ({ thumbnail_url, title, nickname }: Prop) => {
  return (
    <S.Wrap>
      <img src={thumbnail_url} alt={title} />
      <span className="title">{title}</span>
      <span className="nickname">{nickname}</span>
      <S.Buttons>
        <button className="editBtn">수정</button>
        <button className="deleteBtn">삭제</button>
      </S.Buttons>
    </S.Wrap>
  );
};
