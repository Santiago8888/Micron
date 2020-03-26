import React from 'react'


export const UsersTable = ({ users, onUserSelect }) => <table className="table">
    <thead>
        <tr>
            <th><abbr title="Index">I</abbr></th>
            <th>Name</th>
            <th/>
        </tr>
    </thead>
    <tbody>
        {users.map(({ name }, i) => 
            <tr key={`user-${i}`}>
                <th>{i+1}</th>
                <td> { name } </td>
                <td> <button className="button" onClick={()=> onUserSelect(name)}>Transfer</button> </td>
            </tr>
        )}
    </tbody>
</table>
