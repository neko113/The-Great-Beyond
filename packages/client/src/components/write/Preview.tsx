import styled from '@emotion/styled';
import useWriteStore from '~/stores/useWriteStore';
import { mediaQuery } from '~/lib/styles';
import MarkdownIt from 'markdown-it';
import { useMemo } from 'react';
import '~/lib/styles/github-markdown.css';

const Preview = () => {
  const { title, body } = useWriteStore();

  const html = useMemo(() => {
    return MarkdownIt().render(body);
  }, [body]);

  return (
    <Container>
      <ContentsWrapper>
        <Title>{title}</Title>
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </ContentsWrapper>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #f8f9fa;
  display: none;
  ${mediaQuery.tablet} {
    display: flex;
    width: 100%;
  }
`;

const ContentsWrapper = styled.div`
  width: 100%;
  padding: 4rem;
  overflow-y: scroll;
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  font-size: 2.5em;
  line-height: 1.2;
  font-weight: 800;
  margin-bottom: 3rem;
`;

export default Preview;
