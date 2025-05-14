import ApolloProviderComponent from "./ApolloClient";
import UserManagement from "./UserManagement";

function App() {
    return (
        <ApolloProviderComponent>
            <UserManagement />
        </ApolloProviderComponent>
    );
}

export default App;
