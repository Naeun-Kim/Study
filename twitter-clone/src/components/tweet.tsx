import { styled } from 'styled-components';
import { ITweet } from './timeline';
import { auth, db, storage } from '../firebase';
import { deleteDoc, deleteField, doc, updateDoc } from 'firebase/firestore';
import {
  deleteObject,
  ref,
  getDownloadURL,
  uploadBytes,
} from 'firebase/storage';
import { useState } from 'react';
import editIcon from '/edit.svg';
import deleteIcon from '/remove.svg';

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

const ColumnFile = styled.div`
  position: relative;
  &:hover {
    & > div {
      display: block;
    }
  }
`;

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

const EditFileArea = styled.div`
  display: none;
`;

const EditFile = styled.div`
  position: absolute;
  top: -14px;
  right: 25px;
  input {
    display: none;
  }
  label {
    display: inline-block;
    width: 25px;
    height: 25px;
    font-size: 0;
    background: rgba(0, 0, 0, 0.8) url(${editIcon}) no-repeat center;
    background-size: 18px 18px;
    cursor: pointer;
  }
`;

const DeleteFile = styled.div`
  position: absolute;
  top: 0px;
  right: 0;
  width: 25px;
  height: 25px;
  font-size: 0;
  background: rgba(255, 51, 28, 0.8) url(${deleteIcon}) no-repeat;
  background-size: cover;
  cursor: pointer;
  span {
    display: none;
  }
`;

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const [edit, setEdit] = useState(false);
  const [editedTweet, setEditedTweet] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [disable, setDisable] = useState(false);
  const user = auth.currentUser;
  const photoRef = ref(storage, `tweets/${user?.uid}/${id}`);

  const maxFileSizeInMB = 1;
  const maxFileSizeInKB = 1024 * 1024 * maxFileSizeInMB;

  const onDelete = async () => {
    const ok = confirm('Are you sure you want to delete this tweet?');
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, 'tweets', id));
      if (photo) {
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
  const onEditFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    //max file size is 1MB
    if (files && files.length === 1 && files[0].size < maxFileSizeInKB) {
      setFile(files[0]);
      try {
        if (user && photo) {
          const result = await uploadBytes(photoRef, files[0]);
          const url = await getDownloadURL(result.ref);
          await updateDoc(doc(db, 'tweets', id), {
            photo: url,
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
    if (files && files[0].size > maxFileSizeInKB) {
      alert(`Please select a file that is ${maxFileSizeInMB}MB or less.`);
      setDisable(true);
    } else {
      alert('File uploaded successfully!');
      setDisable(false);
    }
  };
  const onDeleteFile = async () => {
    if (user?.uid !== userId) return;
    try {
      if (photo) {
        await deleteObject(photoRef);
        await updateDoc(doc(db, 'tweets', id), {
          photo: deleteField(),
        });
        location.reload();
      }
    } catch (e) {
      console.log(e);
    }
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
              <EditButton onClick={onEdit} className="done" disabled={disable}>
                Done
              </EditButton>
            ) : (
              <EditButton onClick={() => setEdit(true)}>Edit</EditButton>
            )}
          </>
        ) : null}
      </Column>
      {photo ? (
        <ColumnFile>
          <Photo src={photo} />
          <EditFileArea>
            <EditFile>
              <label htmlFor="tweetFile">edit</label>
              <input
                type="file"
                id="tweetFile"
                accept="image/*"
                onChange={onEditFile}
              />
            </EditFile>
            <DeleteFile onClick={onDeleteFile}>
              <span>delete</span>
            </DeleteFile>
          </EditFileArea>
        </ColumnFile>
      ) : null}
    </Wrapper>
  );
}
