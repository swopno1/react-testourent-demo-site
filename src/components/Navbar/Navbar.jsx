import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { images } from '../../constants';
import auth from '../../firebase.init';
import './Navbar.css';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const [aUser] = useAuthState(auth);

  const handleSignOut = (e) => {
    e.preventDefault();
    signOut(auth);
  };

  return (
    <nav className='app__navbar'>
      <div className='app__navbar-logo'>
        <Link to='/'>
          <img src={images.gericht} alt='app logo' />
        </Link>
      </div>
      <ul className='app__navbar-links'>
        <li className='p__opensans'>
          <Link to='#home'>Home</Link>
        </li>
        <li className='p__opensans'>
          <Link to='#about'>About</Link>
        </li>
        <li className='p__opensans'>
          <Link to='#menu'>Menu</Link>
        </li>
        <li className='p__opensans'>
          <Link to='#award'>Award</Link>
        </li>
        <li className='p__opensans'>
          <Link to='#contact'>Contadt</Link>
        </li>
      </ul>
      <div className='app__navbar-login'>
        {aUser?.email ? (
          <p
            onClick={handleSignOut}
            className='p__opensans'
            style={{ paddingRight: '1rem', cursor: 'pointer' }}
          >
            {' '}
            Signout
          </p>
        ) : (
          <Link to='/login' className='p__opensans'>
            {' '}
            Log In / Register
          </Link>
        )}
        <div />
        <Link to='/booknow' className='p__opensans'>
          Book Table
        </Link>
      </div>
      <div className='app__navbar-smallscreen'>
        <GiHamburgerMenu
          color='#fff'
          fontSize={27}
          onClick={() => setToggleMenu(true)}
        />

        {toggleMenu && (
          <div className='app__navbar-smallscreen_ovelay flex__center slide-bottom'>
            <MdOutlineRestaurantMenu
              fontSize={27}
              className='overlay__close'
              onClick={() => setToggleMenu(false)}
            />

            <ul className='app__navbar-smallscreen_links'>
              <li className='p__opensans'>
                <Link to='#home'>Home</Link>
              </li>
              <li className='p__opensans'>
                <Link to='#about'>About</Link>
              </li>
              <li className='p__opensans'>
                <Link to='#menu'>Menu</Link>
              </li>
              <li className='p__opensans'>
                <Link to='#award'>Award</Link>
              </li>
              <li className='p__opensans'>
                <Link to='#contact'>Contadt</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
