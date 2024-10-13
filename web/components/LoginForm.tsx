import colors from "@/constants/colors";
import env from "@/env/env";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

const LoginForm = () => {
    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (data: any) => {
        console.log(data);

        const backend_url = "http://" + env.BACKEND_IP + ":8080/login";
        console.log(backend_url);

        const response = await fetch(backend_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.status === 200) {
            console.log("login successful!");
            router.push("/screens/Dashboard");
        }
    };

    return (
        <View style={styles.formContainer}>
            <Controller
                control={control}
                name="email"
                rules={{ required: "Email is required" }}
                render={({ field: { onChange, value } }) => (
                    <View>
                        <Text>Email</Text>
                        <TextInput
                            style={styles.formInput}
                            keyboardType="email-address"
                            onChangeText={onChange}
                            value={value}
                        />
                        {errors.email && <Text>{errors.email.message}</Text>}
                    </View>
                )}
            />

            <Controller
                control={control}
                name="password"
                rules={{ required: "Password is required" }}
                render={({ field: { onChange, value } }) => (
                    <View>
                        <Text>Password</Text>
                        <TextInput
                            style={styles.formInput}
                            onChangeText={onChange}
                            value={value}
                        />
                        {errors.password && (
                            <Text>{errors.password.message}</Text>
                        )}
                    </View>
                )}
            />

            <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                style={styles.submitButton}
            >
                <Text style={styles.submitText}>Login</Text>
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
