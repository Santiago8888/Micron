import { SignUpForm, SecretKeyDisplay } from './SignUp'
import { UsersTable } from './Users'
import { TransferView } from './Transact'
import { v4 as uuidv4 } from 'uuid'

import React, { useState, useEffect } from 'react'


export const Intro = ({ db, userId, setAuthenticated }) => {
    const secretKey = uuidv4()
    const [signedIn, setSignedIn] = useState(false)
    
    const onSignUp = async name => {
        await db.collection('Users').insertOne({ key: secretKey, name: name, owner_id: userId }).catch(console.log)
        setSignedIn(true)
    } 

    return !signedIn 
        ? <SignUpForm onSignUp={onSignUp}/> 
        : <SecretKeyDisplay secretKey={secretKey} setAuthenticated={setAuthenticated} /> 
} 


export const AuthenticatedView = ({ db, userId, client, userName }) => {
    const [ users, setUsers ] = useState([])
    const [ selectedUser, setSelectedUser ] = useState(null)

    useEffect(() => {
        async function fetchUsers(){
            const users = await db.collection('Users').find().asArray().catch(console.log)
            setUsers(users.sort((a, b)=> a.hasOwnProperty('owner_id') ? -1 : b.hasOwnProperty('owner_id') ? 1 : 0))
            // Reference for Sorting Objects with uundefined properties: https://stackoverflow.com/a/52461125/6823310
        } fetchUsers()
    }, [])


    return !selectedUser 
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
