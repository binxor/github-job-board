import React from 'react';
import Post from './Post';
import '../styles/Container.css';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount () {
    console.log('component mounted')
    fetch('http://localhost:3001')
      .then(res => {
        return res.json();
      })
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
          console.log(result)
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render () {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <>
        {/* <Post className="poster" item={items[0]}></Post>
        <Post className="poster" item={items[1]}></Post>
        <Post className="poster" item={items[2]}></Post> */}
          {items.map(item => (
            <Post className="poster" item={item}></Post>
          ))}
        </>
      );
    }
  }
}

export default Container;