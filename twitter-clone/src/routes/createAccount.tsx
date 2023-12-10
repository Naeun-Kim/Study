import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { auth } from '../firebase';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`;

const Title = styled.h1`
  font-size: 42px;
`;

const Form = styled.form`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
  &[type='submit'] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrot] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || name === '' || email === '' || password === '') return;
    try {
      //create an account
      //set the user name
      //redirect to the home
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credentials.user);
      await updateProfile(credentials.user, {
        displayName: name,
      });
      navigate('/');
    } catch (e) {
      //set error
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Join Twitter</Title>
      <Form onSubmit={onSubmit}>
        <Input
          name="name"
          value={name}
          placeholder="Name"
          type="text"
          onChange={onChange}
          required
        />
        <Input
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          onChange={onChange}
          required
        />
        <Input
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          onChange={onChange}
          required
        />
        <Input
          type="submit"
          value={isLoading ? 'Loading...' : 'Create Account'}
        />
      </Form>
      {error !== '' ? <Error>{error}</Error> : null}
    </Wrapper>
  );
}
