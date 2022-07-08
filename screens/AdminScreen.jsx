import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { BottomNavigation, Text } from 'react-native-paper';
import AddCandidate from './AddCandidate'
import CandidateComponent from '../components/CandidateComponent';

const { width, height } = Dimensions.get("window");

const AddCandidateRoute = () => <AddCandidate />;

const VotesRoute = () => <CandidateComponent />;

// const RecentsRoute = () => <Text>Recents</Text>;

// const Notifications = () => <Text>Notifications</Text>;

const AdminScreen = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'Votes', title: 'Votes', focusedIcon: 'album' },
        { key: 'Candidates', title: 'Candidates', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
        // { key: 'recents', title: 'Recents', focusedIcon: 'history' },
        // { key: 'notifications', title: 'Notifications', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        Votes: VotesRoute,
        Candidates: AddCandidateRoute,
        // recents: RecentsRoute,
        // notifications: Notifications,
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            style={styles.bottomNavigation}
        />
    );
}

export default AdminScreen

const styles = StyleSheet.create({
    bottomNavigation: {
        height: height,
        width: "100%",
        paddingTop: 40,
        backgroundColor: "#fff",
    }
})