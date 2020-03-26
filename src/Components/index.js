import { SignUpForm, SecretKeyDisplay } from './SignUp'
import { UsersTable } from './Users'
import { TransferView } from './Transact'
import { v4 as uuidv4 } from 'uuid'

import React, { useState, useEffect } from 'react'


export const Intro = ({ setAuthenticated }) => {
    const secretKey = uuidv4()
    const [signedIn, setSignedIn] = useState(false)
    
    const onSignUp = v => {
        console.log(v)
        setSignedIn(true)
    } 

    return !signedIn 
        ? <SignUpForm onSignUp={onSignUp}/> 
        : <SecretKeyDisplay secretKey={secretKey} setAuthenticated={setAuthenticated} /> 
} 


export const AuthenticatedView = () => {
    const [ users, setUsers ] = useState([])
    const [ selectedUser, setSelectedUser ] = useState(null)

    useEffect(() => {
        async function fetchUsers(){
            setUsers([{name: 'User 1'}, {name: 'User 2'}])
        } fetchUsers()
    }, [])


    return !selectedUser 
        ?   <UsersTable users={users} onUserSelect={u => setSelectedUser(u)}/>
        :   <TransferView recipient={selectedUser} clearRecipient={() => setSelectedUser(null)}/>
}
