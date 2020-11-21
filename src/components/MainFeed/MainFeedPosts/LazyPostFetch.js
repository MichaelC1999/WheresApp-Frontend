import React from 'react'

class LazyPostFetch extends React.Component {
    componentDidMount() {
        console.log('CHARLIE munga nigga')
    }

    render() {
        return (
            <div>
                <h2>Posts</h2>
            </div>
        )
    }
}

export default LazyPostFetch;