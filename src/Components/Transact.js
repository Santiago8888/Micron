import React, { useState } from 'react'


const quantity_placeholder = 'Choose a round number between 1 and 10'
const quantity_props = { className:'input', type:'number', min:1, max:10, step:1, placeholder: quantity_placeholder } 
const secret_key_input_props = { className:'input', type:'text', placeholder:'Remember to keep it safe.' }

const TransactionForm = ({ recipient, onTransfer, sender }) => {
    const [ quantity, setQuantity ] = useState('')
    const [ secretKey, setSecretKey ] = useState('')

    return <div className="container" style={{width:600, marginTop:'2.5rem'}}>
        <div className="notification"> Send Microns to { recipient }. </div>
        <div class="field">
            <label class="label">Quanity</label>
            <input {...quantity_props} value={quantity} onChange={({ target }) => setQuantity(target.value)}/>
        </div>
        <div class="field" style={{margin:'1.25rem 0'}}>
            <label class="label">Secret Key</label>
            <input {...secret_key_input_props} value={secretKey} onChange={({ target }) => setSecretKey(target.value)}/>
        </div>
        <div className={'has-text-centered'}>
            <button
                style={{marginTop:'1.5rem'}} 
                className="button is-black" 
                onClick={()=> onTransfer({quantity: quantity, secretKey: secretKey})}
            >Submit</button>
        </div>
    </div>
}


const ShowBalance = ({ balance, onNavigate }) =>  <nav 
    class="panel is-black has-text-centered" 
    style={{marginTop: '3rem', maxWidth: 450, margin: '3rem auto' }}
>
    <p class="panel-heading"> Your new Balance. </p>
    <a class="panel-block is-active">
        <p className="is-size-3" style={{width:'100%'}}> { balance } </p>
    </a>
    
    <div class="panel-block">
        <button class="button is-black is-outlined" style={{width:300, margin:'auto'}} onClick={()=> onNavigate(true)}>
            New Transfer
        </button>
    </div>
</nav>


export const TransferView = ({recipient, clearRecipient, userId, client, userName}) => {
    const [ isTransfered, setIsTransfered ] = useState(false)
    const [ balance, setBalance ] = useState(null)

    const onTransfer = async({ quantity, secretKey }) => {
        const { success, data, msg } = await client.callFunction(
            'writeTransaction', 
            [{sender:{owner_id:userId, key:secretKey, name:userName}, recipientName:recipient, quantity: quantity}]
        )

        if(success){
            setBalance(data)
            setIsTransfered(true)    
        } else { console.log(msg)}
    }

    return !isTransfered
        ?   <TransactionForm recipient={recipient} onTransfer={onTransfer}/>
        :   <ShowBalance balance={balance} onNavigate={clearRecipient}/>
}
