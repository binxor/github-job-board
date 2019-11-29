import React from 'react';
import Post from './Post';
import '../styles/Container.css';
const _ = require('lodash');

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      sorter: '',
      sortOrder: 'asc',
      sortedItems: [],
      sortItems: (ele) => {
        let reverse;
        if (this.state.sorter === ele.target.name) {
          reverse = this.state.sortOrder === 'desc' ? 'asc' : 'desc';
        } else {
          reverse = 'asc';
        }
        let sortedItems = _.orderBy(this.state.items, ele.target.name, reverse).map((item) => {
          return <Post key={item.id} item={item}></Post>
        });
        this.setState({ ...this.state, sorter: ele.target.name, sortedItems: sortedItems, sortOrder: reverse })
      }
    };
  }

  componentDidMount () {
    fetch('http://localhost:3001')
      .then(res => {
        return res.json();
      })
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
            sortedItems: result.map((item) => {
              return <Post key={item.id} item={item}></Post>
            })
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
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <>
          <p className="sortbuttongroup">
            Sort By
            <button className="sortbutton" onClick={this.state.sortItems} name='title'>Title</button>
            <button className="sortbutton" onClick={this.state.sortItems} name='created_at'>Post Date</button>
            <button className="sortbutton" onClick={this.state.sortItems} name='company'>Company</button>
          </p>
          {this.state.sortedItems}
        </>
      );
    }
  }
}

export default Container;