import React, { Component } from 'react';
import NotefulContext from '../NotefulContext'; 

export default class AddNote extends Component {
    static contextType = NotefulContext;

    constructor(props){
        super(props)
        this.state = {
            name: '',
            folderId: '',
            content: '',
            modified: new Date(),
        }
    }

    setNoteState = (name) => {
        this.setState({name})
    }

    setContentState = (content)=>{
        this.setState({content})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
       let options = {...this.state}
        fetch('http://localhost:9090/notes', {
            method:'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({...options}),
          })
          .then(res => {
            if(!res.ok) {
              throw new Error(res.status);
            }
            return res.json()})
            .then(note => {
              this.context.addNote(note);
              this.props.history.push('/');
            })
            .catch(error => console.log(error))
    }

    
   
    render(){
        const options = this.context.folders.map((folder) => {
            return (
                <option value = {folder.id} key = {folder.id} >{folder.name}</option>
            )
        })
        console.log(this.state)
        return (
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <label>Add Note:
                    <input type="text" name="note" onChange={(event) => this.setNoteState(event.target.value)} />
                    <textarea type="text" name="content" onChange={(event) => this.setContentState(event.target.value)} />
                    <select onChange = {(event) => {this.setState({folderId:event.target.value})}}>
                        <option disabled selected>Select a Folder</option>
                        {options}
                    </select>
                    <button type="submit">Submit</button>
                </label>
            </form>
        )
    }
}