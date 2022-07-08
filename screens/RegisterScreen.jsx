import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    Dimensions,
} from "react-native";
import validateEmail from "../helpers/validateEmail";
import { register } from '../services/auth';

const { width, height } = Dimensions.get("window");
const RegisterScreen = ({navigation}) => {

    const [loggingIn, setLoggingIn] = React.useState(false);
    const bootstrapAsync = async () => {
        // const userStorage = await checkAsyncStorage();
        // if (userStorage.token) {
        //   navigation.navigate(userStorage.token ? "Home" : "Register", {});
        // }
    };

    React.useEffect(() => {
        bootstrapAsync();
    }, []);

    const [firstPage, setfirstPage] = React.useState(true);
    const [state, setstate] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        nationalId: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    });
    const [touched, settouched] = React.useState({
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

    const errors = {
        firstName: touched.firstName
            ? !firstName
                ? "First name is required"
                : firstName.length < 2
                    ? "First name must be at least 2 characters"
                    : ""
            : "",
        lastName: touched.lastName
            ? !lastName
                ? "lastName is required"
                : lastName.length < 2
                    ? "lastName must be at least 2 characters"
                    : ""
            : "",
        email: touched.email
            ? !email
                ? "Email is required"
                : !validateEmail(email)
                    ? "Email is invalid"
                    : ""
            : "",
        phoneNumber: touched.phoneNumber
            ? !phoneNumber
                ? "Phone Number is required": ""
            : "",
        nationalId: touched.nationalId
            ? !nationalId
                ? "National ID is required" : ""
            : "", 
        password: touched.password
            ? !password
                ? "password is required"
                : password.length < 5
                    ? "password must be at least 5 characters"
                    : ""
            : "",
        confirmPassword: touched.confirmPassword
            ? !confirmPassword
                ? "confirm password is required"
                : password !== confirmPassword
                    ? "Your Passwords do not match"
                        : ""
            : "",
    };

    const isFirstPageComplete =
        firstName.length >= 2 &&
        lastName.length >= 2 &&
        validateEmail(email) &&
        phoneNumber;

    const isSecondPageComplete =
        nationalId &&
        password.length >= 5 &&
        password === confirmPassword;

    const isEnabledSubmit =
        !loggingIn &&
        (firstPage
            ? isFirstPageComplete
            : isFirstPageComplete && isSecondPageComplete);

    const firstNameErrorStyles =
        touched.firstName && errors.firstName ? styles.inputContainerError : {};
    const lastNameErrorStyles =
        touched.lastName && errors.lastName ? styles.inputContainerError : {};
    const emailErrorStyles =
        touched.email && errors.email ? styles.inputContainerError : {};
    const phoneNumberErrorStyles =
        touched.phoneNumber && errors.phoneNumber
            ? styles.inputContainerError
            : {};
    const nationalIdErrorStyles = 
        touched.nationalId && errors.nationalId
            ? styles.inputContainerError
            : {};
    const passwordErrorStyles =
        touched.password && errors.password ? styles.inputContainerError : {};
    const confirmPasswordErrorStyles =
        touched.confirmPassword && errors.confirmPassword
            ? styles.inputContainerError
            : {};

    const readAllInputs = () => {
        let newTouched = {};
        Object.keys(touched).forEach((key) => {
            newTouched[key] = firstPage
                ? !["password", "confirmPassword"].includes(key)
                : true;
        });
        settouched(newTouched);
    };

    const registerAsync = async () => {
        if (isEnabledSubmit) {
            if (firstPage) {
                setfirstPage(false);
            } else {
                const { confirmPassword, ...rest } = state;
                console.log(rest);
                await register(rest);
            }
        } else {
            readAllInputs();
        }
    };
    return (
        <ScrollView style={styles.registerForm}>
            <View style={styles.form}>
                {firstPage ? (
                    <>
                        <Text style={styles.heading}>Sign Up</Text>

                        <Text style={styles.inputLabel}>First name</Text>
                        <View style={[styles.inputContainer, firstNameErrorStyles]}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Your First name"
                                value={firstName}
                                onChangeText={(value) => changeState("firstName", value)}
                                onBlur={() => touchInput("firstName")}
                            ></TextInput>
                        </View>
                        {errors.firstName ? (
                            <Text style={styles.error}>{errors.firstName}</Text>
                        ) : null}

                        <Text style={styles.inputLabel}>lastName</Text>
                        <View style={[styles.inputContainer, lastNameErrorStyles]}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Your lastName"
                                value={lastName}
                                onChangeText={(value) => changeState("lastName", value)}
                                onBlur={() => touchInput("lastName")}
                            ></TextInput>
                        </View>
                        {errors.lastName ? (
                            <Text style={styles.error}>{errors.lastName}</Text>
                        ) : null}

                        <Text style={styles.inputLabel}>Email address</Text>
                        <View style={[styles.inputContainer, emailErrorStyles]}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Your Email Address"
                                value={email}
                                onChangeText={(value) => changeState("email", value)}
                                onBlur={() => touchInput("email")}
                            ></TextInput>
                        </View>
                        {errors.email ? (
                            <Text style={styles.error}>{errors.email}</Text>
                        ) : null}

                        <Text style={styles.inputLabel}>Telephone</Text>
                        <View style={[styles.inputContainer, phoneNumberErrorStyles]}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Your Telephone Number"
                                value={phoneNumber}
                                onChangeText={(value) => changeState("phoneNumber", value)}
                                onBlur={() => touchInput("phoneNumber")}
                            ></TextInput>
                        </View>
                        {errors.phoneNumber ? (
                            <Text style={styles.error}>{errors.phoneNumber}</Text>
                        ) : null}
                    </>
                ) : (
                    <>
                        <Text style={styles.inputLabel}>National ID</Text>
                        <View style={[styles.inputContainer, nationalIdErrorStyles]}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Your National ID"
                                value={nationalId}
                                onChangeText={(value) => changeState("nationalId", value)}
                                onBlur={() => touchInput("nationalId")}
                            ></TextInput>
                        </View>
                        {errors.nationalId ? (
                            <Text style={styles.error}>{errors.nationalId}</Text>
                        ) : null}
                        <Text style={styles.inputLabel}>Password</Text>
                        <View style={[styles.inputContainer, passwordErrorStyles]}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your password"
                                secureTextEntry={true}
                                value={password}
                                onChangeText={(value) => changeState("password", value)}
                                onBlur={() => touchInput("password")}
                            ></TextInput>
                        </View>
                        {errors.password ? (
                            <Text style={styles.error}>{errors.password}</Text>
                        ) : null}

                        <Text style={styles.inputLabel}>Confirm Password</Text>
                        <View style={[styles.inputContainer, confirmPasswordErrorStyles]}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your password"
                                secureTextEntry={true}
                                value={confirmPassword}
                                onChangeText={(value) => changeState("confirmPassword", value)}
                                onBlur={() => touchInput("confirmPassword")}
                            ></TextInput>
                        </View>
                        {errors.confirmPassword ? (
                            <Text style={styles.error}>{errors.confirmPassword}</Text>
                        ) : null}
                        <View style={{ marginBottom: "50%" }}></View>
                    </>
                )}

                <TouchableOpacity
                    style={styles.submit}
                    onPress={() => registerAsync()}
                // disabled={!isEnabledSubmit}
                >
                    <Text style={styles.submitText}>
                        {loggingIn ? "Wait..." : firstPage ? "Next" : "Sign Up"}
                    </Text>
                </TouchableOpacity>

                <View style={styles.registerLink}>
                    <Text style={styles.registerText}>Already Have An Account?</Text>
                    <Text
                        style={styles.registerTextLink}
                        onPress={() => navigation.push("Login")}
                    >
                        Sign In
                    </Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    registerForm: {
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