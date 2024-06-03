import React from 'react';
import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { app } from '../firebase';
import { signInSuccess } from '../features/user/userSlice';

function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      gradientDuoTone='pinkToOrange'
      type='button'
      outline
      onClick={handleClick}
    >
      <AiFillGoogleCircle className='w-6 h-6 mr-2' />
      Continue with Google
    </Button>
  );
}

export default OAuth;
