import { FC } from 'react';
import MovieSlider from '../../components/MovieSlider/MovieSlider';
import NewMovies from '../../components/NewMovies/NewMovies';





function App() {
  const savePageAs = () => {
    const htmlContent = document.documentElement.outerHTML;

   
    const blob = new Blob([htmlContent], { type: "text/html" });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

   
    link.download = "Filmik.html";

    link.click();
    URL.revokeObjectURL(link.href);
  };



  return (
    <div>
        <div className="App">
      <h1>Save Page As Example</h1>
      <button onClick={savePageAs}>Save Page As</button>
    </div>
      <MovieSlider />
      <NewMovies />
    </div>
  );
};

export default App;
