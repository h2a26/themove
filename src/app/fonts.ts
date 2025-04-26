import localFont from 'next/font/local';

export const acaslonPro = localFont({
  src: [
    {
      path: '../../public/fonts/ACaslonPro-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-acaslon-pro',
});

export const euclidCircularB = localFont({
  src: [
    {
      path: '../../public/fonts/EuclidCircularB-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-euclid-circular-b',
});

export const euclid = localFont({
  src: [
    {
      path: '../../public/fonts/Euclid.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-euclid',
});

export const allrounderAntiqua = localFont({
  src: [
    {
      path: '../../public/fonts/Allrounder-Antiqua-Test-Book.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-allrounder-antiqua',
});
