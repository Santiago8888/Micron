exports = async function(owner_id){
    const db = context.services.get("mongodb-atlas").db("devMicron");

    // 1. Balance Recipient Aggregation Pipeline.
    const quantity_sent  = await db.collection('Ledger').aggregate([{'$match': {'sender_id': owner_id}}, {'$group': {'_id': 'quantity_sent', 'total': {'$sum': {'$sum': '$quantity'}}}}]).toArray()

    // 2. Balance Sender Aggregation Pipelone.
    const quantity_received = await db.collection('Ledger').aggregate([{'$match': {'recipient_id': owner_id}}, {'$group': {'_id': 'quantity_received', 'total': {'$sum': {'$sum': '$quantity'}}}}]).toArray()

    // 3. Substract both Pipelines.
    const balance = (quantity_received.length ? quantity_received[0].total : 0) - (quantity_sent.length ? quantity_sent[0].total : 0)

    // 4. Send Balance.
    return {success: true, data: balance}
};
