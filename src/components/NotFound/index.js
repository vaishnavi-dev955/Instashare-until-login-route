import {Link} from 'react-router-dom'
import {Component} from 'react'

import './index.css'

class NotFound extends Component {
  render() {
    return (
      <div className="Not-found-Container">
        <img
          src="https://res.cloudinary.com/drus1cyt4/image/upload/v1680187616/Group_1_nmbjxn.png"
          alt="page not found"
          className="Not-found-image"
        />
        <h1 className="Not-Found-heading">Page Not Found</h1>
        <p className="Not-Found-para">
          we are sorry, the page you requested could not be found <br />
          Please go back to the home page
        </p>
        <Link to="/" className="Home-navigation-link">
          <button type="button" className="Home-page-button">
            Home Page
          </button>
        </Link>
      </div>
    )
  }
}

export default NotFound
