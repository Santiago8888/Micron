import React, { useState } from 'react'



export const SignUpForm = ({ onSignUp }) => {
    const [ userName, setUserName ] = useState('')

    return <div className="container">
        <div className="notification"> Sign up to Continue. </div>
        <input className="input" type="text" placeholder="Unique Name" onChange={({ target }) => setUserName(target.value)}/>
        <button className="button" onClick={()=> onSignUp(userName)}>Submit</button>
    </div>
}


export const SecretKeyDisplay = ({ secretKey, setAuthenticated }) => <div className="container">
    <div className="notification"> This is important. Store this  secret somewhere safe. </div>
    <p className="is-size-4	">  { secretKey } </p>
    <button className="button" onClick={()=> setAuthenticated(true)}>Submit</button>
</div>
