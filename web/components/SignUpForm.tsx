import colors from "@/constants/colors";
import React from "react";
// import env from "../env/env";
import { Controller, useForm } from "react-hook-form";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

const SignUpForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
            phone: "",
            height: "",
            weight: "",
            age: "",
            gender: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (data: any) => {
        console.log(data);

        const backend_url = "http://localhost:8080/signup";
        console.log(backend_url);

        const response = await fetch(backend_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
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

            <Controller
                control={control}
                name="phone"
                rules={{ required: "Phone is required" }}
                render={({ field: { onChange, value } }) => (
                    <View>
                        <Text>Phone</Text>
                        <TextInput
                            style={styles.formInput}
                            onChangeText={onChange}
                            value={value}
                        />
                        {errors.phone && <Text>{errors.phone.message}</Text>}
                    </View>
                )}
            />

            <Controller
                control={control}
                name="height"
                rules={{ required: "Height is required" }}
                render={({ field: { onChange, value } }) => (
                    <View>
                        <Text>Height</Text>
                        <TextInput
                            style={styles.formInput}
                            onChangeText={onChange}
                            value={value}
                        />
                        {errors.height && <Text>{errors.height.message}</Text>}
                    </View>
                )}
            />

            <Controller
                control={control}
                name="weight"
                rules={{ required: "Weight is required" }}
                render={({ field: { onChange, value } }) => (
                    <View>
                        <Text>Weight</Text>
                        <TextInput
                            style={styles.formInput}
                            onChangeText={onChange}
                            value={value}
                        />
                        {errors.weight && <Text>{errors.weight.message}</Text>}
                    </View>
                )}
            />

            <Controller
                control={control}
                name="age"
                rules={{ required: "Age is required" }}
                render={({ field: { onChange, value } }) => (
                    <View>
                        <Text>Age</Text>
                        <TextInput
                            style={styles.formInput}
                            onChangeText={onChange}
                            value={value}
                        />
                        {errors.age && <Text>{errors.age.message}</Text>}
                    </View>
                )}
            />

            <Controller
                control={control}
                name="gender"
                rules={{ required: "Gender is required" }}
                render={({ field: { onChange, value } }) => (
                    <View>
                        <Text>Gender</Text>
                        <TextInput
                            style={styles.formInput}
                            onChangeText={onChange}
                            value={value}
                        />
                        {errors.gender && <Text>{errors.gender.message}</Text>}
                    </View>
                )}
            />

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

export default SignUpForm;
