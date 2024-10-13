import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import colors from "@/constants/colors";
import React, { useState } from "react";
import WorkoutPlanForm from "@/components/WorkoutPlanForm";

export default function Dashboard() {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
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
                        <WorkoutPlanForm />
                    </View>
                </View>
            </Modal>

            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.bottomNavItem}>
                    <Text style={styles.bottomNavItemText}>Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.bottomNavItem}
                    onPress={toggleModal}
                >
                    <Text style={styles.bottomNavItemText}>
                        Generate Workout
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomNavItem}>
                    <Text style={styles.bottomNavItemText}>Goals</Text>
                </TouchableOpacity>
            </View>
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
    bottomNav: {
        width: "100%",
        height: 60,
        backgroundColor: colors.purple_primary,
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    bottomNavItem: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    bottomNavItemText: {
        color: colors.white_onPrimary,
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
});
