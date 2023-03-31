import React from 'react'

const InstaShareContext = React.createContext({
  isMenuClick: false,
  onClickHamBerger: () => {},
  onClickClose: () => {},
  isSmallSearchBtn: false,
  onClickSmallSearchButton: () => {},
  onSearchResult: () => {},
  searchInput: '',
})

export default InstaShareContext
