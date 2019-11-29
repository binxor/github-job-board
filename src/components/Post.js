import React from 'react';
import '../styles/Post.css';

class Post extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    console.log('Post component mounted')
  }

  render () {
    return (
      <div className="postercard">
        <h6 className="postertitle">{this.props.item.title}</h6>
        <h6 className="postersubtitle">{this.props.item.company}</h6>
        <br/>
        <h6 className="postertext">{this.props.item.location}</h6>
        <h6 className="postertext">{this.props.item.created_at}</h6>
      </div>
    );
  }
}

export default Post;