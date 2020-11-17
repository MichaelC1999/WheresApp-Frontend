import React from 'react';

class Input extends React.Component {
    render() {
        return (
            <div>
                <input type={this.props.type} name={this.props.name} />
            </div>
        )
    }
}

export default Input;