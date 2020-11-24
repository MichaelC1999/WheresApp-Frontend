import React from 'react';
import {connect} from 'react-redux';
import './ViewPostImg.css';

//NOTE: WHEN ANY SINGLE POST FROM ANY USER IS VIEWED IN MODAL, POSTDATA GETS STORED TO REDUX< AND ADDING A POST TURNS INTO EDIT POST
//NOTE: WHEN ANY PART OF POST DIV IS CLICKED (EVEN LINKS OR EDIT) IT TRIGGERS VIEW SINGLE POST MODAL

class ViewPostImg extends React.Component {
    render() {
        return (
            <div className="ViewPostImg">
                
                <img alt="view" src={this.props.postData.imageUrl} />
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        postData: state.postData
    }
}

export default connect(mapStateToProps)(ViewPostImg);