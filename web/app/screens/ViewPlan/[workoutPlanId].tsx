import BottomNav from "@/components/BottomNav";
import colors from "@/constants/colors";
import env from "@/env/env";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
} from "react-native";

const ViewPlan = ({ toggleModal }: { toggleModal: () => void }) => {
    const { workoutPlanId } = useLocalSearchParams();
    const [workoutPlan, setWorkoutPlan] = useState<any>(null);
    const [duration, setDuration] = useState<any>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkoutPlan = async () => {
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
                    <View>
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
                                            1
                                        </Text>
                                    </View>
                                    <View>
                                        <View>
                                            <Text>{exercise.exerciseName}</Text>
                                        </View>
                                        <View>
                                            <Text>
                                                {exercise.sets}x{exercise.reps},{" "}
                                                {exercise.instructions}
                                            </Text>
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
