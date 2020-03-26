exports = async function({sender: s, recipientName, quantity}){
    const db = context.services.get("mongodb-atlas").db("devMicron");

    // 1. Assert sender, owner_id, key document exists.
    const sender = await db.collection('Users').findOne(s)
    if(!sender){ return {success: false, msg: 'Sender not found/valid.'}}

    // 2. Assert recipient exists.
    const recipient = await db.collection('Users').findOne({name: recipientName})
    if(!recipient){ return {success: false, msg: 'Recipient not found.'}}
    
    // 3. Assert Quantity is integer and between 1 and 10 (inclusive).
    if(quantity < 1 || quantity > 10){ 
        return {success: false, msg: `Invalid quantity ${quantity}`}
    } 

    // 4. Write balance { recipient, quantity, sender }.
    await db.collection('Ledger').insertOne({ sender_id: sender.owner_id, recipient_id: recipient.owner_id, quantity: parseInt(quantity)})

    // 5. Balance Recipient Aggregation Pipeline.
    const quantity_sent  = await db.collection('Ledger').aggregate([{'$match': {'sender_id': sender.owner_id}}, {'$group': {'_id': 'quantity_sent', 'total': {'$sum': {'$sum': '$quantity'}}}}]).toArray()

    // 6. Balance Sender Aggregation Pipelone.
    const quantity_received = await db.collection('Ledger').aggregate([{'$match': {'recipient_id': sender.owner_id}}, {'$group': {'_id': 'quantity_received', 'total': {'$sum': {'$sum': '$quantity'}}}}]).toArray()

    // 7. Substract both Pipelines.
    const balance = (quantity_received.length ? quantity_received[0].total : 0) - (quantity_sent.length ? quantity_sent[0].total : 0)

    // 8. Send Balance.
    return {success: true, data: balance}
}


// exports({ sender:{ key:"76961c95-4a40-440b-82cd-4f68207c27ef", name:"Test", owner_id:"5e7c8169eccf29823384a32f" },  recipientName: "Test 1", quantity: 5 })
