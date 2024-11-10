import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
} from "react-native";
import colors from "@/constants/colors";
import React, { useEffect, useState } from "react";
import WorkoutPlanForm from "@/components/WorkoutPlanForm";
import BottomNav from "@/components/BottomNav";
import { Controller, useForm } from "react-hook-form";
import env from "@/env/env";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

export default function Goals() {
    const router = useRouter();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            primaryGoal: "",
            secondaryGoal: "",
            targets: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (data: any) => {
        const token = await AsyncStorage.getItem("jwtToken");
        if (!token) {
            console.log("No JWT token found");
            return;
        }
        console.log(data);

        const backend_url =
            "http://" + env.BACKEND_IP + ":8080/user/fitness-goals";
        console.log(backend_url);

        const response = await fetch(backend_url, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            console.log("updated goals successfully");
            router.push("/screens/Dashboard");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topNav}>
                <TouchableOpacity>
                    <Text>Account</Text>
                </TouchableOpacity>
                <View>
                    <TouchableOpacity>
                        <Text>Notifications</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>Settings</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.formContainer}>
                <Controller
                    control={control}
                    name="primaryGoal"
                    render={({ field: { onChange, value } }) => (
                        <View>
                            <Text style={styles.fieldTitle}>Primary Goal</Text>
                            <Picker
                                selectedValue={value}
                                style={styles.formInput}
                                onValueChange={onChange}
                            >
                                <Picker.Item label="Select a goal" value="" />
                                <Picker.Item
                                    label="Lose Weight"
                                    value="lose_weight"
                                />
                                <Picker.Item
                                    label="Build Muscle"
                                    value="build_muscle"
                                />
                                <Picker.Item
                                    label="Improve Endurance"
                                    value="improve_endurance"
                                />
                                <Picker.Item
                                    label="Increase Flexibility"
                                    value="increase_flexibliity"
                                />
                            </Picker>
                        </View>
                    )}
                />

                <Controller
                    control={control}
                    name="secondaryGoal"
                    render={({ field: { onChange, value } }) => (
                        <View>
                            <Text style={styles.fieldTitle}>
                                Secondary Goal
                            </Text>
                            <TextInput
                                style={styles.formInput}
                                onChangeText={onChange}
                                value={value}
                            />
                        </View>
                    )}
                />

                <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    style={styles.submitButton}
                >
                    <Text style={styles.submitText}>Update</Text>
                </TouchableOpacity>
            </View>

            <Modal
                transparent={true}
                visible={isModalVisible}
                onRequestClose={toggleModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.closeButtonContainer}>
                            <TouchableOpacity onPress={toggleModal}>
                                <Text style={styles.closeButtonText}>
                                    Close
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <WorkoutPlanForm toggleModal={toggleModal} />
                    </View>
                </View>
            </Modal>

            <BottomNav toggleModal={toggleModal} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.offWhite_background,
        width: "100%",
        height: "100%",
        alignItems: "center",
        padding: 20,
    },
    topNav: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        width: "75%",
        backgroundColor: colors.purple_primary,
        borderRadius: 28,
        alignItems: "center",
    },
    closeButtonText: {
        color: colors.white_onError,
    },
    closeButtonContainer: {
        padding: 15,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        width: "100%",
    },
    formContainer: {
        marginTop: 20,
        width: "85%",
    },
    formInput: {
        borderWidth: 1,
        borderColor: colors.grey_neutral,
        backgroundColor: colors.white_surface,
        padding: 5,
        marginVertical: 10,
        borderRadius: 8,
    },
    dropDownValue: {
        height: 25,
    },
    submitButton: {
        backgroundColor: colors.orange_accent,
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
        marginVertical: 40,
    },
    fieldTitle: {
        fontWeight: 600,
        marginTop: 12,
    },
    submitText: {
        color: colors.white_onPrimary,
    },
});
