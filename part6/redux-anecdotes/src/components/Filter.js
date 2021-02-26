import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
        props.filterChange(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      Filter <input onChange={handleChange} />
    </div>
  )
}

const mapDisptachToProps = {
  filterChange
}

const ConnectedFilter = connect(null, mapDisptachToProps)(Filter)
export default ConnectedFilter