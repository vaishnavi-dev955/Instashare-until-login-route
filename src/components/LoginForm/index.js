import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showError: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    history.replace('/')
    Cookies.set('jwt_token', jwtToken, {expires: 30})
  }

  onSubmitFailure = errormessage => {
    this.setState({showError: true, errorMsg: errormessage})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const Url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(Url, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      this.onSubmitSuccess(data.jwt_token)
    } else {
      const data = await response.json()
      console.log(data)
      this.onSubmitFailure(data.error_msg)
    }
  }

  mobileAndDesktopViews = () => {
    const {showError, errorMsg} = this.state
    return (
      <div className="main-container">
        <div className="sub-container">
          <img
            src="https://res.cloudinary.com/drus1cyt4/image/upload/v1679849091/Layer_2_v4ahco.png"
            alt="website login"
            className="viewers-image"
          />
          <div className="login-container">
            <div className="Image-container">
              <img
                src="https://res.cloudinary.com/drus1cyt4/image/upload/v1679847448/Group_r5xszh.png"
                alt="website logo"
                className="InstaShare-logo"
              />
              <h1 className="login-heading">Insta Share</h1>
            </div>
            <form onSubmit={this.onSubmitForm} className="login-container2">
              <label className="label-para" htmlFor="username">
                USERNAME
              </label>
              <input
                className="input-style"
                id="username"
                type="text"
                placeholder="Username"
                onChange={this.onChangeUsername}
              />
              <label className="label-para" htmlFor="password">
                PASSWORD
              </label>
              <input
                className="input-style"
                id="password"
                type="password"
                placeholder="Password"
                onChange={this.onChangePassword}
              />
              <button type="submit" className="login-button">
                Login
              </button>
              {showError ? (
                <p className="error-Message-para">{errorMsg}</p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return <>{this.mobileAndDesktopViews()}</>
  }
}

export default LoginForm
