import BottomNav from "@/components/BottomNav";
import colors from "@/constants/colors";
import env from "@/env/env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    TextInput,
} from "react-native";

const ViewPlan = ({ toggleModal }: { toggleModal: () => void }) => {
    const { workoutPlanId } = useLocalSearchParams();
    const [workoutPlan, setWorkoutPlan] = useState<any>(null);
    const [duration, setDuration] = useState<any>(0);
    const [loading, setLoading] = useState(true);

    const handleExerciseNameChange = (index: number, newName: string) => {
        setWorkoutPlan((prevPlan: any) => ({
            ...prevPlan,
            exercises: prevPlan.exercises.map((exercise: any, i: number) =>
                i === index ? { ...exercise, exerciseName: newName } : exercise
            ),
        }));
    };

    const handleSetsChange = (index: number, newName: string) => {
        setWorkoutPlan((prevPlan: any) => ({
            ...prevPlan,
            exercises: prevPlan.exercises.map((exercise: any, i: number) =>
                i === index ? { ...exercise, sets: newName } : exercise
            ),
        }));
    };

    const handleRepsChange = (index: number, newName: string) => {
        setWorkoutPlan((prevPlan: any) => ({
            ...prevPlan,
            exercises: prevPlan.exercises.map((exercise: any, i: number) =>
                i === index ? { ...exercise, reps: newName } : exercise
            ),
        }));
    };

    const handleSubmit = async (workoutPlanId: any) => {
        try {
            const token = await AsyncStorage.getItem("jwtToken");

            const response = await fetch(
                `http://${env.BACKEND_IP}:8080/workout-plans/${workoutPlanId}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(workoutPlan),
                }
            );

            if (response.ok) {
                console.log("Workout plan updated");
            } else {
                console.log("Failed to update workout plan");
            }
        } catch (error) {
            console.error("Error submitting updated workout plan: ", error);
        }
    };

    useEffect(() => {
        const fetchWorkoutPlan = async () => {
            console.log("from view page:" + workoutPlanId);
            try {
                const response = await fetch(
                    "http://" +
                        env.BACKEND_IP +
                        ":8080/workout-plans/" +
                        workoutPlanId
                );
                if (response.ok) {
                    const data = await response.json();
                    setWorkoutPlan(data);

                    var duration = 0;
                    data.exercises.forEach((exercise: any) => {
                        duration += exercise.duration;
                    });
                    setDuration(duration);
                } else {
                    console.error("Failed to load workout plan");
                }
            } catch (error) {
                console.error("Error fetching workout plan: ", error);
            } finally {
                setLoading(false);
            }
        };

        if (workoutPlanId) {
            fetchWorkoutPlan();
        }
    }, [workoutPlanId]);

    if (loading) {
        return <ActivityIndicator size="large" color="black" />;
    }

    if (!workoutPlan) {
        return <Text>No workout plan found</Text>;
    }

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

            <View style={styles.planContainer}>
                <View style={styles.planNameContainer}>
                    <Text style={styles.planName}>{workoutPlan.planName}</Text>
                </View>

                <View style={styles.notesContainer}>
                    <Text style={styles.notes}>{workoutPlan.notes}</Text>
                </View>

                <View>
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.saveText}>Save Changes</Text>
                    </TouchableOpacity>

                    <View style={styles.workoutsContainer}>
                        {workoutPlan.exercises.map(
                            (exercise: any, index: any) => (
                                <View
                                    key={index}
                                    style={styles.exerciseContainer}
                                >
                                    <View
                                        style={styles.exerciseNumberContainer}
                                    >
                                        <Text style={styles.exerciseNumber}>
                                            {index + 1}
                                        </Text>
                                    </View>

                                    <View style={styles.workoutItemRight}>
                                        <View style={styles.middle}>
                                            <TextInput
                                                value={
                                                    exercise.exerciseName || ""
                                                }
                                                onChangeText={(text) => {
                                                    handleExerciseNameChange(
                                                        index,
                                                        text
                                                    );
                                                }}
                                            />
                                            <View>
                                                <View style={styles.row}>
                                                    <Text>Sets: </Text>
                                                    <TextInput
                                                        style={
                                                            styles.setRepCount
                                                        }
                                                        value={
                                                            exercise.sets || ""
                                                        }
                                                        onChangeText={(
                                                            text
                                                        ) => {
                                                            handleSetsChange(
                                                                index,
                                                                text
                                                            );
                                                        }}
                                                    />
                                                </View>

                                                <View style={styles.row}>
                                                    <Text>Reps: </Text>
                                                    <TextInput
                                                        style={
                                                            styles.setRepCount
                                                        }
                                                        value={
                                                            exercise.reps || ""
                                                        }
                                                        onChangeText={(
                                                            text
                                                        ) => {
                                                            handleRepsChange(
                                                                index,
                                                                text
                                                            );
                                                        }}
                                                    />
                                                </View>
                                                <TextInput
                                                    style={styles.instructions}
                                                    value={
                                                        exercise.instructions ||
                                                        ""
                                                    }
                                                    multiline={true}
                                                    onChangeText={(text) => {
                                                        handleExerciseNameChange(
                                                            index,
                                                            text
                                                        );
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )
                        )}
                    </View>
                </View>
            </View>

            <BottomNav toggleModal={toggleModal} />
        </View>
    );
};

const styles = StyleSheet.create({
    workoutsContainer: {
        overflow: "scroll",
    },
    instructions: {
        width: "80%",
    },
    row: {
        flexDirection: "row",
    },
    repCount: {
        marginLeft: 6,
        width: 45,
        alignItems: "flex-end",
        justifyContent: "flex-end",
    },
    setRepCount: {
        width: 45,
        alignItems: "flex-end",
        justifyContent: "flex-end",
    },
    saveButton: {
        backgroundColor: colors.orange_accent,
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
        marginVertical: 10,
    },
    saveText: {
        color: colors.white_onPrimary,
    },
    middle: {
        width: "90%",
    },
    workoutItemRight: {
        justifyContent: "space-between",
        width: "80%",
        display: "flex",
        flexDirection: "row",
    },
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
    topRightNav: {
        width: "40%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    planContainer: {
        width: "100%",
    },
    planName: {
        fontSize: 24,
    },
    planNameContainer: {
        marginVertical: 15,
    },
    planDuration: {
        fontSize: 22,
    },
    notesContainer: {
        width: "100%",
    },
    notes: {
        fontSize: 16,
    },
    exerciseContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        marginVertical: 13,
    },
    exerciseNumber: {
        fontSize: 16,
        fontWeight: 600,
    },
    exerciseNumberContainer: {
        display: "flex",
        justifyContent: "center",
        borderRadius: 50,
        alignItems: "center",
        width: 40,
        height: 40,
        backgroundColor: colors.teal_secondary,
    },
});

export default ViewPlan;
