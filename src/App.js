import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import NotefulContext from './NotefulContext';

// import STORE from './store';
import Folderlist from './components/Folderlist'
import Folder from './components/Folder';
import Notelist from './components/Notelist';
import NoteInfo from './components/NoteInfo';
import AddFolder from './components/AddFolder';
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
    console.log(this.state)
  }
  // ===============================================================

  deleteNote = (noteId) => {
    const newNotes = this.state.notes.filter(note => note.id !== noteId)
    this.setState({
      notes: newNotes
    })
  }


  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote,
      // add new note, add new folder and delete note
    }
    console.log(contextValue)
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
              </Switch>
            </main>
          </div>
        </div>
      </NotefulContext.Provider>
    );
  }
}

export default App;
