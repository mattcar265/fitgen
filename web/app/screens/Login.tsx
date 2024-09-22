import { Text, View, StyleSheet } from "react-native";
import colors from "../../constants/colors";
import LoginForm from "@/components/LoginForm";

export default function Login() {
    return (
        <View style={styles.container}>
            <View style={styles.logo}></View>
            <Text style={styles.title}>FitGen AI</Text>
            <LoginForm />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.offWhite_background,
        justifyContent: "center",
        width: "100%",
        alignItems: "center",
    },
    logo: {
        width: 44,
        marginBottom: 20,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.purple_primary,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
});
