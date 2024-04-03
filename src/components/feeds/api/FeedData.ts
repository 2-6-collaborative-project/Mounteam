import FeedData from '@/src/types/feeds/FeedData';
import axios from 'axios';

const BASE_URL = 'https://www.mounteam.site/api/feeds';

const accessToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0MzAiLCJleHAiOjE3MTIxNDI1Njl9.PNH_I5wiy7QtaLixoA2Sbv4HxlmMkUfS87GE0rJ6OJI"';
// 피드 전체 조회
export async function getFeedData(
  pageNumber = 0,
  pageSize = 20,
  accessToken: string,
) {
  const url = `${BASE_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.data.content;
  } catch (e) {
    console.log(e);
  }
}

// 피드 선택 조회
export async function getFeedSelect(feedId: number) {
  const url = `${BASE_URL}/${feedId}`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.data;
  } catch (e) {
    console.log(e);
  }
}

// 피드 작성
export async function postFeedData(feedData: FeedData[]) {
  const url = `${BASE_URL}`;
  try {
    const response = await axios.post(url, feedData, {
      headers: { 'Content-Type': 'application/json' },
    });

    return response.data;
  } catch (e) {
    console.log(e);
  }
}

// 피드 수정
export async function putFeedData(feedId: number) {
  const url = `${BASE_URL}/${feedId}`;
  try {
    const response = await axios.put(url);

    return response.data;
  } catch (e) {
    console.log(e);
  }
}

// 피드 삭제
export async function deleteFeedData(feedId: number) {
  const url = `${BASE_URL}/${feedId}`;
  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (e) {
    console.log(e);
  }
}

// 피드 덧글 작성
export async function postFeedComments(
  feedId: number,
  comment: { content: string },
) {
  const url = `${BASE_URL}/${feedId}/comments`;
  try {
    const response = await axios.post(url, comment, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.data;
  } catch (e) {
    console.log(e);
  }
}

// 피드 덧글 조회
export async function getFeedComments(feedId: number) {
  const url = `${BASE_URL}/${feedId}/comments`;
  try {
    const response = await axios.get(url);

    return response.data;
  } catch (e) {
    console.log(e);
  }
}

// 피드 좋아요 누르기
export async function postLikes(feedId: number) {
  const url = `${BASE_URL}/${feedId}/likes`;
  try {
    const response = await axios.post(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (e) {
    console.log(e);
  }
}

// 좋아요 삭제
export async function deleteLikes(feedId: number) {
  const url = `${BASE_URL}/${feedId}/likes`;
  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (e) {
    console.log(e);
  }
}

// 유저 프로필
export async function getUserProfile() {
  const url = 'https://www.mounteam.site/api/user/profile';
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (e) {
    console.log(e);
  }
}
