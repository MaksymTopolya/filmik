import React, { useEffect, useRef } from 'react';
import { FaYoutube } from 'react-icons/fa';
import { useTypedDispatch, useTypedSelector } from '../../hooks';
import css from './YouTubePlayer.module.scss';
import { RootState } from '../../redux/store';
import { getYoutubeVideoTrailer } from '../../MoviesApi';

interface MyYouTubePlayerProps {
  movieId: string;
  myDispatch: (id: number) => ReturnType<typeof getYoutubeVideoTrailer>;
  mySelector: (state: RootState) => { key: string };
}

const MyYouTubePlayer: React.FC<MyYouTubePlayerProps> = ({
  movieId,
  myDispatch,
  mySelector,
}) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const dispatch = useTypedDispatch();
  const video = useTypedSelector(mySelector);

  useEffect(() => {
    const fetchVideoTrailer = async () => {
      try {
        await dispatch(myDispatch(Number(movieId)));
      } catch (error) {
        console.error('Error fetching video trailer:', error);
      }
    };

    fetchVideoTrailer();
  }, [dispatch, movieId, myDispatch]);

  if (!video?.key) {
    return <div id="player" ref={playerRef}></div>;
  }

  return (
    <div className={css.player}>
      <a
        href={`https://www.youtube.com/watch?v=${video.key}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaYoutube style={{ fontSize: '92px', verticalAlign: 'middle' }} />
      </a>
    </div>
  );
};

export default MyYouTubePlayer;
