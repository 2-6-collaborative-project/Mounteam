import FeedData from '@/src/types/feeds/FeedData';
import axios from 'axios';

const BASE_URL = 'https://www.mounteam.site/api/feeds';

// 피드 전체 조회
export async function getFeedData(
  pageNumber = 0,
  pageSize = 9,
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
    const response = await axios.get(url);

    return response.data;
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
    const response = await axios.delete(url);

    return response.data;
  } catch (e) {
    console.log(e);
  }
}

// 피드 덧글 작성
export async function postFeedComments(feedId: number) {
  const url = `${BASE_URL}/${feedId}/comments`;
  try {
    const response = await axios.post(url);

    return response.data;
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
