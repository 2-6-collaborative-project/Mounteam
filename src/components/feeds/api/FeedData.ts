import { authInstance } from '@/src/lib/axiosInstance';

// 피드 전체 조회(리팩토링전)
// export async function getFeedData(pageNumber = 0, pageSize = 9) {
//   const url = `/feeds?pageNumber=${pageNumber}&pageSize=${pageSize}`;
//   try {
//     const response = await authInstance.get(url);
//     console.log(response.data.data);
//     return response.data.data;
//   } catch (e) {
//     console.log(e);
//   }
// }

// 피드 전체 조회(리팩토링후)
export async function getFeedData(pageNumber = 0, pageSize = 9) {
  const url = `/feeds`;
  try {
    const response = await authInstance.get(url, {
      params: {
        pageNumber,
        pageSize,
      },
    });

    return response.data.data;
  } catch (e) {
    console.log(e);
  }
}

// 피드 선택 조회
export async function getFeedSelect(type: string | null, feedId: number) {
  const url = `/${type === 'MREVIEW' ? 'reviews/' : 'team-reviews/'}${feedId}`;

  try {
    const response = await authInstance.get(url);

    return response.data.data;
  } catch (e) {
    console.log(e);
  }
}

// 피드 수정
export async function putFeedData(
  type: string | null,
  feedId: number,
  formData: FormData,
) {
  const url = `/${type === 'MREVIEW' ? 'reviews/' : 'team-reviews/'}${feedId}`;
  try {
    const response = await authInstance.put(url, formData);
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

// 피드 삭제
export async function deleteFeedData(type: string, feedId: number) {
  const url = `/${type === 'MREVIEW' ? 'reviews/' : 'team-reviews/'}${feedId}`;
  try {
    const response = await authInstance.delete(url);

    return response.data;
  } catch (e) {
    console.log(e);
  }
}

// 피드 덧글 작성
export async function postFeedComments(
  type: string,
  feedId: number,
  comment: { content: string },
) {
  const url = `/${type === 'MREVIEW' ? 'reviews/' : 'team-reviews/'}${feedId}/comments`;
  try {
    const response = await authInstance.post(url, comment);

    return response.data.data;
  } catch (e) {
    console.log(e);
  }
}

// 피드 덧글 조회
export async function getFeedComments(type: string, feedId: number) {
  const url = `/${type === 'MREVIEW' ? 'reviews/' : 'team-reviews/'}${feedId}/comments`;
  try {
    const response = await authInstance.get(url);

    return response.data;
  } catch (e) {
    console.log(e);
  }
}

// 피드 좋아요 누르기
export async function postLikes(feedId: number) {
  const url = `/reviews/${feedId}/likes`;
  try {
    const response = await authInstance.post(url);

    return response.data;
  } catch (e) {
    console.log(e);
  }
}

// 좋아요 삭제
export async function deleteLikes(feedId: number) {
  const url = `/reviews/${feedId}/likes`;
  try {
    const response = await authInstance.delete(url);

    return response.data;
  } catch (e) {
    console.log(e);
  }
}

// 유저 프로필
export async function getUserProfile() {
  const url = '/user/profile';
  try {
    const response = await authInstance.get(url);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
