import React, { useState } from 'react';
import * as S from './styles';
import useSWR from 'swr';
import { MY_LIKES_API, MY_VIDEOS_API } from 'utils/api';
import { fetcher } from 'utils/swr';
import { IVideoListItem } from 'data/types';
import { VideoList } from 'components';

export const ProfileNavigation = ({ userId }: { userId: number }) => {
  const { data: likes } = useSWR(MY_LIKES_API(userId), fetcher);
  const { data: uploads } = useSWR(MY_VIDEOS_API(userId), fetcher);

  const likedVideoData = likes?.data as IVideoListItem[];
  const uploadedVideoData = uploads?.data as IVideoListItem[];

  const [selectedMenu, setSelectedMenu] = useState<String>('uploaded');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget.dataset;
    value && setSelectedMenu(value);
  };

  return (
    <S.Wrap>
      <S.ProfileNav>
        <button
          className={`${selectedMenu === 'uploaded' ? 'active' : ''}`}
          data-value="uploaded"
          onClick={handleClick}
        >
          Videos
        </button>
        <button
          className={`${selectedMenu === 'liked' ? 'active' : ''}`}
          data-value="liked"
          onClick={handleClick}
        >
          Liked
        </button>
      </S.ProfileNav>
      {selectedMenu === 'uploaded' ? (
        <VideoList videos={uploadedVideoData} message="No Uploaded Videos" />
      ) : (
        <VideoList videos={likedVideoData} message="No Liked Videos" />
      )}
    </S.Wrap>
  );
};
