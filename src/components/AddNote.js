import React, { Component } from 'react';
import NotefulContext from '../NotefulContext'; 
import ValidationError from './validationError';

export default class AddNote extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            folderId: '',
            content: '',
            modified: new Date(),

            nameValid: false,
            formValid: false,
            validationMessages: {
                name: '',
            }
        }
    }

    static contextType = NotefulContext;

    setNoteState = (name) => {
        this.setState({name}, () => {this.validateName(name)})
    }

    setContentState = (content)=>{
        this.setState({content})
    }

    setFolderId = (folderId) => {
        this.setState({folderId})
    }

    validateName(fieldValue) {
        const fieldErrors = {...this.state.validationMessages};
        let hasError = false;
    
        fieldValue = fieldValue.trim();
        if(fieldValue.length === 0) {
          fieldErrors.name = 'Name is required';
          hasError = true;
        } else {
            fieldErrors.name = '';
            hasError = false;
          }

        this.setState({
          validationMessages: fieldErrors,
          nameValid: !hasError
        }, this.formValid );
      }

      formValid() {
        this.setState({
          formValid: this.state.nameValid
        });
      }

    handleSubmit = (e) => {
        e.preventDefault();
        let options = {
                        name: this.state.name,
                        folderId: this.state.folderId,
                        content: this.state.content,
                        modified: this.state.modified,
                      }
        fetch('http://localhost:9090/notes/', {
            method:'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(options),
          })
          .then(res => {
            if(res.ok) return res.json()
            else  throw new Error(res.status);
            })
            .then(note => {
              this.context.addNote(note);
              this.props.history.push(`/folder/${note.folderId}`);
            })
            .catch(error => console.log(error))
    }
   
    render(){ 
        const options = this.context.folders.map(folder => {
            return <option key={folder.id} value={folder.id}>{folder.name}</option>
        })
        console.log(this.context)
        return (
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <label>Add Note:
                    <input type="text" name="note" id="note" onChange={(event) => this.setNoteState(event.target.value)} />
                    <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.name}/>
                    <textarea type="text" name="content" id="content" onChange={(event) => this.setContentState(event.target.value)} />
                    <select name="folderId" onChange={(event) => this.setFolderId(event.target.value)}>
                        <option selected disabled>Select folder</option>
                        {options}
                    </select>
                    <button type="submit" disabled={!this.state.formValid}>Submit</button>
                    <button onClick={() => this.props.history.goBack()}>Cancel</button>
                </label>
            </form>
        )
    }
}