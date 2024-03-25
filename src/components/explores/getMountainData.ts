import axios from 'axios';

const BASE_URL = 'https://api.odcloud.kr/api/';
const END_POINT = '15112801/v1/uddi:72bf80fc-1a93-4193-a6db-8a547d7c3333';
const PAGE_NUM = 1;
const DATA_PER_PAGE = 100;

export default async function getMountainData() {
  const url = `${BASE_URL}${END_POINT}?page=${PAGE_NUM}&perPage=${DATA_PER_PAGE}&serviceKey=${process.env.NEXT_PUBLIC_MOUNTAIN_SERVICE_KEY}`;

  try {
    const response = await axios.get(url);

    return response.data.data;
  } catch (e) {
    console.log(e);
  }
}
