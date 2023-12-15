import { styled } from 'styled-components';
import { ITweet } from './timeline';
import { auth, db, storage } from '../firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useState } from 'react';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 100px;
  margin-top: 20px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  &:first-of-type {
    margin-top: 30px;
  }
`;

const Column = styled.div``;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const DeleteButton = styled.button`
  margin-top: 10px;
  background-color: tomato;
  color: white;
  font-weight: 400;
  border: 0;
  font-size: 10px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 4px;
  cursor: pointer;
`;

const EditButton = styled.button`
  margin-top: 10px;
  margin-left: 10px;
  background-color: transparent;
  color: #fff;
  font-weight: 400;
  border: 0;
  font-size: 10px;
  padding: 5px 10px;
  text-transform: uppercase;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  cursor: pointer;
  &.done {
    background-color: #fff;
    color: #000;
  }
`;

const TextArea = styled.textarea`
  margin-top: 10px;
  padding: 10px;
  border: 0;
  border-radius: 0;
  font-size: 16px;
  color: white;
  background-color: rgba(255, 255, 255, 0.15);
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const [edit, setEdit] = useState(false);
  const [editedTweet, setEditedTweet] = useState('');
  const user = auth.currentUser;
  const onDelete = async () => {
    const ok = confirm('Are you sure you want to delete this tweet?');
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, 'tweets', id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedTweet(e.target.value);
  };
  const onEdit = async () => {
    if (user?.uid !== userId) return;
    try {
      await updateDoc(doc(db, 'tweets', id), {
        tweet: editedTweet,
      });
    } catch (e) {
      console.log(e);
    }
    setEdit(false);
  };
  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        {edit ? (
          <TextArea defaultValue={tweet} onChange={onChange} />
        ) : (
          <Payload>{tweet}</Payload>
        )}
        {user?.uid === userId ? (
          <>
            <DeleteButton onClick={onDelete}>Delete</DeleteButton>
            {edit ? (
              <EditButton onClick={onEdit} className="done">
                Done
              </EditButton>
            ) : (
              <EditButton onClick={() => setEdit(true)}>Edit</EditButton>
            )}
          </>
        ) : null}
      </Column>
      {photo ? (
        <Column>
          <Photo src={photo} />
        </Column>
      ) : null}
    </Wrapper>
  );
}
