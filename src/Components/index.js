import { SignUpForm, SecretKeyDisplay } from './SignUp'
import { UsersTable } from './Users'
import { TransferView } from './Transact'
import { v4 as uuidv4 } from 'uuid'

import React, { useState, useEffect, Fragment } from 'react'
import { Hero, NavBar } from './Landing'


const HERO_PROPS = {
	src: 'network.jpg',
	titles: ['Peer to Peer ', 'Microtransactions Network'],
	subtitle: 'Send money in a secure & private way.',
	cta: 'Get Started'
}

export const Intro = ({ db, userId, setAuthenticated }) => {
    const [ secretKey, setSecretKey ] = useState(null)
    const [ signedIn, setSignedIn ] = useState(false)
    const [ userName, setUserName ] = useState(null)
    
    const onSignUp = async name => {
        setUserName(name)

        const secretKey = uuidv4()
        setSecretKey(secretKey)

        await db.collection('Users').insertOne({ key: secretKey, name: name, owner_id: userId }).catch(console.log)
        setSignedIn(true)
    }

    return <Fragment>
        <Hero {...HERO_PROPS}>{
            !signedIn 
                ? <SignUpForm onSignUp={onSignUp}/> 
                : <SecretKeyDisplay secretKey={secretKey} setAuthenticated={()=> setAuthenticated(userName)} /> 
        }</Hero>
    </Fragment>
} 


export const AuthenticatedView = ({ db, userId, client, userName }) => {
    const [ users, setUsers ] = useState([])
    const [ selectedUser, setSelectedUser ] = useState(null)

    useEffect(() => {
        async function fetchUsers(){
            const users = await db.collection('Users').find().asArray().catch(console.log)
            setUsers(users.sort((a, b)=> a.hasOwnProperty('owner_id') ? -1 : b.hasOwnProperty('owner_id') ? 1 : 0))
            // Reference for Sorting Objects with undefined properties: https://stackoverflow.com/a/52461125/6823310
        } fetchUsers()
    }, [])

    return <Fragment>
        <NavBar/>
        {
            !selectedUser 
            ?   <UsersTable users={users} onUserSelect={u => setSelectedUser(u)} client={client}/>
            :   
                <TransferView 
                    userId={userId}
                    client={client}
                    userName={userName}
                    recipient={selectedUser} 
                    clearRecipient={() => setSelectedUser(null)}
                />
        }
    </Fragment>
}
