import { Modal, UploadFile } from 'antd';
import styled from 'styled-components';
import { colors } from '@/app/styles/colors';
import ImgUpload from '../review/write/ImgUpload';
import TextArea from 'antd/es/input/TextArea';
import Tags from '../review/write/Tag';
import { useEffect } from 'react';
import { getFeedSelect, putFeedData } from './api/FeedData';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useFeedEditStore from '@/src/store/useFeedEditStore';
import useFeedParams from './useFeedParams';
interface ModalProps {
  // feedType: string;
  // feedId: number;
  content: string;
  modalOpenState: boolean;
  confirmFunc?: () => void;
  setter: (value: boolean) => void;
}

const Title = styled.p`
  color: ${colors.Grayscale[13]};

  font-size: 1.6rem;

  font-weight: 700;
  line-height: 3.2rem;
`;

const Sector = styled.div`
  width: 100%;
  display: flex;
  padding-bottom: 1rem;
  flex-direction: column;
  gap: 1.7rem;
  border-bottom: 1px solid ${colors.Grayscale[13]};
`;

const Label = styled.p`
  padding-top: 1rem;
  color: ${colors.Grayscale[13]};
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 2rem;
`;

export default function FeedModify({
  setter,
  modalOpenState,
  content,
}: ModalProps) {
  const queryClient = useQueryClient();
  const { feedId, feedType } = useFeedParams();
  const { tags, setTags, fileList, setFileList, contents, setContents } =
    useFeedEditStore();

  const { data: detailData } = useQuery({
    queryKey: ['feed', 'detail', feedType, feedId],
    queryFn: () => getFeedSelect(feedType, feedId),
  });
  console.log(detailData);
  // console.log(content);
  // console.log(contents);

  useEffect(() => {
    if (detailData) {
      const { tags, contents, imageUrls } = detailData;
      setTags(tags);
      setContents(contents);
      setFileList(
        imageUrls.map((item: any, index: any) => ({
          uid: index,
          name: `image-${index}`,
          status: 'done',
          url: item,
        })),
      );
    }
  }, [detailData, setTags, setContents, setFileList]);

  const editFeedDetailData = async () => {
    const feedDetailData = {
      mainText: contents,
      mountain: detailData.mountain,
      departureDay: detailData.departureDay || '',
      hashTags: tags,
    };
    const jsonFeedData = JSON.stringify(feedDetailData);
    const feedPutData = new Blob([jsonFeedData]);
    const formData = new FormData();

    formData.append('reviewUpdateRequest', feedPutData);

    fileList.map((item: any) => {
      formData.append('imageUrl', item.originFileObj);
    });
    await putFeedData(feedType, feedId, formData);
    queryClient.invalidateQueries({
      queryKey: ['feed', 'detail', feedType, feedId],
    });
  };

  const onOkFunc = () => {
    editFeedDetailData();
    setter(false);
  };

  const onCancelFunc = () => {
    setter(false);
  };

  return (
    <>
      <Modal
        width={600}
        closable={false}
        open={modalOpenState}
        onOk={onOkFunc}
        onCancel={onCancelFunc}
        title={<Title>피드 수정하기</Title>}
        cancelText="취소하기"
        okText="수정하기"
      >
        <Sector>
          <Label>이미지 수정</Label>
          <ImgUpload
            maxItem={5}
            fileList={fileList}
            setFileList={setFileList}
          />
        </Sector>
        <Sector>
          <Label>내용</Label>
          <TextArea
            onChange={(e) => setContents(e.target.value)}
            defaultValue={content}
          />
        </Sector>
        <Sector>
          <Label>태그</Label>
          <Tags tags={tags} setTags={setTags} />
        </Sector>
      </Modal>
    </>
  );
}
