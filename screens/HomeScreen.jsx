import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BASE_URL from '../helpers/url';
import CandidateComponent from '../components/CandidateComponent';
import axios from 'axios';
import * as SecureStore from "expo-secure-store";

const HomeScreen = () => {
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
        console.log("THe response")
        console.log(response.data);
        if (response.data.success) {
          alert("You have voted for " + candidate.firstName + " " + candidate.lastName);
        }
      })
      .catch((error) => {
        alert(error.response.data)
      })
  }

  useEffect(() => {
    getCandidates()
  }, [])

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
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})