import type {UserTableType } from "../../types/Types";

interface Props {
    user: UserTableType
    handleStatus: (userId: string, isActive:boolean) => void
}

function UserRow ({user, handleStatus}: Props) {
    
    const text = user.isActive ? "Aktiv" : "Inaktiverad"

    return (
        <tr>
            <td>{user.userId}</td>
            <td>{user.userName}</td>
            <td>{user.userEmail}</td>
            <td>{text}</td>
            <td>
                <button 
                onClick={() => handleStatus(user.userId, !user.isActive) } 
                disabled= {!user.isActive}>Inaktivera användare</button>
                <button  
                onClick={() => handleStatus(user.userId, !user.isActive)} 
                disabled = {user.isActive}>
                    Aktivera användare</button>
            </td>
        </tr>
    )


}

export default UserRow;