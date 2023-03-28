import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'

import Header from '../Header'
import PostItem from '../PostItem'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

const settings = {
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 7,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
  ],
}

class Home extends Component {
  state = {
    userStoriesData: [],
    apiStatus: apiConstants.initial,
    userPostsData: [],
  }

  componentDidMount() {
    this.getUserStoriesData()
    this.getSharePostsData()
  }

  getUserStoriesData = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const Url = 'https://apis.ccbp.in/insta-share/stories'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(Url, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const UpdatedData = data.users_stories.map(eachItem => ({
        storyUrl: eachItem.story_url,
        storyUserId: eachItem.user_id,
        userName: eachItem.user_name,
      }))
      this.setState({
        userStoriesData: UpdatedData,
        apiStatus: apiConstants.success,
      })
      console.log(UpdatedData)
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  getSharePostsData = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/insta-share/posts'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedPostDetails = Item => {
        const updatedDetails = {
          caption: Item.caption,
          imageUrl: Item.image_url,
        }
        return updatedDetails
      }
      const UpdatedPostsData = data.posts.map(eachItem => ({
        comments: eachItem.comments.map(each => ({
          comment: each.comment,
          commentUserId: each.user_id,
          username: each.user_name,
        })),
        createdAt: eachItem.created_at,
        postDetails: updatedPostDetails(eachItem.post_details),
        postId: eachItem.post_id,
        profilePic: eachItem.profile_pic,
        userId: eachItem.user_id,
        userName: eachItem.user_name,
      }))
      this.setState({
        userPostsData: UpdatedPostsData,
        apiStatus: apiConstants.success,
      })
      console.log(UpdatedPostsData)
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onStoryLoadingView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  onPostLoadingView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  onStoryFailureView = () => (
    <div className="Failure-story-container">
      <img
        src="https://res.cloudinary.com/drus1cyt4/image/upload/v1679974599/Group_7737_tt37qi.png"
        alt="failure view"
        className="failure-Stories-image"
      />
      <h1 className="failure-stories-heading">
        Something went wrong . Please try again{' '}
      </h1>
      <button className="failure-story-button" type="button">
        Try again
      </button>
    </div>
  )

  onPostFailureView = () => (
    <div className="Failure-post-container">
      <img
        src="https://res.cloudinary.com/drus1cyt4/image/upload/v1680027056/Icon_aw2vjm.png"
        alt="failure view"
        className="failure-posts-image"
      />
      <h1 className="failure-posts-heading">
        Something went wrong . Please try again{' '}
      </h1>
      <button className="failure-posts-button" type="button">
        Try again
      </button>
    </div>
  )

  storySuccessView = () => {
    const {userStoriesData} = this.state
    return (
      <div className="slick-container">
        <Slider {...settings}>
          {userStoriesData.map(eachLogo => {
            const {storyUserId, storyUrl, userName} = eachLogo
            return (
              <div className="slick-item" key={storyUserId}>
                <img className="logo-image" src={storyUrl} alt="story logo" />
                <p className="story-para">{userName}</p>
              </div>
            )
          })}
        </Slider>
      </div>
    )
  }

  successPostsView = () => {
    const {userPostsData} = this.state
    return (
      <ul className="All-posts-container">
        {userPostsData.map(eachItem => (
          <PostItem PostItemData={eachItem} key={eachItem.postId} />
        ))}
      </ul>
    )
  }

  renderingStoryViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.storySuccessView()
      case apiConstants.failure:
        return this.onStoryFailureView()
      case apiConstants.inProgress:
        return this.onStoryLoadingView()
      default:
        return null
    }
  }

  renderingPostsViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.successPostsView()
      case apiConstants.failure:
        return this.onPostFailureView()
      case apiConstants.inProgress:
        return this.onPostLoadingView()
      default:
        return null
    }
  }

  render() {
    const {userStoriesData, userPostsData} = this.state
    console.log(`userStoriesData is ${userStoriesData}`)
    console.log(`userPostsData is ${userPostsData}`)
    return (
      <>
        <Header />
        <div className="main-container">
          {this.renderingStoryViews()}
          {this.renderingPostsViews()}
        </div>
      </>
    )
  }
}

export default Home
