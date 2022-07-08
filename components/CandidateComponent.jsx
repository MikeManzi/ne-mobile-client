import React from 'react' 
import { StyleSheet, Text, View, Image } from 'react-native'



const CandidateComponent = (props) => {
  return (
    <View style={styles.container}>
      <View>
        <View><Image source="https://th.bing.com/th/id/R.201a69c58e003593a36c2396995bd862?rik=T1vFxzFeKQKClw&riu=http%3a%2f%2f1.bp.blogspot.com%2f-oWtiE-eqzSk%2fU6_pERxo7SI%2fAAAAAAAAEbI%2fdNl-aWQvLM8%2fs1600%2f1.png&ehk=CwPvBBwUNq2QhVjVmXnB5VxGFQHi2Kwk%2beOQR%2flzCSo%3d&risl=&pid=ImgRaw&r=0"/></View>
      </View>
    </View>
  )
}

export default CandidateComponent

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
    },
})