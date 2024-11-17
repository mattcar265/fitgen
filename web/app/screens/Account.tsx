import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
    ScrollView,
} from "react-native";
import colors from "@/constants/colors";
import React, { useEffect, useState } from "react";
import WorkoutPlanForm from "@/components/WorkoutPlanForm";
import BottomNav from "@/components/BottomNav";
import { Controller, useForm } from "react-hook-form";
import env from "@/env/env";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Account() {
    const router = useRouter();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [userDetails, setUserDetails] = useState<any>(null);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const { control, handleSubmit, setValue } = useForm({
        mode: "onChange",
    });

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = await AsyncStorage.getItem("jwtToken");
            if (!token) {
                console.log("No JWT token found");
                return;
            }

            try {
                const response = await fetch(
                    "http://" + env.BACKEND_IP + ":8080/user",
                    {
                        method: "GET",
                        headers: {
                            Authorization: "Bearer " + token,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setUserDetails(data);
                    setValue("firstName", data.firstName || "");
                    setValue("lastName", data.lastName || "");
                    setValue("email", data.email || "");
                    setValue("phone", data.phone || "");
                    setValue("height", data.height || "");
                    setValue("weight", data.weight || "");
                    setValue("age", data.age || "");
                } else {
                    console.log("Failed to fetch user details");
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUserDetails();
    }, []);

    const onSubmit = async (data: any) => {
        const token = await AsyncStorage.getItem("jwtToken");
        if (!token) {
            console.log("No JWT token found");
            return;
        }
        console.log(data);

        const backend_url =
            "http://" + env.BACKEND_IP + ":8080/user/account-details";
        console.log(backend_url);

        const response = await fetch(backend_url, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            console.log("updated account successfully");
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

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.formContainer}>
                    <Controller
                        control={control}
                        name="firstName"
                        render={({ field: { onChange, value } }) => (
                            <View>
                                <Text style={styles.fieldTitle}>
                                    First Name
                                </Text>
                                <TextInput
                                    style={styles.formInput}
                                    onChangeText={onChange}
                                    value={value || ""}
                                    placeholder={userDetails?.firstName || ""}
                                />
                            </View>
                        )}
                    />

                    <Controller
                        control={control}
                        name="lastName"
                        render={({ field: { onChange, value } }) => (
                            <View>
                                <Text style={styles.fieldTitle}>Last Name</Text>
                                <TextInput
                                    style={styles.formInput}
                                    onChangeText={onChange}
                                    value={value || ""}
                                    placeholder={userDetails?.lastName || ""}
                                />
                            </View>
                        )}
                    />

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <View>
                                <Text style={styles.fieldTitle}>Email</Text>
                                <TextInput
                                    style={styles.formInput}
                                    onChangeText={onChange}
                                    value={value || ""}
                                    placeholder={userDetails?.email || ""}
                                />
                            </View>
                        )}
                    />

                    <Controller
                        control={control}
                        name="phone"
                        render={({ field: { onChange, value } }) => (
                            <View>
                                <Text style={styles.fieldTitle}>Phone</Text>
                                <TextInput
                                    style={styles.formInput}
                                    onChangeText={onChange}
                                    value={value || ""}
                                    placeholder={userDetails?.phone || ""}
                                />
                            </View>
                        )}
                    />

                    <Controller
                        control={control}
                        name="height"
                        render={({ field: { onChange, value } }) => (
                            <View>
                                <Text style={styles.fieldTitle}>Height</Text>
                                <TextInput
                                    style={styles.formInput}
                                    onChangeText={onChange}
                                    value={value || ""}
                                    placeholder={userDetails?.height || ""}
                                />
                            </View>
                        )}
                    />

                    <Controller
                        control={control}
                        name="weight"
                        render={({ field: { onChange, value } }) => (
                            <View>
                                <Text style={styles.fieldTitle}>Weight</Text>
                                <TextInput
                                    style={styles.formInput}
                                    onChangeText={onChange}
                                    value={value || ""}
                                    placeholder={userDetails?.weight || ""}
                                />
                            </View>
                        )}
                    />

                    <Controller
                        control={control}
                        name="age"
                        render={({ field: { onChange, value } }) => (
                            <View>
                                <Text style={styles.fieldTitle}>Age</Text>
                                <TextInput
                                    style={styles.formInput}
                                    onChangeText={onChange}
                                    value={value || ""}
                                    placeholder={userDetails?.age || ""}
                                />
                            </View>
                        )}
                    />

                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleSubmit(onSubmit)}
                    >
                        <Text style={styles.submitText}>Update</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

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
    scrollContainer: {
        paddingBottom: 40,
        width: "100%",
    },
    container: {
        flex: 1,
        backgroundColor: colors.offWhite_background,
        width: "100%",
        height: "100%",
    },
    formContainer: {
        marginTop: 20,
        width: "90%",
        alignSelf: "center",
    },
    topNav: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 15,
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
    formInput: {
        borderWidth: 1,
        borderColor: colors.grey_neutral,
        backgroundColor: colors.white_surface,
        padding: 5,
        marginVertical: 10,
        borderRadius: 8,
        width: "100%",
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
