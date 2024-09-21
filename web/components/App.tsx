import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function App() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Notice that the status bar has light text!
            </Text>
            <StatusBar style="dark" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#fff",
    },
});
