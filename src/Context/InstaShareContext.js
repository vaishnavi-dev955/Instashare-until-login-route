import React from 'react'

const InstaShareContext = React.createContext({
  isMenuClick: false,
  onClickHamBerger: () => {},
  onClickClose: () => {},
  isSmallSearchBtn: false,
  onClickSmallSearchButton: () => {},
  onSearchResult: () => {},
  searchInput: '',
  clickingSearchButton: () => {},
  onClickSearchButton: false,
})

export default InstaShareContext
