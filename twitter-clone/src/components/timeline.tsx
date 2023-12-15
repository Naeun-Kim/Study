import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Tweet from './tweets';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

export interface ITweet {
  id: string;
  tweet: string;
  userId: string;
  username: string;
  createdAt: number;
  photo?: string;
}

const Wrapper = styled.div``;

export default function Timeline() {
  const [tweets, setTweet] = useState<ITweet[]>([]);
  const fetchTweets = async () => {
    const tweetsQuery = query(
      collection(db, 'tweets'),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(tweetsQuery);
    // snapshot.docs.forEach((doc) => console.log(doc.data()));
    const tweets = snapshot.docs.map((doc) => {
      const { tweet, userId, username, createdAt, photo } = doc.data(); //extract data
      //to be object
      return {
        tweet,
        userId,
        username,
        createdAt,
        photo,
        id: doc.id,
      };
    });
    setTweet(tweets);
  };
  useEffect(() => {
    fetchTweets();
  }, []);
  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </Wrapper>
  );
}
