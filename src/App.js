import { RemoteMongoClient, Stitch, AnonymousCredential } from 'mongodb-stitch-browser-sdk'
import { Intro, AuthenticatedView } from './Components'
import React, { useState, useEffect } from 'react'
import './App.scss'


const client = Stitch.initializeDefaultAppClient('micron-cxfbm')
const mongo = client.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas")
export const db = mongo.db("devMicron")

const App = () => {
    const [ userId, setUserId ] = useState(null)
    const [ userName, setUserName ] = useState(null)
    const [ isAuthenticated, setAuthenticated ] = useState(false)

    useEffect(() => {
        async function fetchData(){
            const { id: userId } = await client.auth.loginWithCredential(new AnonymousCredential())
            setUserId(userId)

            const user = await db.collection('Users').findOne({owner_id: userId}).catch(console.log)
            setUserName(user ? user.name : null)

            user ? setAuthenticated(true) : setAuthenticated(false)
        } fetchData()
    }, [])

    const authenticate = userName => {
        setUserName(userName)
        setAuthenticated(true)
    }

  
    return <div className="App">
        { isAuthenticated // Condition can be settled with userName.
            ?   <AuthenticatedView db={db} userId={userId} client={client} userName={userName}/>
            :   <Intro db={db} userId={userId} setAuthenticated={authenticate}/>
        }
    </div>
}


export default App
