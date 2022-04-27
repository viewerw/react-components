import React, { useRef } from 'react';
import { PipCanvas } from '@viewer/react-pip';

const images = [
  {
    link: 'http://static.ws.126.net/f2e/ent/ent_painting2017/images/cover_v2.jpg',
    width: '750',
    height: '1206',
  },
  {
    link: 'http://static.ws.126.net/f2e/ent/ent_painting2017/images/p1.jpg',
    width: '1875',
    height: '3015',
    innerImg: {
      width: '152',
      height: '244',
      left: '370',
      top: '1068',
    },
  },
  {
    link: 'http://static.ws.126.net/f2e/ent/ent_painting2017/images/p2.jpg',
    width: '1875',
    height: '3015',
    innerImg: {
      width: '556',
      height: '894',
      left: '1251',
      top: '1050',
    },
  },
  {
    link: 'http://static.ws.126.net/f2e/ent/ent_painting2017/images/p3.jpg',
    width: '1875',
    height: '3015',
    innerImg: {
      width: '166',
      height: '267',
      left: '114',
      top: '897',
    },
  },
  {
    link: 'http://static.ws.126.net/f2e/ent/ent_painting2017/images/p4.jpg',
    width: '1875',
    height: '3015',
    innerImg: {
      width: '194',
      height: '312',
      left: '85',
      top: '1402',
    },
  },
  {
    link: 'http://static.ws.126.net/f2e/ent/ent_painting2017/images/p5.jpg',
    width: '1875',
    height: '3015',
    innerImg: {
      width: '102',
      height: '164',
      left: '315',
      top: '2188',
    },
  },
  {
    link: 'http://static.ws.126.net/f2e/ent/ent_painting2017/images/p6.jpg',
    width: '1875',
    height: '3015',
    innerImg: {
      width: '280',
      height: '450',
      left: '441',
      top: '467',
    },
  },
  {
    link: 'http://static.ws.126.net/f2e/ent/ent_painting2017/images/p7.jpg',
    width: '1875',
    height: '3015',
    innerImg: {
      width: '79',
      height: '127',
      left: '501',
      top: '2514',
    },
  },
  {
    link: 'http://static.ws.126.net/f2e/ent/ent_painting2017/images/p8.jpg',
    width: '1875',
    height: '3015',
    innerImg: {
      width: '176',
      height: '283',
      left: '1582',
      top: '1084',
    },
  },
  {
    link: 'http://static.ws.126.net/f2e/ent/ent_painting2017/images/p9.jpg',
    width: '1875',
    height: '3015',
    innerImg: {
      width: '173',
      height: '278',
      left: '1472',
      top: '1357',
    },
  },
  {
    link: 'http://static.ws.126.net/f2e/ent/ent_painting2017/images/p10_1.jpg',
    width: '1875',
    height: '3015',
    innerImg: {
      width: '179',
      height: '287',
      left: '516',
      top: '1459',
    },
  },
  {
    link: 'http://static.ws.126.net/f2e/ent/ent_painting2017/images/p10.jpg',
    width: '1875',
    height: '3015',
    innerImg: {
      width: '769',
      height: '1237',
      left: '558',
      top: '873',
    },
  },
  {
    link: 'http://static.ws.126.net/f2e/ent/ent_painting2017/images/p11.jpg',
    width: '1875',
    height: '3015',
    innerImg: {
      width: '112',
      height: '181',
      left: '881',
      top: '1938',
    },
  },
  {
    link: 'http://static.ws.126.net/f2e/ent/ent_painting2017/images/p12.jpg',
    width: '1875',
    height: '3015',
    innerImg: {
      width: '328',
      height: '528',
      left: '706',
      top: '314',
    },
  },
  {
    link: 'http://static.ws.126.net/f2e/ent/ent_painting2017/images/p13.jpg',
    width: '1875',
    height: '3015',
    innerImg: {
      width: '132',
      height: '213',
      left: '1184',
      top: '908',
    },
  },
  {
    link: 'http://static.ws.126.net/f2e/ent/ent_painting2017/images/p14.jpg',
    width: '1875',
    height: '3015',
    innerImg: {
      width: '82',
      height: '132',
      left: '206',
      top: '2092',
    },
  },
  {
    link: 'http://static.ws.126.net/f2e/ent/ent_painting2017/images/p15.jpg',
    width: '1875',
    height: '3015',
    innerImg: {
      width: '246',
      height: '396',
      left: '598',
      top: '1270',
    },
  },
  {
    link: 'http://static.ws.126.net/f2e/ent/ent_painting2017/images/p16.jpg',
    width: '1875',
    height: '3015',
    innerImg: {
      width: '76',
      height: '122',
      left: '462',
      top: '2558',
    },
  },
];
const width = document.documentElement.clientWidth - 10;
const height = document.documentElement.clientHeight - 50;
export default () => {
  const pipRef = useRef();
  return (
    <>
      <PipCanvas images={images} width={width} height={height} scaleReturn={1.05} ref={pipRef} />
      <div style={{ position: 'fixed', bottom: 0 }}>
        <button onClick={() => pipRef.current.start()}>start</button>
        <button onClick={() => pipRef.current.stop()}>stop</button>
        <button onClick={() => pipRef.current.toggleOrSetDirection()}>toggleDirection</button>
      </div>
    </>
  );
};
