import { styled } from 'styled-components';
import PostTweetForm from '../components/postTweetForm';

const Wrapper = styled.div``;

export default function Home() {
  return (
    <Wrapper>
      <PostTweetForm />
    </Wrapper>
  );
}
