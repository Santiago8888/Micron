import React, { useState } from 'react'


const quantity_placeholder = 'Select a round quantity between 1 and 10'
const quantity_props = { className:'input', type:'number', min:1, max:10, step:1, placeholder: quantity_placeholder } 
const secret_key_input_props = { className:'input', type:'text', placeholder:'Remember when we said it was important?' }

const TransactionForm = ({ recipient, onTransfer, sender }) => {
    const [ quantity, setQuantity ] = useState('')
    const [ secretKey, setSecretKey ] = useState('')

    return <div className="container">
        <div className="notification"> Send Microns to { recipient }. </div>
        <input {...quantity_props} value={quantity} onChange={({ target }) => setQuantity(target.value)}/>
        <input {...secret_key_input_props} value={secretKey} onChange={({ target }) => setSecretKey(target.value)}/>
        <button className="button" onClick={()=> onTransfer({quantity: quantity, secretKey: secretKey})}>Submit</button>
    </div>
}


const ShowBalance = ({ balance, onNavigate }) =>  <div className="container">
    <div className="notification"> Your new Balance. </div>
    <p className="is-size-4	">  { balance } </p>
    <button className="button" onClick={()=> onNavigate(true)}> New Transfer </button>
</div>



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
