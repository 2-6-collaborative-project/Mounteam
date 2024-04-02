import { authInstance } from '@/src/lib/axiosInstance';

export async function postUserData() {
  const BASE_URL = 'https://www.mounteam.site/api';
  const url = `${BASE_URL}/user/profile`;

  try {
    const response = await authInstance.post(url, {
      request: {
        nickname: 'testts',
        introduction: 'testts',
        ageRange: 'teens',
        areaInterest: '서울',
      },
      imgUrl:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    });

    return response.data.data;
  } catch (e) {
    console.log(e);
  }
}

// {
//   request: {
//     nickname: nickname,
//     introduction: description,
//     ageRange: age,
//     areaInterest: region,
//   },
//   imgUrl:
//     'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
// }
