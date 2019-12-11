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
      sorter: 'title',
      sortOrder: 'asc',
      sortedItems: [],
      sortItems: (ele) => {
        let sortedItems = _.orderBy(this.state.items, ele.target.value, this.state.sortOrder).map((item) => {
          return <Post key={item.id} item={item}></Post>
        });
        this.setState({ ...this.state, sorter: ele.target.value, sortedItems: sortedItems })
      },
      flipItems: () => {
        let reverse = (this.state.sortOrder === 'desc' ? 'asc' : 'desc');
        let sortedItems = _.orderBy(this.state.items, this.state.sorter, reverse).map((item) => {
          return <Post key={item.id} item={item}></Post>
        });
        this.setState({ ...this.state, sortedItems: sortedItems, sortOrder: reverse })
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
    const { error, isLoaded, sortOrder } = this.state;
    let order = sortOrder == 'asc' ? 'v' : '^';
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <>
          <p className="sortbuttongroup">
            Sort By
            <select className="dropdown" value={this.state.sorter} onChange={this.state.sortItems}>
              <option value='title'>Title</option>
              <option value='created_at'>Post Date</option>
              <option value='company'>Company</option>
            </select>
            <button className='sortbutton' onClick={this.state.flipItems} name={this.state.sorter}>{order}</button>
          </p>
          {this.state.sortedItems}
        </>
      );
    }
  }
}

export default Container;