import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Image,
} from "react-native";
import colors from "@/constants/colors";
import React, { useEffect, useState } from "react";
import WorkoutPlanForm from "@/components/WorkoutPlanForm";
import BottomNav from "@/components/BottomNav";
import env from "@/env/env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import deleteIcon from "@/assets/images/trash.png";
import profileIcon from "@/assets/images/profile.png";

export default function Dashboard() {
    const router = useRouter();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [workoutPlans, setWorkoutPlans] = useState<any>({});

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const viewWorkoutPlan = async (planId: string) => {
        const token = await AsyncStorage.getItem("jwtToken");

        if (token) {
            console.log(planId);
            router.push({
                pathname: "/screens/ViewPlan/[workoutPlanId]",
                params: { workoutPlanId: planId },
            });
        }
    };

    const deleteWorkoutPlan = async (planId: string) => {
        try {
            const token = await AsyncStorage.getItem("jwtToken");
            if (!token) {
                console.log("No JWT token found");
                return;
            }

            const response = await fetch(
                `http://${env.BACKEND_IP}:8080/workout-plans/${planId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                console.log(`Workout plan ${planId} deleted`);
                const updatedPlans = { ...workoutPlans };
                delete updatedPlans[planId];
                setWorkoutPlans(updatedPlans);
            } else {
                console.error("Failed to delete workout plan");
            }
        } catch (error) {
            console.log("Error deleting workout plan", error);
        }
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
    }, []);

    const logout = async () => {
        await AsyncStorage.removeItem("jwtToken");
        router.push("/screens/Login");
    };

    return (
        <View style={styles.container}>
            <View style={styles.topNav}>
                <TouchableOpacity
                    onPress={() => router.push("/screens/Account")}
                >
                    <Image source={profileIcon} />
                </TouchableOpacity>
                <View>
                    <TouchableOpacity onPress={logout}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>Settings</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.dashboardContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Dashboard</Text>
                </View>

                <View>
                    <View>
                        <Text style={styles.workoutPlansTitle}>
                            Workout Plans
                        </Text>
                    </View>
                    <View style={styles.workoutPlansList}>
                        {Object.keys(workoutPlans).length > 0 ? (
                            Object.entries(workoutPlans).map(
                                ([planId, plan]: any) => (
                                    <View
                                        key={plan.planId}
                                        style={styles.workoutPlan}
                                    >
                                        <View>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    viewWorkoutPlan(plan.planId)
                                                }
                                            >
                                                <Text
                                                    style={
                                                        styles.workoutPlanText
                                                    }
                                                >
                                                    {plan.planName}
                                                </Text>
                                            </TouchableOpacity>
                                            <Text
                                                style={
                                                    styles.workoutPlanDateText
                                                }
                                            >
                                                Created{" "}
                                                {new Date(
                                                    plan.creationDate
                                                ).toLocaleDateString()}
                                            </Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() =>
                                                deleteWorkoutPlan(plan.planId)
                                            }
                                        >
                                            <Image source={deleteIcon} />
                                        </TouchableOpacity>
                                    </View>
                                )
                            )
                        ) : (
                            <Text></Text>
                        )}
                    </View>
                </View>
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
    topRightNav: {
        width: "40%",
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
    titleContainer: {
        marginVertical: 20,
        width: "100%",
    },
    title: {
        fontSize: 24,
        textAlign: "left",
        alignSelf: "flex-start",
    },
    dashboardContainer: {
        width: "100%",
    },
    workoutPlansTitle: {
        fontSize: 22,
        marginBottom: 20,
    },
    workoutPlanText: {
        fontSize: 16,
        fontWeight: 600,
    },
    workoutPlanDateText: {
        fontSize: 16,
    },
    workoutPlansList: {
        display: "flex",
        gap: 10,
    },
    workoutPlan: {
        padding: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 5,
        backgroundColor: colors.white_surface,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.grey_divider,
    },
});
