import React, { Component } from 'react';
import axios from 'axios';
import * as _ from 'lodash';

class ApiTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      perPage: 20,
      pages: 0,
      currentPage: 1,
      data: [],
      keys: []
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    axios.get(this.props.api).then(response => {
      this.setState({
        data: response.data,
        keys: _.keys(response.data[0]),
        pages: Math.ceil(response.data.length / this.state.perPage),
        currentPage: 1
      });
    }).catch(error => {
      alert(error);
    });
  }
  setPage(page) {
    this.setState({
      currentPage: page
    })
  }
  render() {
    let pages = Array(this.state.pages).fill().map((_, index) => {
      let page = index + 1;
      return (
        <div className={'page '+(page === this.state.currentPage ? 'active' : '')} key={page} onClick={(e) => this.setPage(page)}>
          {page}
        </div>
      )
    });
    let keys = this.state.keys.map((key, index) => {
      return (
          <th key={index}>{key}</th>
      );
    });
    let data = this.state.data.map((single, index) => {
      if(index >= this.state.perPage * this.state.currentPage || index < this.state.perPage * (this.state.currentPage - 1))
         return null;
      return (
        <tr key={single.id}>
          {
            this.state.keys.map((key, i) => {
              return (
                <td key={i}>{single[key]}</td>
              )
            })
          }
        </tr>
      );
    });

    return (
      <div className="api-table">
        <div className="pagination">
          {pages}
        </div>
        <table>
          <thead>
            <tr>
              {keys}
            </tr>
          </thead>
          <tbody>
            {data}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ApiTable;
