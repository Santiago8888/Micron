import React, { useState } from 'react'


export const UsersTable = ({ users, onUserSelect, client }) => {
    const [ usersButtonText, setUsersButtonText ] = useState('Check Balance')
    const checkBalance = async owner_id => {
        const { success, data } = await client.callFunction('checkBalance', [owner_id])
        if(success){ setUsersButtonText(data) } 
        else { console.log('Error checking balance')}
    }

    return <div className="container has-text-centered">
        <p className="title is-size-4" style={{color:'black', margin:'2.5rem'}}>  User Accounts </p>
        <table className="table" style={{margin:'auto'}}>
            <thead>
                <tr>
                    <th><abbr title="Index">#</abbr></th>
                    <th>Name</th>
                    <th/>
                </tr>
            </thead>
            <tbody >
                {users.map(({ name, owner_id }, i) => 
                    <tr key={`user-${i}`} >
                        <th>{i+1}</th>
                        <td className="has-text-left">  { name } </td>
                        <td className="has-text-right" style={{minWidth:200}}>{
                            owner_id
                            ? <button className="button" onClick={()=> checkBalance(owner_id)}> { usersButtonText } </button>
                            : <button className="button" onClick={()=> onUserSelect(name)}> Transfer </button>
                        }</td>
                        
                    </tr>
                )}
            </tbody>
        </table>
    </div>
}

