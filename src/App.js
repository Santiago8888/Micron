import { Intro, AuthenticatedView } from './Components'
import React, { useState } from 'react'
import './App.scss'

const App = () => {
    const [ isAuthenticated, setAuthenticated ] = useState(false)

    return <div className="App">
        { isAuthenticated
            ?   <AuthenticatedView />
            :   <Intro setAuthenticated={() => setAuthenticated(true)}/>
        }
    </div>
}


export default App
