import React, { useState, Fragment } from 'react'



export const SignUpForm = ({ onSignUp }) => {
    const [ userName, setUserName ] = useState('')

    return <Fragment>
        <input 
            className="input" 
            type="text" 
            placeholder="Select a Unique User Name to get started" 
            style={{maxWidth: 400}}
            onChange={({ target }) => setUserName(target.value)}
        />
        <button
            style={{maxWidth:100}} 
            className="button is-black" 
            onClick={()=> onSignUp(userName)}
        >Submit</button>
    </Fragment>
}


export const SecretKeyDisplay = ({ secretKey, setAuthenticated }) => <div style={{maxWidth:600}}>
    <div className="notification is-black"> This is your Secret Key. Store it somewhere safely. </div>
    <p className="title is-size-4" style={{color:'black'}}>  { secretKey } </p>
    <button className="button" onClick={()=> setAuthenticated(true)}> Continue </button>
</div>
