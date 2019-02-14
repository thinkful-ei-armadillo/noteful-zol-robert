import React from 'react'

const NotefulContext = React.createContext({
    folders: [],
    notes: [],
    folderId: '',
    deleteNote: ()=>{},
    addFolder: () => {},
    // setFolderId: () => {},
})

export default NotefulContext