import { FC } from 'react';
import MovieSlider from '../../components/MovieSlider/MovieSlider';
import NewMovies from '../../components/NewMovies/NewMovies';
import MobileDownload from '../../components/MobileDownload/MobileDownload';
const HomePage: FC = () => {
  return (
    <div>
      <MovieSlider />
      <NewMovies />
    </div>
  );
};

export default HomePage;
