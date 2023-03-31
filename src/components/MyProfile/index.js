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

class MyProfile extends Component {
  state = {MyProfileData: {}, apiStatus: apiConstants.initial}

  componentDidMount() {
    this.getMyProfileData()
  }

  getMyProfileData = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const Url = ' https://apis.ccbp.in/insta-share/my-profile'
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
      const gettingArrayOfPosts = Posts => {
        const postsData = Posts.map(eachItem => ({
          postId: eachItem.id,
          postImage: eachItem.image,
        }))
        return postsData
      }

      const GettingArrayOfStories = Stories => {
        const StoriesData = Stories.map(eachStory => ({
          storyId: eachStory.id,
          storyImage: eachStory.image,
        }))

        return StoriesData
      }
      const UpdatedData = {
        followersCount: data.profile.followers_count,
        followingCount: data.profile.following_count,
        id: data.profile.id,
        posts: gettingArrayOfPosts(data.profile.posts),
        postsCount: data.profile.posts_count,
        profilePic: data.profile.profile_pic,
        stories: GettingArrayOfStories(data.profile.stories),
        userBio: data.profile.user_bio,
        userId: data.profile.user_id,
        userName: data.profile.user_name,
      }
      this.setState({
        MyProfileData: UpdatedData,
        apiStatus: apiConstants.success,
      })
      console.log(UpdatedData)
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onClickMyProfileTryAgainButton = () => this.getMyProfileData()

  onFailureView = () => (
    <div className="Failure-MyProfile-container">
      <img
        src="https://res.cloudinary.com/drus1cyt4/image/upload/v1680027056/Icon_aw2vjm.png"
        alt="failure view"
        className="failure-MyProfile-image"
      />
      <p className="failure-MyProfile-heading">
        Something went wrong. Please try again
      </p>
      <button
        className="failure-MyProfile-button"
        type="button"
        onClick={this.onClickMyProfileTryAgainButton}
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

  onSuccessUserProfileView = () => {
    const {MyProfileData} = this.state
    const {
      userName,
      followersCount,
      followingCount,
      profilePic,
      postsCount,
      userBio,
      stories,
      userId,
      posts,
    } = MyProfileData
    return (
      <>
        <div className="My-Profile-sub-container2">
          <div className="MyProfile-mobile-container">
            <div className="mobile-container">
              <h1 className="MyProfile-heading">{userName}</h1>
              <div className="MyProfile-image-followers-container">
                <img
                  src={profilePic}
                  alt="my profile"
                  className="My-profile-image"
                />
                <div className="MyProfile-posts-followers-following-container">
                  <div className="MyProfile-posts-container">
                    <p className="MyProfile-description1">{postsCount}</p>
                    <p className="MyProfile-description2">posts</p>
                  </div>
                  <div className="MyProfile-followers-container">
                    <p className="MyProfile-description1">{followersCount}</p>
                    <p className="MyProfile-description2">followers</p>
                  </div>
                  <div className="MyProfile-following-container">
                    <p className="MyProfile-description1">{followingCount}</p>
                    <p className="MyProfile-description2">following</p>
                  </div>
                </div>
              </div>

              <p className="MyProfile-userId-heading">{userId}</p>
              <p className="MyProfile-bio-description">{userBio}</p>
            </div>
            <div>
              {posts.length === 0 ? (
                <div className="MyProfile-No-posts-container">
                  <div className="MyProfile-No-posts-outline">
                    <BiCamera className="MyProfile-camera-icon" />
                  </div>
                  <h1 className="MyProfile-no-posts-heading">No Posts Yet</h1>
                </div>
              ) : (
                <ul className="MyProfile-stories-container">
                  {stories.map(eachItem => (
                    <li key={eachItem.storyId}>
                      <img
                        src={eachItem.storyImage}
                        alt="my story"
                        className="MyProfile-story-image"
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="MyProfile-grid-sub-container">
          <div className="MyProfile-grid-mobile-container">
            <BsGrid3X3 className="MyProfile-mobile-Grid-icon" />
            <h1 className="MyProfile-mobile-grid-para">Posts</h1>
          </div>
          <ul className="MyProfile-main-posts-container">
            {posts.map(eachItem => (
              <li key={eachItem.postId}>
                <img
                  src={eachItem.postImage}
                  alt="my post"
                  className="MyProfile-user-post-image"
                />
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }

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
    const {MyProfileData} = this.state
    console.log(MyProfileData)
    return (
      <>
        <Header />
        <div className="My-Profile-main-container">
          {this.renderingTheViews()}
        </div>
      </>
    )
  }
}

export default MyProfile
