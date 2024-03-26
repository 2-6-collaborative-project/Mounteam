export interface Feed {
  id: number; // 게시글 아이디
  exploreId: number; // 산 아이디
  author: {
    // 작성자
    profileImageUrl: string; // 작성자 프로필 사진
    nickname: string; // 작성자 닉네임
    id: number; // 작성자 id
    level: number; // 작성자 레벨
  };
  createdByme: boolean; // 내가 생성했는지
  createdAt: string; // 피드 생성일
  imageUrl: string; // 피드 사진
  comments: string[]; // 피드 댓글
  likesCount: number; // 피드 좋아요 갯수
  isLiked: boolean; // 내가 좋아요 눌렀는지
  isSaved: boolean; // 저장여부
  tags: string[]; // 태그
  mainText: string; // 피드 본문글
}

export const feedMockData = (): Feed[] => {
  return [
    {
      id: 1,
      exploreId: 1,
      author: {
        profileImageUrl:
          'https://www.forest.go.kr/kfsweb/cmm/fms/getImage.do?atchFileId=FILE_000000000424235&fileSn=4',
        nickname: 'John Doe',
        id: 1,
        level: 1,
      },
      createdByme: true,
      createdAt: '2024-03-14T12:00:00',
      imageUrl:
        'https://www.forest.go.kr/kfsweb/cmm/fms/getImage.do?atchFileId=FILE_000000000424235&fileSn=4',
      comments: ['Nice post!', 'Great job!'],
      likesCount: 10,
      isLiked: true,
      isSaved: true,
      tags: ['#mock', '#data'],
      mainText:
        '안녕하세요 이 편지는 바다건너 뉴욕에서 왔습니다. 제 친구의 이름은 john Doe 입니다.',
    },
    {
      id: 2,
      exploreId: 2,
      author: {
        profileImageUrl: '',
        nickname: 'John Doe',
        id: 2,
        level: 2,
      },
      createdByme: false,
      createdAt: '2024-03-14T12:00:00',
      imageUrl:
        'https://www.forest.go.kr/kfsweb/cmm/fms/getImage.do?atchFileId=FILE_000000000423469&fileSn=1',
      comments: ['Nice post!', 'Great job!'],
      likesCount: 10,
      isLiked: true,
      isSaved: false,
      tags: ['#mock', '#data'],
      mainText:
        '안녕하세요 이 편지는 바다건너 뉴욕에서 왔습니다. 제 친구의 이름은 john Doe 입니다.',
    },
    {
      id: 3,
      exploreId: 3,
      author: {
        profileImageUrl: '',
        nickname: 'John Doe',
        id: 3,
        level: 1,
      },
      createdByme: true,
      createdAt: '2024-03-14T12:00:00',
      imageUrl: '',
      comments: ['Nice post!', 'Great job!'],
      likesCount: 10,
      isLiked: true,
      isSaved: true,
      tags: ['#mock', '#data'],
      mainText:
        '안녕하세요 이 편지는 바다건너 뉴욕에서 왔습니다. 제 친구의 이름은 john Doe 입니다.',
    },
    {
      id: 4,
      exploreId: 4,
      author: {
        profileImageUrl: '',
        nickname: 'John Doe',
        id: 4,
        level: 2,
      },
      createdByme: false,
      createdAt: '2024-03-14T12:00:00',
      imageUrl: '',
      comments: ['Nice post!', 'Great job!'],
      likesCount: 10,
      isLiked: false,
      isSaved: false,
      tags: ['#mock', '#data'],
      mainText:
        '안녕하세요 이 편지는 바다건너 뉴욕에서 왔습니다. 제 친구의 이름은 john Doe 입니다.',
    },
    {
      id: 5,
      exploreId: 5,
      author: {
        profileImageUrl: '',
        nickname: 'John Doe',
        id: 5,
        level: 3,
      },
      createdByme: true,
      createdAt: '2024-03-14T12:00:00',
      imageUrl: '',
      comments: ['Nice post!', 'Great job!'],
      likesCount: 10,
      isLiked: false,
      isSaved: true,
      tags: ['#mock', '#data'],
      mainText:
        '안녕하세요 이 편지는 바다건너 뉴욕에서 왔습니다. 제 친구의 이름은 john Doe 입니다.',
    },
    {
      id: 6,
      exploreId: 6,
      author: {
        profileImageUrl: '',
        nickname: 'John Doe',
        id: 6,
        level: 2,
      },
      createdByme: false,
      createdAt: '2024-03-14T12:00:00',
      imageUrl: '',
      comments: ['Nice post!', 'Great job!'],
      likesCount: 10,
      isLiked: true,
      isSaved: true,
      tags: ['#mock', '#data'],
      mainText:
        '안녕하세요 이 편지는 바다건너 뉴욕에서 왔습니다. 제 친구의 이름은 john Doe 입니다.',
    },
    {
      id: 7,
      exploreId: 7,
      author: {
        profileImageUrl: '',
        nickname: 'John Doe',
        id: 7,
        level: 1,
      },
      createdByme: false,
      createdAt: '2024-03-14T12:00:00',
      imageUrl: '',
      comments: ['Nice post!', 'Great job!'],
      likesCount: 10,
      isLiked: true,
      isSaved: false,
      tags: ['#mock', '#data'],
      mainText:
        '안녕하세요 이 편지는 바다건너 뉴욕에서 왔습니다. 제 친구의 이름은 john Doe 입니다.',
    },
    {
      id: 8,
      exploreId: 8,
      author: {
        profileImageUrl: '',
        nickname: 'John Doe',
        id: 8,
        level: 2,
      },
      createdByme: true,
      createdAt: '2024-03-14T12:00:00',
      imageUrl: '',
      comments: ['Nice post!', 'Great job!'],
      likesCount: 10,
      isLiked: true,
      isSaved: true,
      tags: ['#mock', '#data'],
      mainText:
        '안녕하세요 이 편지는 바다건너 뉴욕에서 왔습니다. 제 친구의 이름은 john Doe 입니다.',
    },
    {
      id: 9,
      exploreId: 9,
      author: {
        profileImageUrl: '',
        nickname: 'John Doe',
        id: 9,
        level: 3,
      },
      createdByme: true,
      createdAt: '2024-03-14T12:00:00',
      imageUrl: '',
      comments: ['Nice post!', 'Great job!'],
      likesCount: 10,
      isLiked: false,
      isSaved: true,
      tags: ['#mock', '#data'],
      mainText:
        '안녕하세요 이 편지는 바다건너 뉴욕에서 왔습니다. 제 친구의 이름은 john Doe 입니다.',
    },
    {
      id: 10,
      exploreId: 10,
      author: {
        profileImageUrl: '',
        nickname: 'John Doe',
        id: 10,
        level: 3,
      },
      createdByme: true,
      createdAt: '2024-03-14T12:00:00',
      imageUrl: '',
      comments: ['Nice post!', 'Great job!'],
      likesCount: 10,
      isLiked: true,
      isSaved: true,
      tags: ['#mock', '#data'],
      mainText:
        '안녕하세요 이 편지는 바다건너 뉴욕에서 왔습니다. 제 친구의 이름은 john Doe 입니다.',
    },
  ];
};
