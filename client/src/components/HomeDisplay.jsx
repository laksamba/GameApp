import { useEffect, useState } from "react";

import rockPaper from '../../Images/image1.png';
import tictactoe from '../../Images/tictac.png';
import memory from '../../Images/memory.png';

function HomeDisplay() {
  const [currentImage, setCurrentImage] = useState(0);

  const DesktopImages = [rockPaper, tictactoe, memory];

  const nextImage = () => {
    if (DesktopImages.length - 1 > currentImage) {
      setCurrentImage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (DesktopImages.length - 1 > currentImage) {
        nextImage();
      } else {
        setCurrentImage(0);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className="container mt-2">
      <div className={`flex flex-col gap-8 justify-center h-[70vh]  p-5`}>
        <div className="flex gap-2  ">
          <div className=" h-60 w-full">
            <img src={rockPaper} alt="" className="h-full w-full object-fill" />
          </div>
          <div className="h-60 w-full">
            <img src={memory} alt="" className="h-full w-full object-fill" />
          </div>
        </div>
        <div className=" flex h-96  overflow-hidden object-cover">
          {DesktopImages.map((imageUrl, index) => {
            return (
              <div
                key={index}
                className="w-full h-full min-w-full min-h-full transition-all"
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={imageUrl} className="w-full h-full" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  
  );
}

export default HomeDisplay;