import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "@/constants/colors";

const BottomNav = ({ toggleModal }: { toggleModal: () => void }) => {
    return (
        <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.bottomNavItem}>
                <Text style={styles.bottomNavItemText}>Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.bottomNavItem}
                onPress={toggleModal}
            >
                <Text style={styles.bottomNavItemText}>Generate Workout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomNavItem}>
                <Text style={styles.bottomNavItemText}>Goals</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
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
});

export default BottomNav;
