import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import SignUpForm from "@/components/SignUpForm";
import { Link } from "expo-router";
import colors from "@/constants/colors";

export default function SignUp() {
    return (
        <View style={styles.container}>
            <Link href="/screens/Login" asChild>
                <TouchableOpacity style={styles.loginContainer}>
                    <Text style={styles.loginLink}>Have an Account? Login</Text>
                </TouchableOpacity>
            </Link>
            <SignUpForm />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.offWhite_background,
        justifyContent: "center",
        width: "100%",
        height: "100%",
        alignItems: "center",
    },
    loginLink: {
        textDecorationLine: "underline",
    },
    loginContainer: {
        position: "absolute",
        top: 50,
        right: 30,
    },
});
