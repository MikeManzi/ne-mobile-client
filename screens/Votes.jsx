import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import BASE_URL from '../helpers/url';
import CandidateComponent from '../components/CandidateComponent';
import axios from 'axios';
import * as SecureStore from "expo-secure-store";



const Votes = ({ navigation }) => {

  const [candidates, setCandidates] = useState([]);

  const getCandidates = async () => {
    const token = await SecureStore.getItemAsync('token');

    await axios.get(`${BASE_URL}/api/candidates/getAllCandidates`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        setCandidates(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const voteCandidate = async (candidate) => {
    const token = await SecureStore.getItemAsync('token');
    console.log("THe token is: ", token)
    await axios.post(`${BASE_URL}/api/candidates/voteCandidate/${candidate}/vote`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response) {
          alert("You have voted successfully!");
          getCandidates()
        }
      })
      .catch((error) => {
        alert(error.response.data)
      })
  }

  useEffect(() => {
    getCandidates()
  }, [])

  const logout = async() => {
    await SecureStore.deleteItemAsync('token');
    navigation.navigate('Login');
    
  }

  return (
    <View>
      <Text>Candidates</Text>
      <Text>Vote your candidate!</Text>
      {candidates.map((candidate) => {
        return (
          <CandidateComponent key={candidate._id} candidate={candidate} voteCandidate={voteCandidate} />
        )
      }
      )}
      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Votes

const styles = StyleSheet.create({
  logoutBtn: {
      backgroundColor: "#FFA451",
      borderRadius: 10,
      paddingVertical: 20,
      width: "100%",
      alignItems: "center",
      marginTop: "40%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
  },
})