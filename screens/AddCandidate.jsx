import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker';

const { width, height } = Dimensions.get("window");

const AddCandidate = () => {
    const [image, setImage] = useState(null);
    const [firstPage, setfirstPage] = useState(true);
    const [registering, setRegistering] = useState(false);
    const isEnabledSubmit = true
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, Camera roll permissions are required to make this work!');
                }
            }
        })();
    }, []);

    const chooseImg = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspect: [4, 3],
            quality: 1,
            allowsEditing: true,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const [state, setstate] = useState({
        firstName: "",
        lastName: "",
        email: "",
        nationalId: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    });
    const [touched, settouched] = useState({
        firstName: false,
        lastName: false,
        email: false,
        nationalId: false,
        phoneNumber: false,
        password: false,
        confirmPassword: false,
    });

    const { firstName, lastName, email, nationalId, phoneNumber, password, confirmPassword } =
        state;

    const changeState = (key, value) => {
        setstate({ ...state, [key]: value });
        settouched({ ...touched, [key]: true });
    };

    const touchInput = (key) => {
        settouched({ ...touched, [key]: true });
    };

    const registerAsync = async () => {
        if (isEnabledSubmit) {
            if (firstPage) {
                setfirstPage(false);
            } else {
                const { confirmPassword, ...rest } = state;
                console.log(rest);
            }
        } else {
            readAllInputs();
        }
    };

    return (
        <View style={styles.candidateForm}>
            {firstPage ? (
                <>
                    <Text style={styles.heading}>Register a Candidate</Text>

                    <Text style={styles.inputLabel}>First name</Text>
                    <View style={[styles.inputContainer]}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Your First name"
                            value={firstName}
                            onChangeText={(value) => changeState("firstName", value)}
                            onBlur={() => touchInput("firstName")}
                        ></TextInput>
                    </View>

                    <Text style={styles.inputLabel}>lastName</Text>
                    <View style={[styles.inputContainer]}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Your lastName"
                            value={lastName}
                            onChangeText={(value) => changeState("lastName", value)}
                            onBlur={() => touchInput("lastName")}
                        ></TextInput>
                    </View>

                    <Text style={styles.inputLabel}>Email address</Text>
                    <View style={[styles.inputContainer]}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Your Email Address"
                            value={email}
                            onChangeText={(value) => changeState("email", value)}
                            onBlur={() => touchInput("email")}
                        ></TextInput>
                    </View>

                    <Text style={styles.inputLabel}>Telephone</Text>
                    <View style={[styles.inputContainer]}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Your Telephone Number"
                            value={phoneNumber}
                            onChangeText={(value) => changeState("phoneNumber", value)}
                            onBlur={() => touchInput("phoneNumber")}
                        ></TextInput>
                    </View>
                </>
            ) : (
                <>
                    <Text style={styles.inputLabel}>National ID</Text>
                    <View style={[styles.inputContainer]}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Your National ID"
                            value={nationalId}
                            onChangeText={(value) => changeState("nationalId", value)}
                            onBlur={() => touchInput("nationalId")}
                        ></TextInput>
                    </View>
                    <Text style={styles.inputLabel}>Password</Text>
                    <View style={[styles.inputContainer]}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your password"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={(value) => changeState("password", value)}
                            onBlur={() => touchInput("password")}
                        ></TextInput>
                    </View>

                    <Text style={styles.inputLabel}>Confirm Password</Text>
                    <View style={[styles.inputContainer]}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your password"
                            secureTextEntry={true}
                            value={confirmPassword}
                            onChangeText={(value) => changeState("confirmPassword", value)}
                            onBlur={() => touchInput("confirmPassword")}
                        ></TextInput>
                    </View>
                    <View style={{ marginBottom: "50%" }}></View>
                </>
            )}

            <TouchableOpacity
                style={styles.submit}
                onPress={() => registerAsync()}
            // disabled={!isEnabledSubmit}
            >
                <Text style={styles.submitText}>
                    {registering ? "Wait..." : firstPage ? "Next" : "Sign Up"}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddCandidate

const styles = StyleSheet.create({
    candidateForm: {
        height: height,
        width: "100%",
        backgroundColor: "#ffffff",
        paddingVertical: 0,
        paddingHorizontal: 50,
        paddingTop: 40,
    },
    heading: {
        color: "#FFA451",
        fontWeight: "bold",
        fontSize: 27,
        marginBottom: 20,
        textAlign: "center",
    },
    form: {
        marginVertical: 5,
        minHeight: height * 0.5,
    },
    inputContainer: {
        borderColor: "rgba(166, 163, 163, 0.45)",
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 10,
        borderRadius: 5,
    },
    inputContainerError: {
        borderColor: "#c51244",
    },
    error: {
        color: "#c51244",
        marginBottom: 20,
    },
    inputLabel: {
        color: "#FFA451",
        fontWeight: "500",
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 2,
    },
    input: {
        // fontWeight: "bold",
    },
    submit: {
        backgroundColor: "#FFA451",
        borderRadius: 10,
        paddingVertical: 20,
        width: "100%",
        alignItems: "center",
        marginTop: 40,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },
    submitText: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "bold",
    },
    registerLink: {
        marginVertical: "5%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },
    registerText: {
        color: "#4E4E4E",
        marginRight: 4,
    },
    registerTextLink: {
        color: "#FFA451",
        fontWeight: "bold",
    },
})