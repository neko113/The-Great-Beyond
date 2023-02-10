// react
import { useState } from 'react';
import { extractError } from '~/lib/error';

// hooks
import { useQueryClient } from '@tanstack/react-query';
import useCreateComment from '~/hooks/queries/comment/useCreateComment';
import { useGetPostComments } from '~/hooks/queries/post';
import useOpenLoginDialog from '~/hooks/useOpenLoginDialog';
import useUser from '~/hooks/useUser';

// components
import styled from '@emotion/styled';
import { Button } from '~/components/common';
import { Comment } from '~/lib/types';

interface Props {
  parentComment: Comment;
  onClose: () => void;
}

const ReplyComment = ({ parentComment, onClose }: Props) => {
  const [text, setText] = useState('');
  const queryClient = useQueryClient();
  const user = useUser();
  const openLoginDialog = useOpenLoginDialog();

  const { mutate } = useCreateComment({
    onSuccess: async () => {
      await queryClient.refetchQueries(
        useGetPostComments.getKey(parentComment.postId),
      );
      return;
    },
    onError: (e) => {
      const error = extractError(e);
      alert(error.message);
    },
  });

  const handleSubmit = () => {
    if (!text) return;
    mutate({
      postId: parentComment.postId,
      text,
      parentCommentId: parentComment.id,
    });
    onClose();
  };

  const handleCommentInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!user) {
      openLoginDialog('subcomment');
      e.target.blur();
      return;
    }
  };

  return (
    <Container>
      <Input
        type="text"
        placeholder="Write Comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onFocus={handleCommentInputFocus}
      />
      <ButtonsWrapper>
        <Button shadow color="success" size="sm" onClick={handleSubmit}>
          Confirm
        </Button>
        <Button shadow color="error" size="sm" onClick={onClose}>
          Cancel
        </Button>
      </ButtonsWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 1.5rem;
  padding-left: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 16px;
  border: 1px solid #cccccc;
  width: 100%;
  height: 45px;
  border-radius: 8px;
  &:focus {
    border: 1px solid #2c2c2c;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  gap: 1rem;
  margin-top: 1rem;
`;

export default ReplyComment;