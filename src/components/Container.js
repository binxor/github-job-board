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
      searchValue: '',
      sorter: 'title',
      sortOrder: 'asc',
      visibleElements: [],
      visibleItems: [],
      search: (ele) => {
        let value = ele.target.value;
        let visibleItems = this.state.items;
        if (value.length === 0) { visibleItems = this.state.items }
        let foundItems = _.filter(visibleItems, (item) => {
          return JSON.stringify(item).toLowerCase().includes(value.toLowerCase());
        });
        let visibleElements = this.state.renderItems(foundItems);
        this.setState({ ...this.state, visibleItems: foundItems, visibleElements: visibleElements, searchValue: value });
        return foundItems;
      },
      sort: (ele) => {
        let sortedItems = _.orderBy(this.state.visibleItems, ele.target.value, this.state.sortOrder);
        let visibleElements = this.state.renderItems(sortedItems);
        this.setState({ ...this.state, visibleItems: sortedItems, visibleElements: visibleElements, sorter: ele.target.value })
        return sortedItems;
      },
      flip: () => {
        let reverse = (this.state.sortOrder === 'desc' ? 'asc' : 'desc');
        let flippedItems = _.orderBy(this.state.visibleItems, this.state.sorter, reverse);
        let visibleElements = this.state.renderItems(flippedItems);
        this.setState({ ...this.state, visibleItems: flippedItems, visibleElements: visibleElements, sortOrder: reverse })
        return flippedItems;
      },
      renderItems: (items) => {
        let visibleItems = items;
        let visibleElements = visibleItems.map((item) => {
          return <Post key={item.id} item={item}></Post>
        })
        return visibleElements;
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
            visibleElements: this.state.renderItems(_.orderBy(result,this.state.sorter, this.state.sortOrder)),
            visibleItems: result
          });
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
            Search
            <input className="textinput" name="search" type="text" placeholder="asdfasdf" value={this.state.searchValue} onChange={this.state.search} />
            Sort By
            <select className="dropdown" name="sort" value={this.state.sorter} onChange={this.state.sort}>
              <option value='title'>Title</option>
              <option value='created_at'>Post Date</option>
              <option value='company'>Company</option>
            </select>
            <button className='sortbutton' name="flip" onClick={this.state.flip} value={this.state.sortOrder}>{order}</button>
          </p>
          <p className="sortbuttongroup"> Searched: {this.state.searchValue}     Sort: {this.state.sorter}       Order: {this.state.sortOrder}</p>
          {this.state.visibleElements}
        </>
      );
    }
  }
}

export default Container;