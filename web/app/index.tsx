import { Text, View } from "react-native";

export default function HomeScreen() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text>Welcome to the App!</Text>
        </View>
    );
}
