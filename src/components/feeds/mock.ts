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
        'Lorem Ipsum is simply dummy text of the printing and typesetting industrys. Lorem Ipsum has been hi my name hi hihihihihi hi hi hi hiasdasdasdasdasd asdazxc가가다맞라마잡사 ',
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
        '3주 전에, 이 세상에서 가장 긴 지명에 관한 글을 쓰다가 갈무리해둔 게 있다. 그러면 이 세상에서 가장 긴 단어는 뭔지 그런 걸 좀 찾아서 한번 쓰는 것도 재미있겠구나 하는 생각이었다. 자료를 뒤지고 검색하는 동안 우리말은 별로 긴 게 없을 거라고 지레짐작했다. 아무리 길어봤자 20자도 안 되겠지 뭐 실제로 우리말은 그리 길지 않다. 가장 긴 단어가 청자양인각연당초ㆍ상감모란문은구대접',
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
