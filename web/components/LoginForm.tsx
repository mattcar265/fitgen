import colors from "@/constants/colors";
import React from "react";
import { useForm } from "react-hook-form";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

const LoginForm = () => {
    const {
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <View style={styles.formContainer}>
            <View>
                <Text>Email</Text>
                <TextInput
                    style={styles.formInput}
                    placeholder="Enter email"
                    keyboardType="email-address"
                    onChangeText={(text) => setValue("email", text)}
                />
                {errors.email && <Text>Email is required</Text>}
            </View>

            <View>
                <Text>Password</Text>
                <TextInput
                    style={styles.formInput}
                    placeholder="Enter password"
                    secureTextEntry
                    onChangeText={(text) => setValue("password", text)}
                />
                {errors.password && <Text>Password is required</Text>}
            </View>

            <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                style={styles.submitButton}
            >
                <Text style={styles.submitText}>Create Account</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        marginTop: 20,
        width: "60%",
    },
    formInput: {
        borderWidth: 1,
        borderColor: colors.grey_neutral,
        padding: 5,
        marginVertical: 10,
        borderRadius: 8,
    },
    submitButton: {
        backgroundColor: colors.orange_accent,
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
        marginVertical: 10,
    },
    submitText: {
        color: colors.white_onPrimary,
    },
});

export default LoginForm;
