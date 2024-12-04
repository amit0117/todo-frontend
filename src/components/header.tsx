import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignInAlt,
  faSignOut,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { logout } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const isLoggedIn = useSelector((state:any) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    localStorage.removeItem('token');
  };

  return (
    <div className='w-full bg-black border-b-2 border-b-gray-400 flex flex-row justify-between items-center'>
      <span className='text-pretty px-2 py-5 text-gray-200 font-bold text-2xl'>
        Todo App
      </span>
      <div className='flex flex-row justify-end items-center gap-2 px-4'>
        {isLoggedIn ? (
          <Button
            leftSection={<FontAwesomeIcon icon={faSignOut} />}
            onClick={logoutHandler}
          >
            SignOut
          </Button>
        ) : (
          <>
            <Button
              leftSection={<FontAwesomeIcon icon={faSignInAlt} />}
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
            <Button
              variant='default'
              leftSection={<FontAwesomeIcon icon={faUser} />}
              onClick={() => navigate('/register')}
            >
              Register
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
