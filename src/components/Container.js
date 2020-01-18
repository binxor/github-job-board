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
      showFullDescription: false,
      sorter: 'title',
      sortOrder: 'asc',
      type: '',
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
        this.setState({ ...this.state, visibleItems: foundItems, visibleElements: visibleElements, searchValue: value, type: ''  });
        return foundItems;
      },
      searchType: (ele) => {
        let value = ele.target.value;
        let visibleItems = this.state.search({target:{value:this.state.searchValue}});
        let foundItems = visibleItems;
        if (value.length > 0){
            foundItems = _.filter(visibleItems, (item) => {
              return item.type == value;
            });
        }
        let visibleElements = this.state.renderItems(foundItems);
        this.setState({ ...this.state, visibleItems: foundItems, visibleElements: visibleElements, type: value });
        return foundItems;
      },
      shrinkDescription: () => {
        let shrink = !this.state.showFullDescription;
        let visibleItems = this.state.visibleItems.map((item) => {
          item['showFullDescription'] = shrink;
          return item;
        });
        let visibleElements = this.state.renderItems(visibleItems);
        this.setState({ ...this.state, visibleItems: visibleItems, visibleElements: visibleElements, showFullDescription: shrink });
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
      },
      renderTypes: (typeList) => {
        let options = typeList.map((option) => {
          return <option value={option}>{option}</option>
        });
        this.setState({ ...this.state, typeOptions: options });
        return options;
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
            typeList: [ ...new Set(result.map(item => item.type))].sort(),
            typeOptions: this.state.renderTypes([ ...new Set(result.map(item => item.type))].sort()),
            visibleElements: this.state.renderItems(_.orderBy(result,this.state.sorter, this.state.sortOrder)),
            visibleItems: result
          });
          this.state.shrinkDescription();
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
    const { error, flip, isLoaded, search, searchValue, searchType, showFullDescription, shrinkDescription, sort, sorter, sortOrder, type, typeOptions, visibleElements } = this.state;
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
            <input className="textinput" name="search" type="text" placeholder="asdfasdf" value={searchValue} onChange={search} />
            Type
            <select className="dropdown" name="sort" value={type} onChange={searchType}>
              <option value=''>All</option>
              {typeOptions}
            </select>
            Sort By
            <select className="dropdown" name="sort" value={sorter} onChange={sort}>
              <option value='title'>Title</option>
              <option value='created_at'>Post Date</option>
              <option value='company'>Company</option>
            </select>
            <button className='sortbutton' name="flip" onClick={flip} value={sortOrder}>{order}</button>
            Expand
            <input className="checkbox" type="checkbox" name="check" value={showFullDescription} onChange={shrinkDescription} />
          </p>
          <h2 className="postersubtitle">{visibleElements.length} Jobs Found</h2>
          {visibleElements}
        </>
      );
    }
  }
}

export default Container;