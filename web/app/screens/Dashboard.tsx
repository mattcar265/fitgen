import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "@/constants/colors";

export default function Dashboard() {
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
});
