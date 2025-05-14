import { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USERS, DELETE_USER } from "./queries";

const UsersList = ({ onRefetchReady, searchQuery }) => {
    const [deleteUser] = useMutation(DELETE_USER);

    const { loading, error, data, refetch } = useQuery(GET_USERS, {
        variables: { name: "", email: "" },
    });

    useEffect(() => {
        if (onRefetchReady) {
            onRefetchReady(() => refetch({ name: "", email: "" }));
        }
    }, []);

    useEffect(() => {
        const isEmail = searchQuery.includes("@");
        const vars = {
            name: isEmail ? "" : searchQuery,
            email: isEmail ? searchQuery : "",
        };

        refetch(vars);
    }, [searchQuery]);

    const handleDelete = async (id) => {
        try {
            await deleteUser({ variables: { id } });
            await refetch();
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <ul>
                {data.users.length === 0 ? (
                    <li style={{ textAlign: "center", padding: "20px" }}>
                        No users found.
                    </li>
                ) : (
                    data.users.map((user) => (
                        <li key={user.id}>
                            {user.name} ({user.email}){" "}
                            <button onClick={() => handleDelete(user.id)}>
                                Delete
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default UsersList;
