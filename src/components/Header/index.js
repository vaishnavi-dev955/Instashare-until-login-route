import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import {FiMenu} from 'react-icons/fi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {FaSearch} from 'react-icons/fa'

import InstaShare from '../../Context/InstaShareContext'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <InstaShare.Consumer>
      {value => {
        const {
          isMenuClick,
          onClickHamBerger,
          onClickClose,
          isSmallSearchBtn,
          onClickSmallSearchButton,
          onSearchResult,
          searchInput,
        } = value
        const onClickHamBergerMenu = () => onClickHamBerger()
        const onClickCloseButton = () => onClickClose()
        const onClickMobileSearchButton = () => onClickSmallSearchButton()
        const mainContainer = isMenuClick
          ? 'click-Menu-Header-list-container'
          : 'Header-list-container'
        const onChangeEvent = event => {
          onSearchResult(event.target.value)
        }
        return (
          <>
            <div className={mainContainer}>
              <div className="sub-header-container">
                <div className="header1">
                  <Link to="/">
                    <img
                      src="https://res.cloudinary.com/drus1cyt4/image/upload/v1679847448/Group_r5xszh.png"
                      alt="website logo"
                      className="InstaShare-header-logo"
                    />
                  </Link>
                  <h1 className="header-heading">Insta Share</h1>
                </div>
                <button
                  type="button"
                  className="menu-button"
                  onClick={onClickHamBergerMenu}
                >
                  <FiMenu className="menu-logo" />
                </button>
              </div>

              {isMenuClick ? (
                <div className="options-styling-container">
                  <div className="options-container">
                    <Link to="/">
                      <button className="Home-button" type="button">
                        Home
                      </button>
                    </Link>
                    <button
                      type="button"
                      className="search-button"
                      onClick={onClickMobileSearchButton}
                    >
                      Search
                    </button>
                    <Link to="/my-profile">
                      <button type="button" className="profile-button">
                        Profile
                      </button>
                    </Link>
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
                      onClick={onClickCloseButton}
                    >
                      <AiFillCloseCircle className="close-button-logo" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="large-main-container">
                  <div className="search-container">
                    <input
                      type="search"
                      placeholder="Search Caption"
                      className="Header-input-style"
                      onChange={onChangeEvent}
                      value={searchInput}
                    />
                    <button type="button" className="search-icon-button">
                      <FaSearch className="search-style" />
                    </button>
                  </div>

                  <div className="large-buttons-container">
                    <Link to="/">
                      <button type="button" className="Home-profile-button">
                        Home
                      </button>
                    </Link>
                    <Link to="/my-profile">
                      <button type="button" className="Home-profile-button">
                        Profile
                      </button>
                    </Link>
                    <button
                      type="button"
                      className="Desktop-logout-button"
                      onClick={onClickLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
            {isSmallSearchBtn && (
              <div className="small-search-container">
                <input
                  type="search"
                  placeholder="Search Caption"
                  className="small-input-type"
                  onChange={onChangeEvent}
                  value={searchInput}
                />
                <button type="button" className="small-search-button">
                  <FaSearch className="small-search-icon" />
                </button>
              </div>
            )}
          </>
        )
      }}
    </InstaShare.Consumer>
  )
}

export default withRouter(Header)
