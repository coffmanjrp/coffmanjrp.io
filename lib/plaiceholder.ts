import { getPlaiceholder } from 'plaiceholder';

export const generatePlaiceholder = async (cover: string) => {
  const { img, base64 } = await getPlaiceholder(
    cover ? cover : '/images/placeholder.jpg'
  );

  return {
    img,
    base64,
  };
};
