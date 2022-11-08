import axios from 'axios';

const url = process.env.REACT_APP_URL;

const imageLookup = async (datas) => {
  let imageBlob;

  try {
    const image = await axios
      .get(`${url}/image/${datas['type']}/${datas['image']}`, {
        responseType: 'blob',
      })
      .then((response) => {
        imageBlob = window.URL.createObjectURL(response.data);
        return imageBlob;
      });
    return image;
  } catch (error) {
    console.log(error);
  }

  window.URL.revokeObjectURL(imageBlob);
};

export { imageLookup };
