import styled from '@emotion/styled';
import LikeButton from '~/components/base/LikeButton';
import { useGetPost } from '~/hooks/queries/post';
import usePostLikeManager from '~/hooks/usePostLikeManager';
import useUser from '~/hooks/useUser';

interface Props {
  postId: string;
}

const PostContents = ({ postId }: Props) => {
  const { data: post } = useGetPost(postId, { suspense: true });
  const user = useUser();

  const { isLiked, likeCount, toggleLike } = usePostLikeManager({
    initialIsLiked: post?.isLiked!,
    initialLikeCount: post?.postStats.likes!,
    postId,
  });

  return (
    <>
      <Title>{post?.title}</Title>
      <Body>
        <p>{post?.body}</p>
      </Body>
      <Author>Authored by {post?.user.username}</Author>

      {/* @TODO: add comment count components and reload function */}
      <LikeButtonWrapper>
        <LikeButton size="md" isLiked={isLiked} onClick={toggleLike} />
        <span>좋아요 {likeCount.toLocaleString()}개</span>
      </LikeButtonWrapper>
    </>
  );
};

const Title = styled.div`
  font-size: 1.2rem;
`;

const Body = styled.div`
  font-size: 1rem;
  line-height: 1.5rem;
`;

const Author = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 0.8rem;
  font-weight: 500;
  color: #999;
`;

const LikeButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  span {
    color: #999;
    font-size: 0.8rem;
  }
`;

export default PostContents;
