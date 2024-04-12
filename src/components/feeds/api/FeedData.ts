import { authInstance } from '@/src/lib/axiosInstance';
import FeedData from '@/src/types/feeds/FeedData';

const BASE_URL = 'https://www.mounteam.site/api/feeds';
const BASE_URL1 = 'https://www.mounteam.site/api';

// 피드 전체 조회
export async function getFeedData(pageNumber = 0, pageSize = 9) {
  const url = `/feeds?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  try {
    const response = await authInstance.get(url);
    // console.log(response.data.data);
    return response.data.data.reviews;
  } catch (e) {
    console.log(e);
  }
}

// 피드 선택 조회
export async function getFeedSelect(type: string | null, feedId: number) {
  const url = `/${type === 'MREVIEW' ? 'reviews/' : 'teams/'}${feedId}`;
  console.log(url);
  try {
    const response = await authInstance.get(url);

    return response.data.data;
  } catch (e) {
    console.log(e);
  }
}

// 피드 작성
export async function postFeedData(feedData: FeedData[]) {
  const url = `${BASE_URL}`;
  try {
    const response = await authInstance.post(url, feedData);

    return response.data;
  } catch (e) {
    console.log(e);
  }
}

// 피드 수정
export async function putFeedData(feedId: number, formData: FormData) {
  const url = `${BASE_URL}/${feedId}`;
  try {
    const response = await authInstance.put(url, formData);

    return response.data;
  } catch (e) {
    console.log(e);
  }
}

// 피드 삭제
export async function deleteFeedData(feedId: number) {
  const url = `${BASE_URL}/${feedId}`;
  try {
    const response = await authInstance.delete(url);

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
    const response = await authInstance.post(url, comment);

    return response.data.data;
  } catch (e) {
    console.log(e);
  }
}

// 피드 덧글 조회
export async function getFeedComments(feedId: number) {
  const url = `${BASE_URL}/${feedId}/comments`;
  try {
    const response = await authInstance.get(url);

    return response.data;
  } catch (e) {
    console.log(e);
  }
}

// 피드 좋아요 누르기
export async function postLikes(feedId: number) {
  const url = `${BASE_URL}/${feedId}/likes`;
  try {
    const response = await authInstance.post(url);

    return response.data;
  } catch (e) {
    console.log(e);
  }
}

// 좋아요 삭제
export async function deleteLikes(feedId: number) {
  const url = `${BASE_URL}/${feedId}/likes`;
  try {
    const response = await authInstance.delete(url);

    return response.data;
  } catch (e) {
    console.log(e);
  }
}

// 유저 프로필
export async function getUserProfile() {
  const url = 'https://www.mounteam.site/api/user/profile';
  try {
    const response = await authInstance.get(url);

    return response.data;
  } catch (e) {
    console.log(e);
  }
}
