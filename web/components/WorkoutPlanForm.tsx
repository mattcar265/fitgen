import colors from "@/constants/colors";
import env from "@/env/env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    TextInput,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

const WorkoutPlanForm = ({ toggleModal }: { toggleModal: () => void }) => {
    const [workoutPlans, setWorkoutPlans] = useState<any>({});
    const router = useRouter();
    const [disableSubmit, setDisableSubmit] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            planName: "",
            duration: "",
            type: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (data: any) => {
        console.log(data);

        const backend_url =
            "http://" + env.BACKEND_IP + ":8080/workout-plans/generate-plan";
        console.log(backend_url);

        const token = await AsyncStorage.getItem("jwtToken");

        const response = await fetch(backend_url, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const workoutPlanId = await response.text();
            console.log("plan created");
            console.log(workoutPlanId);
            router.push({
                pathname: "/screens/ViewPlan/[workoutPlanId]",
                params: { workoutPlanId: workoutPlanId },
            });
        }

        toggleModal();
    };

    const fetchWorkoutPlans = async () => {
        try {
            const token = await AsyncStorage.getItem("jwtToken");
            if (!token) {
                console.log("No JWT token found");
                return;
            }

            const response = await fetch(
                "http://" + env.BACKEND_IP + ":8080/workout-plans",
                {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                const workoutPlanIds = await response.json();
                const plansMap: any = {};

                console.log("workout plan IDs: " + workoutPlanIds);

                const workoutPlans = await Promise.all(
                    workoutPlanIds.map(async (planId: string) => {
                        const planResponse = await fetch(
                            "http://" +
                                env.BACKEND_IP +
                                ":8080/workout-plans/" +
                                planId,
                            {
                                method: "GET",
                                headers: {
                                    Authorization: "Bearer " + token,
                                    "Content-Type": "application/json",
                                },
                            }
                        );

                        if (planResponse.ok) {
                            const planData = await planResponse.json();
                            plansMap[planId] = planData;
                        } else {
                            console.error("Failed to fetch planId: " + planId);
                        }
                    })
                );
                console.log(plansMap);

                setWorkoutPlans(plansMap);
            }
        } catch {
            console.error("Error retrieving workout plans");
        }
    };

    useEffect(() => {
        fetchWorkoutPlans();

        let numOfPlans = Object.keys(workoutPlans).length;

        if (numOfPlans >= 30) {
            setDisableSubmit(true);
        }
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Generate Workout</Text>
            </View>

            <Controller
                control={control}
                name="planName"
                render={({ field: { onChange, value } }) => (
                    <View>
                        <Text style={styles.inputName}>Plan Name</Text>
                        <TextInput
                            onChangeText={onChange}
                            value={value}
                            style={styles.input}
                        />
                    </View>
                )}
            />

            <Controller
                control={control}
                name="duration"
                rules={{
                    pattern: {
                        value: /^[0-9]+$/,
                        message: "Please enter a number in minutes",
                    },
                }}
                render={({ field: { onChange, value } }) => (
                    <View>
                        <Text style={styles.inputName}>Duration (minutes)</Text>
                        <TextInput
                            onChangeText={onChange}
                            value={value}
                            style={styles.input}
                        />
                    </View>
                )}
            />

            <Controller
                control={control}
                name="type"
                render={({ field: { onChange, value } }) => (
                    <View>
                        <Text style={styles.inputName}>Type</Text>
                        <TextInput
                            onChangeText={onChange}
                            value={value}
                            style={styles.input}
                        />
                    </View>
                )}
            />

            <View>
                {disableSubmit ? (
                    <TouchableOpacity style={styles.submitButtonDisabled}>
                        <Text style={styles.submitButtonText}>
                            Maximum Plans Reached
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={handleSubmit(onSubmit)}
                        style={styles.submitButton}
                    >
                        <Text style={styles.submitButtonText}>
                            Generate Workout Plan
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: 15,
        paddingVertical: 25,
        backgroundColor: colors.white_surface,
        borderRadius: 28,
    },
    title: {
        alignContent: "center",
        margin: "auto",
        fontSize: 23,
        fontWeight: 500,
    },
    titleContainer: {
        marginBottom: 25,
    },
    inputName: {
        fontSize: 16,
    },
    input: {
        borderRadius: 8,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderColor: colors.grey_divider,
        marginTop: 10,
        marginBottom: 25,
    },
    submitButtonContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    submitButton: {
        backgroundColor: colors.orange_accent,
        padding: 10,
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    submitButtonDisabled: {
        backgroundColor: colors.orange_accent,
        opacity: 0.5,
        padding: 10,
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    submitButtonText: {
        color: colors.white_onPrimary,
        fontSize: 16,
    },
});

export default WorkoutPlanForm;
