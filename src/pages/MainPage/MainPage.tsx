import {
  PlayerMenu,
  VideoPlayer,
  DescriptionBox,
  MainHeader
} from 'components';
import * as S from './styles';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { VIDEO_ITEM_API } from 'utils/api';
import { fetcher } from 'utils/swr';
import { IVideoWithUser } from 'data/types';
import { Loading } from 'components';

export const MainPage = () => {
  const { videoId = 6 } = useParams();
  const { data: videoData } = useSWR<IVideoWithUser>(
    VIDEO_ITEM_API(Number(videoId)),
    fetcher
  );

  return (
    <S.Wrap>
      {videoData ? (
        <>
          <MainHeader />
          <VideoPlayer video_url={videoData.video_url} />
          <PlayerMenu profile_image_url={videoData.user.profile_image_url} />
          <DescriptionBox
            title={videoData.title}
            description={videoData.description}
          />
        </>
      ) : (
        <Loading />
      )}
    </S.Wrap>
  );
};