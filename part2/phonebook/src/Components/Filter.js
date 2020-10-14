import React from 'react'

const Filter = ({ value, onChange, onClick }) => {
    return (
        <div>
            Filter by name: <input
            value={value}
            onChange={onChange}
            />
            <button type="submit" onClick={onClick}>Filter</button>
        </div>
    )
}

export default Filter