import Carousel from "./homePageSlide/Carousel";
import {slides} from "./homePageSlide/Data"

function ContainerImages() {
  return (
    <div className="containerimage">
      <Carousel images={slides} />
    </div>
  );
}

export default ContainerImages;
