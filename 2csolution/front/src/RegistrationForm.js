import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "./queries";

const RegistrationForm = ({ onUserAdded }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [addUser, { data, loading, error }] = useMutation(ADD_USER);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addUser({
                variables: {
                    name,
                    email,
                },
            });
            setName("");
            setEmail("");
            onUserAdded();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />{" "}
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />{" "}
            <button type="submit"> Register </button>
            {loading && <p> Loading... </p>}{" "}
            {error && <p> Error: {error.message} </p>}{" "}
        </form>
    );
};

export default RegistrationForm;
