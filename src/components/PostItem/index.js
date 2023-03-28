import {AiOutlineHeart, AiOutlineShareAlt} from 'react-icons/ai'
import {FaRegComment} from 'react-icons/fa'

import './index.css'

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

const PostItem = props => {
  const {PostItemData} = props
  const {comments, createdAt, postDetails, profilePic, userName} = PostItemData
  const {imageUrl, caption} = postDetails
  return (
    <li className="list-post-container">
      <div className="post-profile-container">
        <div className="post-image-container">
          <img
            src={profilePic}
            alt="profile pic"
            className="post-profile-Image"
          />
        </div>
        <p className="post-profile-username">{userName}</p>
      </div>
      <div>
        <img src={imageUrl} alt="post view" className="post-Image" />
        <div className="post-icons-container">
          <button className="icon-button" type="button">
            <AiOutlineHeart className="post-icon" />
          </button>

          <button className="icon-button" type="button">
            <FaRegComment className="post-icon" />
          </button>
          <button className="icon-button" type="button">
            <AiOutlineShareAlt className="post-icon" />
          </button>
        </div>
        <p className="caption-para">{caption}</p>
        <ul className="comments-list-container">
          {comments.map(eachItem => (
            <CommentItem
              CommentItemData={eachItem}
              key={eachItem.commentUserId}
            />
          ))}
        </ul>
        <p className="createdAt-para">{createdAt}</p>
      </div>
    </li>
  )
}

export default PostItem
