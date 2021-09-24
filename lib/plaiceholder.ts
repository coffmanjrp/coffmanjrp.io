import { getPlaiceholder } from 'plaiceholder';

export const generatePlaiceholder = async (media: string, alt: string) => {
  const { img, base64 } = await getPlaiceholder(media ? media : alt);

  return {
    img,
    base64,
  };
};
