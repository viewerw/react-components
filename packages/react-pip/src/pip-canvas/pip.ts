interface InnerImg {
  top: number;
  left: number;
  width: number;
  height: number;
}
interface ImageObj {
  link: string;
  width: number;
  height: number;
  innerImg: InnerImg;
  image?: HTMLImageElement;
}
interface Ipip {
  imgList: ImageObj[];
  canvas: HTMLCanvasElement;
  radio?: number;
  index?: number;
  scale?: number;
  scaleReturn?: number;
  width: number;
  height: number;
}
export type Direction = 'forward' | 'return';
export default class Pip {
  imgList: ImageObj[];
  canvas: HTMLCanvasElement;
  radio: number;
  index: number;
  scale: number;
  scaleReturn: number;
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D | null;
  timer: number | undefined;
  direction: Direction = 'forward';

  constructor({
    canvas,
    imgList = [],
    radio = 1,
    index = 0,
    scale = 0.99,
    scaleReturn = 0.99,
    width,
    height,
  }: Ipip) {
    this.imgList = imgList;
    this.radio = radio;
    this.index = index;
    this.scale = scale;
    this.scaleReturn = scaleReturn;
    this.width = width;
    this.height = height;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  loadPageImg() {
    const loadPromises = this.imgList.map(
      (item) =>
        new Promise<ImageObj>((resolve, reject) => {
          const img = new Image();
          img.src = item.link;
          item.image = img;
          img.onload = () => {
            resolve(item);
          };
          img.onerror = () => reject();
        }),
    );
    return Promise.all(loadPromises);
  }
  async init() {
    await this.loadPageImg();
    this.draw();
  }

  start() {
    if (this.timer) return;
    const render = () => {
      if (this.direction === 'forward') {
        this.radio = this.radio * this.scale;
      } else {
        this.radio = this.radio * this.scaleReturn;
      }

      this.timer = requestAnimationFrame(render);
      this.draw();
    };
    render();
  }
  stop() {
    if (this.timer) {
      cancelAnimationFrame(this.timer);
    }
    this.timer = undefined;
  }
  toggleOrSetDirection(direction: Direction) {
    if (direction) {
      this.direction = direction;
    } else {
      this.direction = this.direction === 'forward' ? 'return' : 'forward';
    }
  }
  draw() {
    const drawImg = (imgNext: ImageObj, imgCur: ImageObj) => {
      const containerImage = imgNext.image;
      const innerImage = imgCur.image;
      this.drawImgOversize(
        containerImage!,
        imgNext.width,
        imgNext.height,
        imgNext.innerImg.width,
        imgNext.innerImg.height,
        imgNext.innerImg.left,
        imgNext.innerImg.top,
        this.radio,
      );
      this.drawImgMinisize(
        innerImage!,
        imgCur.width,
        imgCur.height,
        imgNext.width,
        imgNext.height,
        imgNext.innerImg.width,
        imgNext.innerImg.height,
        imgNext.innerImg.left,
        imgNext.innerImg.top,
        this.radio,
      );
    };
    if (this.direction === 'forward') {
      // 不是最后一张图片
      if (this.index + 1 !== this.imgList.length) {
        // 缩小到最小了
        if (
          this.radio <
          this.imgList[this.index + 1].innerImg.width / this.imgList[this.index + 1].width
        ) {
          if (this.index + 2 === this.imgList.length) {
            this.showEnd();
            return;
          }
          this.index++;
          this.radio = 1;
        }
        const imgNext = this.imgList[this.index + 1];
        const imgCur = this.imgList[this.index];
        drawImg(imgNext, imgCur);
      }
    } else {
      if (this.index >= 0) {
        if (this.radio >= 1) {
          if (this.index === 0) {
            this.showEnd();
            return;
          }
          this.index--;
          this.radio =
            this.imgList[this.index + 1].innerImg.width / this.imgList[this.index + 1].width;
        }
        const imgNext = this.imgList[this.index + 1];
        const imgCur = this.imgList[this.index];
        drawImg(imgNext, imgCur);
      }
    }
  }
  showEnd() {
    console.log('end');
    this.stop();
  }
  drawImgOversize(
    image: CanvasImageSource,
    width: number,
    height: number,
    innerWidth: number,
    innerHeight: number,
    innerLeft: number,
    innerTop: number,
    radio: number,
  ) {
    this.ctx!.drawImage(
      image,
      innerLeft - (innerWidth / radio - innerWidth) * (innerLeft / (width - innerWidth)),
      innerTop - (innerHeight / radio - innerHeight) * (innerTop / (height - innerHeight)),
      innerWidth / radio,
      innerHeight / radio,
      0,
      0,
      this.width,
      this.height,
    );
  }
  drawImgMinisize(
    image: CanvasImageSource,
    curWidth: number,
    curHeight: number,
    nextWidth: number,
    nextHeight: number,
    nextInnerWidth: number,
    nextInnerHeight: number,
    nextInnerLeft: number,
    nextInnerTop: number,
    radio: number,
  ) {
    this.ctx!.drawImage(
      image,
      0,
      0,
      curWidth,
      curHeight,
      ((nextInnerWidth / radio - nextInnerWidth) *
        (nextInnerLeft / (nextWidth - nextInnerWidth)) *
        radio *
        this.width) /
        nextInnerWidth,
      ((nextInnerHeight / radio - nextInnerHeight) *
        (nextInnerTop / (nextHeight - nextInnerHeight)) *
        radio *
        this.height) /
        nextInnerHeight,
      this.width * radio,
      this.height * radio,
    );
  }
}
