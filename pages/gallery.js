import { useStoreState } from "easy-peasy";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import Close from "../assets/close";
import LeftArrowIcon from "../assets/left-arrow";

const Gallery = () => {
  const { images } = useStoreState((state) => state);
  const router = useRouter();

  return (
    <>
      <Link href="/">
        <a>
          <LeftArrowIcon />
        </a>
      </Link>
      <div className="flex mt-12 flex-wrap flex-shrink">
        {images.slice(1).map((dataURL) => (
          <div className="relative">
            <img className="py-3 px-2" src={dataURL} />
            <Close />
          </div>
        ))}
      </div>
    </>
  );
};

export default Gallery;
