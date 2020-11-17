import React from 'react';
import {connect} from 'react-redux';
import LazyLoad from 'react-lazy-load';
import './PostPage.css';

//NOTE: WHEN ANY SINGLE POST FROM ANY USER IS VIEWED IN MODAL, POSTDATA GETS STORED TO REDUX< AND ADDING A POST TURNS INTO EDIT POST
//NOTE: WHEN ANY PART OF POST DIV IS CLICKED (EVEN LINKS OR EDIT) IT TRIGGERS VIEW SINGLE POST MODAL

class PostPage extends React.Component {
    render() {
        return (
            <div className="PostPage">
                <LazyLoad 
                    
                    debounce={false}
                    offsetVertical={500}
                    >
                    <img src={this.props.postData.imageUrl} />
                </LazyLoad>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        postData: state.postData
    }
}

export default connect(mapStateToProps)(PostPage);