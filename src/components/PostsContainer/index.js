import {Link} from 'react-router-dom'
import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {BsHeart} from 'react-icons/bs'
import {BiShareAlt} from 'react-icons/bi'
import {FaRegComment} from 'react-icons/fa'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

const CommentItem = props => {
  const {CommentItemData} = props
  const {comment, username} = CommentItemData
  return (
    <li className="post-item-list">
      <div className="comments-list">
        <p className="comment-para">{username}</p>
        <p className="comment-description">{comment}</p>
      </div>
    </li>
  )
}

class PostsContainer extends Component {
  state = {userPostsData: [], searchStatus: false}

  componentDidMount() {
    this.getSharePostsData()
    this.timerid = setInterval(() => {
      const {onClickSearchButton} = this.props
      const {searchStatus} = this.state
      if (onClickSearchButton !== searchStatus) {
        this.setState({searchStatus: onClickSearchButton})
        this.getSharePostsData()
      }
    }, 1000)
  }

  getSharePostsData = async () => {
    const {searchInput, onClickSearchButton} = this.props
    console.log('called again')
    this.setState({apiStatus: apiConstants.inProgress})
    let apiUrl = ''
    if (searchInput !== '' && onClickSearchButton === true) {
      apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    } else {
      apiUrl = 'https://apis.ccbp.in/insta-share/posts'
    }
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
        likesCount: eachItem.likes_count,
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

  onLoadingView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  successPostsView = () => {
    const {userPostsData} = this.state
    return (
      <ul className="All-posts-container">
        {userPostsData.map(eachItem => (
          <li className="list-style" key={eachItem.postId}>
            <div className="list-post-container">
              <Link
                to={`/users/${eachItem.userId}`}
                className="navigation-link"
              >
                <div className="post-profile-container">
                  <div className="post-image-container">
                    <img
                      src={eachItem.profilePic}
                      alt="post author profile"
                      className="post-profile-Image"
                    />
                  </div>
                  <p className="post-profile-username">{eachItem.userName}</p>
                </div>
              </Link>
              <div>
                <img
                  src={eachItem.postDetails.imageUrl}
                  alt="post view"
                  className="post-Image"
                />
                <div className="post-icons-container">
                  <button className="icon-button" type="button">
                    <BsHeart className="post-icon" />
                  </button>

                  <button className="icon-button" type="button">
                    <FaRegComment className="post-icon" />
                  </button>
                  <button className="icon-button" type="button">
                    <BiShareAlt className="post-icon" />
                  </button>
                </div>
                <p className="caption-para">{eachItem.postDetails.caption}</p>
                <p className="likes-count-para">{eachItem.likesCount} likes</p>
                <ul className="comments-list-container">
                  {eachItem.comments.map(eachComment => (
                    <CommentItem
                      CommentItemData={eachComment}
                      key={eachComment.commentUserId}
                    />
                  ))}
                </ul>
                <p className="createdAt-para">{eachItem.createdAt}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  onPostFailureView = () => (
    <div className="Failure-post-container">
      <img
        src="https://res.cloudinary.com/drus1cyt4/image/upload/v1680027056/Icon_aw2vjm.png"
        alt="failure view"
        className="failure-posts-image"
      />
      <p className="failure-posts-heading">
        Something went wrong. Please try again
      </p>
      <button
        className="failure-posts-button"
        type="button"
        onClick={this.onClickPostTryAgainButton}
      >
        Try again
      </button>
    </div>
  )

  renderingPostsViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.successPostsView()
      case apiConstants.failure:
        return this.onPostFailureView()
      case apiConstants.inProgress:
        return this.onLoadingView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderingPostsViews()}</>
  }
}

export default PostsContainer
