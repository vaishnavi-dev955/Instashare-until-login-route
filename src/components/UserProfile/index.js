import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

import Header from '../Header'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class UserProfile extends Component {
  state = {userProfileData: {}, apiStatus: apiConstants.initial}

  componentDidMount() {
    this.getUserProfilesData()
  }

  getUserProfilesData = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const {match} = this.props
    console.log(match)
    const {params} = match
    const {userId} = params
    const Url = `https://apis.ccbp.in/insta-share/users/${userId}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(Url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const userDetails = {
        followersCount: data.user_details.followers_count,
        followingCount: data.user_details.following_count,
        id: data.user_details.id,
        posts: data.user_details.posts.map(eachItem => ({
          postId: eachItem.id,
          postImage: eachItem.image,
        })),
        profilePic: data.user_details.profile_pic,
        postsCount: data.user_details.posts_count,
        stories: data.user_details.stories.map(eachItem => ({
          storyId: eachItem.id,
          storyImage: eachItem.image,
        })),
        userBio: data.user_details.user_bio,
        userProfileId: data.user_details.user_id,
        userName: data.user_details.user_name,
      }
      this.setState({
        userProfileData: userDetails,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onSuccessUserProfileView = () => {
    const {userProfileData} = this.state
    const {
      userName,
      followersCount,
      followingCount,
      profilePic,
      postsCount,
      userProfileId,
      userBio,
      stories,
      posts,
    } = userProfileData
    return (
      <div className="main-container">
        <div className="sub-container2">
          <div className="userProfile-mobile-container">
            <div className="mobile-container">
              <h1 className="userProfile-heading">{userName}</h1>
              <div className="image-followers-container">
                <img
                  src={profilePic}
                  alt="user profile"
                  className="user-profile-image"
                />
                <div className="posts-followers-following-container">
                  <div className="posts-container">
                    <p className="description1">{postsCount}</p>
                    <p className="description2">posts</p>
                  </div>
                  <div className="followers-container">
                    <p className="description1">{followersCount}</p>
                    <p className="description2">followers</p>
                  </div>
                  <div className="following-container">
                    <p className="description1">{followingCount}</p>
                    <p className="description2">following</p>
                  </div>
                </div>
              </div>
              <p className="userId-heading">{userProfileId}</p>
              <p className="bio-description">{userBio}</p>
            </div>
          </div>

          <ul className="stories-container">
            {stories.map(eachItem => (
              <li key={eachItem.storyId}>
                <img
                  src={eachItem.storyImage}
                  alt="user story"
                  className="story-image"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="grid-sub-container">
          <div className="grid-mobile-container">
            <BsGrid3X3 className="mobile-Grid-icon" />
            <h1 className="mobile-grid-para">Posts</h1>
          </div>
          {posts.length === 0 ? (
            <div className="No-posts-container">
              <div className="No-posts-outline">
                <BiCamera className="camera-icon" />
              </div>
              <h1 className="no-posts-heading">No Posts Yet</h1>
            </div>
          ) : (
            <ul className="main-posts-container">
              {posts.map(eachItem => (
                <li key={eachItem.postId}>
                  <img
                    src={eachItem.postImage}
                    alt="user post"
                    className="user-post-image"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }

  onClickUserProfileTryAgainButton = () => this.getUserProfilesData()

  onFailureView = () => (
    <div className="Failure-userProfile-container">
      <img
        src="https://res.cloudinary.com/drus1cyt4/image/upload/v1679974599/Group_7737_tt37qi.png"
        alt="failure view"
        className="failure-userProfile-image"
      />
      <p className="failure-stories-heading">
        Something went wrong. Please try again
      </p>
      <button
        className="failure-post-button"
        type="button"
        onClick={this.onClickUserProfileTryAgainButton}
      >
        Try again
      </button>
    </div>
  )

  onLoadingView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderingTheViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.onSuccessUserProfileView()
      case apiConstants.failure:
        return this.onFailureView()
      case apiConstants.inProgress:
        return this.onLoadingView()
      default:
        return null
    }
  }

  render() {
    const {userProfileData} = this.state
    console.log(userProfileData)
    return (
      <>
        <Header />
        <div>{this.renderingTheViews()}</div>
      </>
    )
  }
}

export default UserProfile
