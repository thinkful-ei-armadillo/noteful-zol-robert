import React, {Component} from 'react'
import NotefulContext from '../NotefulContext'

export default class AddFolder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      folder: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:9090/folders', {
      method:'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: {
        name: this.state.folder,
      }
    })
    .then(res => {
      if(!res.ok) {
        throw new Error(res.status);
      }
      return res.json()})
      .then(folder => 
        console.log(folder))
  }

  setFolderName = (folder) => {
    this.setState({
      folder
    })
  }

  render() {
    return(
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <label >
          Folder Name: <input name='folder' type='text' placeholder='folder name' onChange={(event)=> this.setFolderName(event.target.value)}/>
        </label>
        <button>Submit</button>
      </form>
    )
  }
}