import colors from "@/constants/colors";
import env from "@/env/env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
    TextInput,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

const WorkoutPlanForm = ({ toggleModal }: { toggleModal: () => void }) => {
    const router = useRouter();

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
                <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    style={styles.submitButton}
                >
                    <Text style={styles.submitButtonText}>
                        Generate Workout Plan
                    </Text>
                </TouchableOpacity>
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
    submitButtonText: {
        color: colors.white_onPrimary,
        fontSize: 16,
    },
});

export default WorkoutPlanForm;
