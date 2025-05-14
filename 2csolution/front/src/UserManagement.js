import { useRef, useState } from "react";
import RegistrationForm from "./RegistrationForm";
import UsersList from "./UsersList";

const UserManagement = () => {
    const usersListRef = useRef();
    const [searchQuery, setSearchQuery] = useState("");

    const handleUserAdded = () => {
        if (usersListRef.current) {
            usersListRef.current();
        }
    };

    return (
        <>
            <div className="user-management-container">
                <div className="left-column">
                    <h1>User Management</h1>
                    <RegistrationForm onUserAdded={handleUserAdded} />
                </div>

                <div className="right-column">
                    <h1>Users</h1>
                    <div style={{ marginBottom: "10px" }}>
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                padding: "10px",
                                fontSize: "16px",
                                width: "100%",
                                borderRadius: "8px",
                                border: "1px solid #ccc",
                            }}
                        />
                    </div>
                    <UsersList
                        searchQuery={searchQuery}
                        onRefetchReady={(refetch) =>
                            (usersListRef.current = refetch)
                        }
                    />
                </div>
            </div>
        </>
    );
};

export default UserManagement;
