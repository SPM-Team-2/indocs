import { opencv as cv } from "opencv.js";
import jimp from "jimp";

/* 
@param image: image
Output: Contol Points
*/

function returnControlPoints(image) {
    let imageCopy = preProcess(image)
    imageCopy = edgeDetector(imageCopy)
    let ar = findContours(imageCopy)
    return ar;
}

/* 
@param image: image
@param controlPointArray: [topLeft-X, topLeft-Y, topRight-X, topRight-Y, bottomRight-X, bottomRight-Y, bottomLeft-X, bottomRight-Y]
Output: Scanned Image
*/

function scanImage(image,controlPointArray){
    let imageCopy = orderPointsAndTransform(imageCopy, ar)
    imageCopy = scanFilter(imageCopy)
    return imageCopy
}


/* ---------------------- OpenCV utility functions ---------------------- */

// B/W conversion and Gaussian Blur
function preProcess(image) {
    cv.cvtColor(image, image, cv.COLOR_RGB2GRAY)
    let newImage = new cv.Mat();
    let ksize = new cv.Size(5, 5);
    cv.GaussianBlur(image, newImage, ksize, 0, 0, cv.BORDER_DEFAULT);
    return newImage
}

// Edge Detector
function edgeDetector(image) {
    let newImage = new cv.Mat();
    cv.Canny(image, newImage, 50, 100, 3, false);
    return newImage
}


function findContours(image) {
    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();

    cv.findContours(image, contours, hierarchy, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE);

    let countArray = [];

    for (let i = 0; i < contours.size(); i++) {
        let cnt = contours.get(i);
        countArray.push(cnt)
    }

    countArray.sort((item1, item2) => {
        return cv.contourArea(item1, false) > cv.contourArea(item2, false) ? -1 : cv.contourArea(item1, false) > cv.contourArea(item2, false) ? 1 : 0;
    });
    countArray = countArray.slice(0, 5);

    let foundContour = null;
    let ar = [];
    for (let i = 0; i < countArray.length; i++) {
        let cnt = countArray[i];
        let perim = cv.arcLength(cnt, true);
        let approx = new cv.Mat();

        cv.approxPolyDP(cnt, approx, 0.02 * perim, true);
        if (approx.rows == 4) {
            foundContour = approx;
            console.log('Found One!!')
            ar = defineCornerPointsFromMatObject(foundContour);
            break;
        }
    }
    if (foundContour == null) {
        let width = image.cols;
        let height = image.rows;
        // Custom initial points
        // top-left,top-right,bottom-right,bottom-left
        ar = [20, 20, width - 20, 20, width - 20, height - 20, 20, height - 20]
    }
    return ar;
}

function defineCornerPointsFromMatObject(foundContour) {
    let corner1 = new cv.Point(foundContour.data32S[0], foundContour.data32S[1]);
    let corner2 = new cv.Point(foundContour.data32S[2], foundContour.data32S[3]);
    let corner3 = new cv.Point(foundContour.data32S[4], foundContour.data32S[5]);
    let corner4 = new cv.Point(foundContour.data32S[6], foundContour.data32S[7]);

    let cornerArray = [{ corner: corner1 }, { corner: corner2 }, { corner: corner3 }, { corner: corner4 }];
    cornerArray.sort((item1, item2) => { return (item1.corner.y < item2.corner.y) ? -1 : (item1.corner.y > item2.corner.y) ? 1 : 0; }).slice(0, 5);

    let tl = cornerArray[0].corner.x < cornerArray[1].corner.x ? cornerArray[0] : cornerArray[1];
    let tr = cornerArray[0].corner.x > cornerArray[1].corner.x ? cornerArray[0] : cornerArray[1];
    let bl = cornerArray[2].corner.x < cornerArray[3].corner.x ? cornerArray[2] : cornerArray[3];
    let br = cornerArray[2].corner.x > cornerArray[3].corner.x ? cornerArray[2] : cornerArray[3];
    let ar = [tl.corner.x, tl.corner.y, tr.corner.x, tr.corner.y, br.corner.x, br.corner.y, bl.corner.x, bl.corner.y];
    return ar;
}


// transform the image using acquired control points
function orderPointsAndTransform(image, ar) {
    let tlX = ar[0], tlY = ar[1];
    let trX = ar[2], trY = ar[3];
    let brX = ar[4], brY = ar[5];
    let blX = ar[6], blY = ar[7];

    let widthBottom = Math.hypot(brX - blX, brY - blY);
    let widthTop = Math.hypot(trX - tlX, trY - tlY);

    let theWidth = (widthBottom > widthTop) ? widthBottom : widthTop;

    let heightRight = Math.hypot(trX - brX, trY - brY);
    let heightLeft = Math.hypot(tlX - blX, trY - blY);

    let theHeight = (heightRight > heightLeft) ? heightRight : heightLeft;

    let finalDestCoords = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, theWidth - 1, 0, theWidth - 1, theHeight - 1, 0, theHeight - 1]);
    let srcCoords = cv.matFromArray(4, 1, cv.CV_32FC2, [tlX, tlY, trX, trY, brX, brY, blX, blY]);
    let dsize = new cv.Size(theWidth, theHeight);

    let M = cv.getPerspectiveTransform(srcCoords, finalDestCoords)
    let dstImage = new cv.Mat();
    cv.warpPerspective(image, dstImage, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
    return dstImage;
}

// Generate points array from control points
function generatePointArray(tl, tr, bl, br) {
    let tlX = tl[0], tlY = tl[1];
    let trX = tr[0], trY = tr[1];
    let blX = bl[0], blY = bl[1];
    let brX = br[0], brY = br[1];
    let ar = [tlX, tlY, trX, trY, blX, blY, brX, brY];
    return ar;
}


// Maintain aspect ratio: Use Jimp
function reSizeImage(image, width, height) {
    let dst = new cv.Mat();
    let dsize = new cv.Size(width, height);
    cv.resize(image, dst, dsize, 0, 0, cv.INTER_AREA);
    return dst;
}


// Image Details
function logImageDetails(src) {
    console.log('image width: ' + src.cols + '\n' +
        'image height: ' + src.rows + '\n' +
        'image size: ' + src.size().width + '*' + src.size().height + '\n' +
        'image depth: ' + src.depth() + '\n' +
        'image channels ' + src.channels() + '\n' +
        'image type: ' + src.type() + '\n');
}


/* --------------- JIMP FUNCTIONS --------------- */

// threshold function
function scanFilter(image) {
    const newImage = await jimp.read(image);
    newImage.threshold({ max: 150 });
    return newImage;
}

// invert function
function invertFilter(image) {
    const newImage = await jimp.read(image);
    newImage.invert();
    return newImage
}

// sepia image
function sepiaFilter(image) {
    const newImage = await jimp.read(image);
    newImage.sepia();
    return newImage
}

// opacity image
function changeOpacity(image, opacity) {
    const newImage = await jimp.read(image);
    newImage.opacity(opacity);
    return newImage
}

// Fades each pixel by a factor between 0 and 1
function fadePixels(image, fadeMeasure) {
    const newImage = await jimp.read(image);
    newImage.fade(fadeMeasure);
    return newImage
}
