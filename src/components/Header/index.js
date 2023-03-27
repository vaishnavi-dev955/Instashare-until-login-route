import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'

import {FiMenu} from 'react-icons/fi'
import {AiFillCloseCircle} from 'react-icons/ai'

import './index.css'

const Header = () => (
  <>
    <div className="mobile-Header-list-container">
      <div className="header1">
        <img
          src="https://res.cloudinary.com/drus1cyt4/image/upload/v1679847448/Group_r5xszh.png"
          alt="website logo"
          className="InstaShare-header-logo"
        />
        <h1 className="header-heading">Insta Share</h1>
      </div>
      <Popup
        modal
        trigger={
          <button type="button" className="menu-button">
            <FiMenu className="menu-logo" />
          </button>
        }
        className="pop-up-content"
      >
        {close => (
          <div>
            <button className="list-button" type="button">
              Home
            </button>
            <button type="button" className="list-button">
              Search
            </button>
            <button type="button" className="list-button">
              Profile
            </button>
            <button type="button" className="logout-button">
              Logout
            </button>
            <button
              type="button"
              className="close-button"
              onClick={() => close()}
            >
              <AiFillCloseCircle className="close-button-logo" />
            </button>
          </div>
        )}
      </Popup>
    </div>
    <div className="Desktop-container">
      <div className="desk-header">
        <img
          src="https://res.cloudinary.com/drus1cyt4/image/upload/v1679847448/Group_r5xszh.png"
          alt="website logo"
          className="desktop-InstaShare-header-logo"
        />
        <h1 className="desktop-heading">Insta Share</h1>
      </div>
      <div className="search-container">
        <input
          type="search"
          placeholder="search-caption"
          className="Header-input-style"
        />
        <button type="button" className="search-button">
          <img
            src="https://cdn1.vectorstock.com/i/1000x1000/60/55/search-icon-magnifier-icon-vector-20716055.jpg"
            alt="search"
            className="search-style"
          />
        </button>
      </div>
      <div>
        <button type="button" className="Home-profile-button">
          Home
        </button>
        <button type="button" className="Home-profile-button">
          Profile
        </button>
        <button type="button" className="Desktop-logout-button">
          Logout
        </button>
      </div>
    </div>
  </>
)

export default Header
