const { createWorker } = require("tesseract.js");

const worker = createWorker({
  logger: (m) => console.log(m), // Add logger here
});

const getOCR = async (images) => {
  console.log(images);
  let pages = [];
  let imgArray = [];

  images.forEach((image) => {
    const img = new Image();
    img.src = image.src;
    imgArray.push(img);
  });
  await worker.load();
  await worker.loadLanguage("eng");

  console.log(imgArray);
  for (let i = 0; i < imgArray.length; i++) {
    await worker.initialize("eng");
    const img = imgArray[i];
    console.log("hey", img);
    await console.log("hello");
    const {
      data: { text },
    } = await worker.recognize(img);
    console.log(text);
    await pages.push(text);
    // console.log(pages);
  }
  await worker.terminate();


  console.log(pages);

  return pages;
};

export default getOCR;
