import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Tweet from './tweets';
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '../firebase';
import { Unsubscribe } from 'firebase/auth';

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
  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweets = async () => {
      const tweetsQuery = query(
        collection(db, 'tweets'),
        orderBy('createdAt', 'desc'),
        limit(25)
      );
      // const snapshot = await getDocs(tweetsQuery);
      unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
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
      });
    };
    fetchTweets();
    // https://react.dev/learn/synchronizing-with-effects#subscribing-to-events
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);
  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </Wrapper>
  );
}
