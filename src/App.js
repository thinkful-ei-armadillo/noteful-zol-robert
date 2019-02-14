import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import NotefulContext from './NotefulContext';

// import STORE from './store';
import Folderlist from './components/Folderlist'
import Folder from './components/Folder';
import AddFolder from './components/AddFolder';
import Notelist from './components/Notelist';
import NoteInfo from './components/NoteInfo';
import AddNote from './components/AddNote';
import './App.css';

class App extends Component {
  state = {
    folders: [],
    notes: [],
  }

  // =================Update state with get request================
  componentDidMount(){
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      }
    }

    Promise.all([
        fetch('http://localhost:9090/folders', options),
        fetch('http://localhost:9090/notes', options)
    ])
    .then(([res1, res2]) => {
      if(res1.ok && res2.ok) return Promise.all([res1.json(), res2.json()])
      else throw new Error(res1.status, res2.status)
    })
    .then(([folders, notes]) => {
      this.setState({
          folders, 
          notes,
      })
    })
    .catch(error => console.log(error))
  }
  // ===============================================================

  deleteNote = (noteId) => {
    const newNotes = this.state.notes.filter(note => note.id !== noteId)
    this.setState({
      notes: newNotes
    })
  }
  
  addFolder = (folder) => {
    this.setState({
      folders: [...this.state.folders, folder]
    })
  }

  addNote = (note) => {
    this.setState({
      note: [...this.state.notes, note]
    })
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote,
      // add new note, add new folder and delete note
    }
  
    return (
      <NotefulContext.Provider value={contextValue}>
        <div className="App">
          <header>
            <h1><Link to='/'>Noteful</Link></h1>
          </header>
          <div className="main">
            <nav className="nav-bar">
              <Switch>
                <Route
                  exact
                  path='/'
                  component={Folderlist}
                />
                <Route
                  exact
                  path='/folder/:folderId'
                  component={Folderlist}
                />
                <Route
                  path='/note/:noteId'
                  component={Folder}
                />
                <Route
                  path='/add-folder'
                  component={AddFolder}
                />
                <Route 
                  path='/add-note'
                  component={Folderlist} 
                />
              </Switch>
            </nav>
            <main className="main-note">
              <Switch>
                <Route
                  exact
                  path='/'
                  component={Notelist}
                />
                <Route
                  path='/folder/:folderId'
                  component={Notelist}
                />
                <Route
                  path='/note/:noteId'
                  component={NoteInfo}
                />
                <Route 
                  path='/add-folder'
                  component={Notelist}
                />                
                <Route 
                  path='/add-note'
                  component={AddNote}
                />
              </Switch>
            </main>
          </div>
        </div>
      </NotefulContext.Provider>
    );
  }
}

export default App;
