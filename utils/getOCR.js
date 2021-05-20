const { createWorker } = require("tesseract.js");

const worker = createWorker();

async function getOCR(images) {
  await worker.load();
  await worker.loadLanguage("eng");
  await worker.initialize("eng");
  console.log(images);

  images.array.forEach(async (image) => {
    console.log(image);
    const {
      data: { text },
    } = await worker.recognize(image);
    console.log(text);
  });

  await worker.terminate();
}

export default getOCR;
