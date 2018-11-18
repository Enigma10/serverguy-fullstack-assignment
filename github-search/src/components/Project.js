import React from 'react';
import { Card, Input, Row, Col, Button, Table, Divider, Tag } from 'antd';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'text/plain;charset=utf-8';
axios.defaults.withCredentials = true


const columns = [{
  title: 'Project Name',
  dataIndex: 'full_name',
  key: 'full_name',
}, {
  title: 'Owner',
  key: 'ownername',
  dataIndex: 'owner',
  render: owner => (
    <span>
      {owner.login}
    </span>
  ),
}, {
  title: 'Stargazers count',
  dataIndex: 'stargazers_count',
  key: 'stargazers_count',
}, {
  title: 'Owner',
  key: 'owner',
  dataIndex: 'owner',
  render: owner => (
    <span>
      {owner.type}
    </span>
  ),
}, {
  title: 'Project Url',
  key: 'url',
  dataIndex: 'url',
  render: (url) => (
    <span>
      <a href={url}>Url </a>
    </span>
  ),
}];

const resultColumn = [{
  title: 'Search',
  dataIndex: 'text',
  key: 'text',
}, {
  title: 'Email',
  key: 'email',
  dataIndex: 'email',
}, {
  title: 'Created At',
  dataIndex: 'createdAt',
  key: 'createdAt',
}];

class Project extends React.Component {
  state = { 
    search: 'react',
    data: [],
    isSearching: true,
    showSearch: false,
    searchData: []
  }
  handleChange = (event) => {
    this.setState({search: event.target.value})
  }
  handleResult = () => {
    axios.post(`/search/list`, {
        email: 'example@gmail.com',
      }).then(res=> {
      this.setState({
        isSearching: true,
        showSearch: true,
        searchData: res.data.data
      })
    })    
  }
  handleSubmit = () => {
    const { search } = this.state
    this.setState({ isSearching: true });
    axios.post(`http://localhost:3000/search/search`, {
      email: 'example@gmail.com',
			text: search
    }).then(res=> {
      console.log(res)
    })

    fetch(`https://api.github.com/search/repositories?q=${search}&page=1`, {
      method: "GET"
    })
    .then(response => response.json())
    .then(res => {
      const projects = res.items;
      this.setState({
        data: projects,
        isSearching: false
       });
    })
  }


  render() {
    const { search, data, isSearching, showSearch, searchData } = this.state

    return (
      <div style={{display: 'flex', justifyContent: 'center', alignContent: 'center', marginTop: '20vh'}}>
        <Card title="Github Project" bordered={true} style={{ width: 800 }}>
            <Row gutter={24} justify="space-between">
              <Col span="16">
                <Input value={search} onChange={this.handleChange}
                  placeholder="Please Input Technology here" size="large"/>
              </Col>
              <Col span="8" style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button size="large" type="primary" onClick={this.handleSubmit}>Search </Button>
                <Button size="large" type="primary" onClick={this.handleResult}> Show Result </Button>
              </Col>
            </Row>
            <div>
            { 
              isSearching===true && data.length === 0 ? '' : isSearching === true && data.length !== 0 ? 'Loading' : <Table style={{marginTop: '20px'}} columns={columns} dataSource={data} />
            }
            </div>
            { 
              isSearching===true && showSearch  ? <Table style={{marginTop: '20px'}} columns={resultColumn} dataSource={searchData} /> : false
            }
        </Card>
      </div>
    );
  }
}

export default Project;