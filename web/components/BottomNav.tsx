import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import colors from "@/constants/colors";
import { useRouter } from "expo-router";
import homeIcon from "@/assets/images/home.png";
import plusIcon from "@/assets/images/plus.png";
import trendUpIcon from "@/assets/images/trend-up.png";

const BottomNav = ({ toggleModal }: { toggleModal: () => void }) => {
    const router = useRouter();

    return (
        <View style={styles.bottomNav}>
            <TouchableOpacity
                style={styles.bottomNavItem}
                onPress={() => router.push("/screens/Dashboard")}
            >
                <Image source={homeIcon} />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.bottomNavItem}
                onPress={toggleModal}
            >
                <Image source={plusIcon} />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.bottomNavItem}
                onPress={() => router.push("/screens/Goals")}
            >
                <Image source={trendUpIcon} />
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
