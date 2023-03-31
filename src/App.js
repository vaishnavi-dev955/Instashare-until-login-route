import {Switch, Route} from 'react-router-dom'
import {Component} from 'react'

import './App.css'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import InstaShareContext from './Context/InstaShareContext'
import UserProfile from './components/UserProfile'
import MyProfile from './components/MyProfile'

class App extends Component {
  state = {
    isMenuClick: false,
    isSmallSearchBtn: false,
    searchInput: '',
    onClickSearchButton: false,
  }

  onClickHamBerger = () => {
    this.setState({isMenuClick: true})
  }

  onClickClose = () => {
    this.setState({isMenuClick: false})
  }

  onClickSmallSearchButton = () => {
    this.setState({isSmallSearchBtn: true})
  }

  onSearchResult = Input => {
    this.setState({searchInput: Input})
  }

  clickingSearchButton = () => {
    this.setState(prevState => ({
      onClickSearchButton: !prevState.onClickSearchButton,
    }))
  }

  render() {
    const {
      isMenuClick,
      isSmallSearchBtn,
      searchInput,
      onClickSearchButton,
    } = this.state
    console.log(searchInput)
    return (
      <InstaShareContext.Provider
        value={{
          isMenuClick,
          isSmallSearchBtn,
          searchInput,
          onClickSearchButton,
          onClickHamBerger: this.onClickHamBerger,
          onClickClose: this.onClickClose,
          onClickSmallSearchButton: this.onClickSmallSearchButton,
          onSearchResult: this.onSearchResult,
          clickingSearchButton: this.clickingSearchButton,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/users/:userId" component={UserProfile} />
          <ProtectedRoute exact path="/my-profile" component={MyProfile} />
          <Route component={NotFound} />
        </Switch>
      </InstaShareContext.Provider>
    )
  }
}

export default App
