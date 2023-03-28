import {withRouter, Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'

import 'reactjs-popup/dist/index.css'

import {FiMenu} from 'react-icons/fi'
import {AiFillCloseCircle} from 'react-icons/ai'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="Header-list-container">
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
            <Link to="/">
              <button className="list-button" type="button">
                Home
              </button>
            </Link>
            <button type="button" className="list-button">
              Search
            </button>
            <button type="button" className="list-button">
              Profile
            </button>
            <button
              type="button"
              className="logout-button"
              onClick={onClickLogout}
            >
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
      <div className="search-container">
        <input
          type="search"
          placeholder="Search Caption"
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
      <div className="large-buttons-container">
        <Link to="/">
          <button type="button" className="Home-profile-button">
            Home
          </button>
        </Link>
        <button type="button" className="Home-profile-button">
          Profile
        </button>
        <button
          type="button"
          className="Desktop-logout-button"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
