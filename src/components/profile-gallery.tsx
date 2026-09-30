import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
    useColorScheme,
} from "react-native";

const ProfileGallery = () => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";

    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://randomuser.me/api/?results=10")
            .then((res) => res.json())
            .then((data) => {
                setUsers(data.results);
            })
            .catch((err) => {
                console.error("Failed to fetch users:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <View
                style={[
                    styles.loadingContainer,
                    {
                        backgroundColor: isDark ? "#0f172a" : "#f1f5f9",
                    },
                ]}
            >
                <ActivityIndicator
                    size="large"
                    color={isDark ? "#818cf8" : "#6366f1"}
                />

                <Text
                    style={[
                        styles.loadingText,
                        {
                            color: isDark ? "#cbd5e1" : "#475569",
                        },
                    ]}
                >
                    Loading profiles...
                </Text>
            </View>
        );
    }

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: isDark ? "#0f172a" : "#f1f5f9",
                },
            ]}
        >
            <FlatList
                data={users}
                keyExtractor={(item) => item.login.uuid}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <View
                        style={[
                            styles.card,
                            {
                                backgroundColor: isDark ? "#1e293b" : "#ffffff",
                            },
                        ]}
                    >
                        {/* Top accent */}
                        <View style={styles.accent} />

                        {/* Profile */}
                        <View style={styles.profileSection}>
                            <View style={styles.avatarWrapper}>
                                <Image
                                    source={{ uri: item.picture.large }}
                                    style={styles.avatar}
                                />

                                {/* Online indicator */}
                                <View style={styles.onlineDot} />
                            </View>

                            <View style={styles.info}>
                                <Text
                                    style={[
                                        styles.name,
                                        {
                                            color: isDark
                                                ? "#f8fafc"
                                                : "#0f172a",
                                        },
                                    ]}
                                >
                                    {item.name.first} {item.name.last}
                                </Text>

                                <Text
                                    style={[
                                        styles.username,
                                        {
                                            color: isDark
                                                ? "#818cf8"
                                                : "#6366f1",
                                        },
                                    ]}
                                >
                                    @{item.login.username}
                                </Text>
                            </View>
                        </View>

                        {/* Divider */}
                        <View
                            style={[
                                styles.divider,
                                {
                                    backgroundColor: isDark
                                        ? "#334155"
                                        : "#e2e8f0",
                                },
                            ]}
                        />

                        {/* Email */}
                        <View style={styles.detailRow}>
                            <View
                                style={[
                                    styles.iconContainer,
                                    {
                                        backgroundColor: isDark
                                            ? "#312e81"
                                            : "#eef2ff",
                                    },
                                ]}
                            >
                                <Text style={styles.icon}>✉</Text>
                            </View>

                            <View style={styles.detailContent}>
                                <Text
                                    style={[
                                        styles.label,
                                        {
                                            color: isDark
                                                ? "#94a3b8"
                                                : "#64748b",
                                        },
                                    ]}
                                >
                                    EMAIL
                                </Text>

                                <Text
                                    numberOfLines={1}
                                    style={[
                                        styles.value,
                                        {
                                            color: isDark
                                                ? "#e2e8f0"
                                                : "#334155",
                                        },
                                    ]}
                                >
                                    {item.email}
                                </Text>
                            </View>
                        </View>

                        {/* Location */}
                        <View style={styles.detailRow}>
                            <View
                                style={[
                                    styles.iconContainer,
                                    {
                                        backgroundColor: isDark
                                            ? "#164e63"
                                            : "#ecfeff",
                                    },
                                ]}
                            >
                                <Text style={styles.icon}>⌖</Text>
                            </View>

                            <View style={styles.detailContent}>
                                <Text
                                    style={[
                                        styles.label,
                                        {
                                            color: isDark
                                                ? "#94a3b8"
                                                : "#64748b",
                                        },
                                    ]}
                                >
                                    LOCATION
                                </Text>

                                <Text
                                    numberOfLines={1}
                                    style={[
                                        styles.value,
                                        {
                                            color: isDark
                                                ? "#e2e8f0"
                                                : "#334155",
                                        },
                                    ]}
                                >
                                    {item.location.city},{" "}
                                    {item.location.country}
                                </Text>
                            </View>
                        </View>

                        {/* Footer */}
                        <View style={styles.footer}>
                            <Text
                                style={[
                                    styles.gender,
                                    {
                                        color: isDark ? "#94a3b8" : "#64748b",
                                    },
                                ]}
                            >
                                {item.gender === "male" ? "♂ Male" : "♀ Female"}
                            </Text>

                            <Text
                                style={[
                                    styles.age,
                                    {
                                        color: isDark ? "#94a3b8" : "#64748b",
                                    },
                                ]}
                            >
                                {item.dob.age} years old
                            </Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    list: {
        padding: 16,
        paddingBottom: 40,
    },

    // card: {
    //     position: "relative",

    //     overflow: "hidden",

    //     borderRadius: 24,

    //     padding: 20,
    //     marginBottom: 18,

    //     shadowColor: "#000",
    //     shadowOffset: {
    //         width: 0,
    //         height: 8,
    //     },
    //     shadowOpacity: 0.12,
    //     shadowRadius: 18,

    //     elevation: 6,
    // },
    card: {
        position: "relative",
        overflow: "hidden",

        borderRadius: 24,

        padding: 20,
        marginBottom: 18,

        boxShadow: "0px 8px 18px rgba(0, 0, 0, 0.12)",
        elevation: 5,
    },

    accent: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,

        height: 5,

        backgroundColor: "#63f1c6",
    },

    profileSection: {
        flexDirection: "row",
        alignItems: "center",

        marginTop: 4,
    },

    avatarWrapper: {
        position: "relative",
    },

    avatar: {
        width: 82,
        height: 82,

        borderRadius: 41,

        borderWidth: 3,
        borderColor: "#6366f1",
    },

    onlineDot: {
        position: "absolute",

        right: 3,
        bottom: 3,

        width: 18,
        height: 18,

        borderRadius: 9,

        backgroundColor: "#22c55e",

        borderWidth: 3,
        borderColor: "#ffffff",
    },

    info: {
        flex: 1,
        marginLeft: 16,
    },

    name: {
        fontSize: 21,
        fontWeight: "800",

        marginBottom: 5,
    },

    username: {
        fontSize: 14,
        fontWeight: "600",
    },

    divider: {
        height: 1,

        marginVertical: 18,
    },

    detailRow: {
        flexDirection: "row",
        alignItems: "center",

        marginBottom: 14,
    },

    iconContainer: {
        width: 40,
        height: 40,

        borderRadius: 12,

        alignItems: "center",
        justifyContent: "center",
    },

    icon: {
        fontSize: 18,
    },

    detailContent: {
        flex: 1,
        marginLeft: 12,
    },

    label: {
        fontSize: 10,
        fontWeight: "800",

        letterSpacing: 1,

        marginBottom: 2,
    },

    value: {
        fontSize: 14,
        fontWeight: "500",
    },

    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        marginTop: 4,
    },

    gender: {
        fontSize: 13,
        fontWeight: "600",
    },

    age: {
        fontSize: 13,
        fontWeight: "600",
    },

    loadingContainer: {
        flex: 1,

        justifyContent: "center",
        alignItems: "center",
    },

    loadingText: {
        marginTop: 14,

        fontSize: 15,
        fontWeight: "600",
    },
});

export default ProfileGallery;
