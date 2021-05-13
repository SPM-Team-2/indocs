import { useStoreActions, useStoreState } from "easy-peasy";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import Close from "../assets/close";
import LeftArrowIcon from "../assets/left-arrow";

const Gallery = () => {
  const { images } = useStoreState((state) => state);
  const { removeImage } = useStoreActions((action) => action);

  return (
    <div>
      <Link href="/">
        <a>
          <LeftArrowIcon />
        </a>
      </Link>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          className="flex mt-12 flex-wrap flex-shrink"
          layoutId="gallery"
        >
          {images.slice(1).map((dataURL, index) => (
            <motion.div
              key={index}
              exit={{
                scale: 0.7,
                opacity: 0,
              }}
              className="relative border-2 border-gray-400 mx-2 overflow-hidden"
            >
              <img className="py-3 px-2" src={dataURL} />
              <div
                className="absolute top-[80%] left-[85%] w-[20%] bg-gray-400 rounded-full p-4 sm:p-7"
                onClick={() => removeImage(index + 1)}
              >
                <Close imageIndex={index} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
