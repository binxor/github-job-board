import React from 'react';
import '../styles/Post.css';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  componentDidMount () {
    console.log('Post component mounted')
  }

  render () {
    let showFullDescription = this.props.item.showFullDescription,
      description = (this.props.item.description|| '').replace(/<[^>]+>/g, '');
    if (showFullDescription === true) { description = description.substring(0, 150); }
    return (
      <div className="postercard" id={this.props.item.id}>
        <h6 className="postertitle">
          <a className="posterlink" target="_blank" href={this.props.item.url} title={this.props.item.title}>
            {this.props.item.title}
          </a>
        </h6>
        <h6 className="postersubtitle">{this.props.item.company} - {this.props.item.location}</h6>
        <p className="posterdescription">{description}</p>
        <h6 className="postertext">{this.props.item.created_at}</h6>
      </div>
    );
  }
}

export default Post;