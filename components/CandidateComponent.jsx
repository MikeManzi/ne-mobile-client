import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'


const url = "https://www.twalley.at/images/product_images/original_images/Funko%20Pop/Animation/funko-pop-animation-minato-namikaze-935-naruto-shippuden-vinyl-sammelfigur.jpg"
const CandidateComponent = ({candidate= {}, voteCandidate}) => {
  return (
    <View style={styles.container}>
      <View style={{}}>
        <View ><Image source={{ uri: url }} style={{ width: 70, height: 70 }} /></View>
        <View><Text>{candidate.firstName + ' ' + candidate.lastName}</Text></View>
      </View>
      <View style={styles.votesNumber}><Text>{candidate.votes} votes</Text></View>
      <TouchableOpacity style={styles.voteBtn} onPress={() => voteCandidate(candidate._id)}>
        <Text style={{ color: "#fff"}}>Vote</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CandidateComponent

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#fff",
    flexDirection: "row",
    width: "95%",
    justifyContent: "space-between",
    marginLeft: 10,
    alignItems: "center",
  },

  voteBtn: {
    backgroundColor: "#FFA451",
    padding: 10,
    borderRadius: 10,
  }

})