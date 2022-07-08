import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

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

    const [state, setstate] = useState({
        firstName: "",
        lastName: "",
        nationalId: "",
        gender: "",
        profile: "",
        mission: "",
    });

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

            const uri = result.uri;
            const type = result.type;
            const name = result.fileName;
            const source = {
                uri,
                type,
                name,
            }
            cloudinaryUpload(source)
        }
    };

    const cloudinaryUpload = async (photo) => {
        const UPLOAD_PRESET = "preset.my-brand"
        const CLOUDINARY_NAME = "manzicloud"
        const CLOUDINARY_API_KEY = "273239621233477"
        // const CLOUDINARY_SECRET = "cb_UdmPvNxb018jDwEc4yXD79Is"
        const CLOUDINARY_IMAGES_FOLDER = "article-images"
        const formData = new FormData();
        formData.append("file", photo);
        formData.append("tags", `codeinfuse, medium, gist`);
        formData.append("upload_preset", UPLOAD_PRESET);
        formData.append("api_key", CLOUDINARY_API_KEY);
        formData.append("timestamp", (new Date().toDateString()));
        formData.append("folder", CLOUDINARY_IMAGES_FOLDER);
        const apiResponse = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`, formData, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
        }).then(response => {
            const data = response.data;
            const fileURL = data.secure_url
            console.log(fileURL)
            return data;
        });
        if (!apiResponse.asset_id) return response = { success: false, error: 'Failed to upload image' }
        response = { success: true, fileUrl: apiResponse.secure_url };
        setstate["profile"] = response.fileUrl;
    }


    const [touched, settouched] = useState({
        firstName: false,
        lastName: false,
        nationalId: false,
        gender: false,
        profile: false,
        mission: false,
    });

    const { firstName, lastName, nationalId, gender, profile, mission } =
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
                try {
                    setRegistering(true);
                    let response = await axios.post("http://192.168.0.58:5000/api/candidates/registerCandidate", state);
                    if (response.status === 201) {
                        console.log(response.data);
                    } else {
                        Alert.alert("Registration failed");
                    }
                } catch (error) {
                    console.log(error.response);
                    Alert.alert(
                        "Error",
                        error?.response?.data?.error || "Something went wrong"
                    );
                } finally {
                    setLoggingIn(false);
                }
            }
        } else {
            readAllInputs();
        }
    };

    return (
        <ScrollView style={styles.candidateForm}>
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
                </>
            ) : (
                <>
                    <Text style={styles.inputLabel}>Gender</Text>
                    <View style={[styles.inputContainer]}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter candidate's gender"
                            value={gender}
                            onChangeText={(value) => changeState("gender", value)}
                            onBlur={() => touchInput("gender")}
                        ></TextInput>
                    </View>
                    <Text style={styles.inputLabel}>Profile Picture</Text>
                    <TouchableOpacity
                        style={[styles.submit, {marginTop: 10}]}
                        onPress={chooseImg}
                    >
                        <Text style={styles.submitText}>Choose a picture</Text>
                    </TouchableOpacity>

                    <Text style={styles.inputLabel}>Mission</Text>
                    <View style={[styles.inputContainer]}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter candidate's mission"
                            value={mission}
                            onChangeText={(value) => changeState("mission", value)}
                            onBlur={() => touchInput("mission")}
                        ></TextInput>
                    </View>
                    <View style={{ marginBottom: "20%" }}></View>
                </>
            )}

            <TouchableOpacity
                style={styles.submit}
                onPress={() => registerAsync()}
            // disabled={!isEnabledSubmit}
            >
                <Text style={styles.submitText}>
                    {registering ? "Wait..." : firstPage ? "Next" : "Register"}
                </Text>
            </TouchableOpacity>
        </ScrollView>
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