import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'

import Header from '../Header'
import PostsContainer from '../PostsContainer'
import InstaShareContext from '../../Context/InstaShareContext'

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

class StoriesContainer extends Component {
  state = {
    userStoriesData: [],
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getUserStoriesData()
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

  onStoryLoadingView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  onClickStoryTryAgainButton = () => this.getUserStoriesData()

  onStoryFailureView = () => (
    <div className="Failure-story-container">
      <img
        src="https://res.cloudinary.com/drus1cyt4/image/upload/v1679974599/Group_7737_tt37qi.png"
        alt="failure view"
        className="failure-Stories-image"
      />
      <p className="failure-stories-heading">
        Something went wrong. Please try again
      </p>
      <button
        className="failure-story-button"
        type="button"
        onClick={this.onClickStoryTryAgainButton}
      >
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

  render() {
    return <>{this.renderingStoryViews()}</>
  }
}

const Home = () => (
  <InstaShareContext.Consumer>
    {value => {
      const {searchInput, onClickSearchButton} = value
      const jwtToken = Cookies.get('jwt_token')
      if (jwtToken === undefined) {
        return <Redirect to="/login" />
      }
      return (
        <>
          <Header />
          <div className="main-container">
            <StoriesContainer />
            <PostsContainer
              searchInput={searchInput}
              onClickSearchButton={onClickSearchButton}
            />
          </div>
        </>
      )
    }}
  </InstaShareContext.Consumer>
)

export default Home
