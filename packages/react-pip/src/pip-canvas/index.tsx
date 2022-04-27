import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import Pip, { Direction } from './pip';

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
interface Props {
  /**
   * 图片数组
   */
  images: ImageObj[];
  /**
   * 每帧缩小比例，用于正向动画
   */
  scale?: number; //ms
  /**
   * 每帧放大比例，用于反向动画
   */
  scaleReturn?: number; //ms
  /**
   * 画布宽度
   */
  width: number;
  /**
   * 画布高度
   */
  height: number;
}
const PipCanvas = forwardRef((props: Props, ref) => {
  const { images, scale = 0.99, scaleReturn = 1.01, width, height } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pipRef = useRef<Pip>();
  useImperativeHandle(ref, () => ({
    start: () => {
      pipRef.current!.start();
    },
    stop: () => {
      pipRef.current!.stop();
    },
    toggleOrSetDirection: (direction: Direction) => {
      pipRef.current!.toggleOrSetDirection(direction);
    },
  }));
  useEffect(() => {
    if (canvasRef.current) {
      pipRef.current = new Pip({
        canvas: canvasRef.current,
        imgList: images,
        width,
        height,
        scale,
        scaleReturn,
      });
      pipRef.current.init();
    }
  }, []);

  return <canvas width={width} height={height} ref={canvasRef}></canvas>;
});
export default PipCanvas;
