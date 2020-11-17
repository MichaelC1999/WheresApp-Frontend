import React from 'react'

import './Loader.css';

class Loader extends React.Component {
    render() {
        return (
            <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        )
    }
}

export default Loader