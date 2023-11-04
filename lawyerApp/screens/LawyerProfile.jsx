import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image ,StyleSheet} from 'react-native';
import Completed from './Completed';
import { TabView, SceneMap , TabBar} from 'react-native-tab-view';
import Canceled from './Canceled';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 

const LawyerProfile = ({ navigation }) => {

  const Profiles = [
    { id: '1', name: 'cherni dhia', specialization: 'Criminal Law', image: require('../Photos/lawyer-or-judge-in-simple-flat-personal-profile-icon-or-symbol-people-concept-illustration-vector.jpg') },
    { id: '2', name: 'balkis bey', specialization: 'Family Law', image: require('../Photos/lawyer-or-judge-in-simple-flat-personal-profile-icon-or-symbol-people-concept-illustration-vector.jpg') },
    { id: '3', name: 'aziz arfaoui', specialization: 'Corporate Law', image: require('../Photos/lawyer-or-judge-in-simple-flat-personal-profile-icon-or-symbol-people-concept-illustration-vector.jpg') },
    { id: '4', name: 'mouhib', specialization: 'politics', image: require('../Photos/lawyer-or-judge-in-simple-flat-personal-profile-icon-or-symbol-people-concept-illustration-vector.jpg') },
    { id: '5', name: 'leith ayadi', specialization: 'celebreties', image: require('../Photos/lawyer-or-judge-in-simple-flat-personal-profile-icon-or-symbol-people-concept-illustration-vector.jpg') },
  ];


  const renderTabBar = (props) => (
    
      <TabBar
      style={{backgroundColor:'black'}}
      {...props}
    
      indicatorStyle={{ backgroundColor: 'gold' }} 
      labelStyle={{ color: 'white' }} 
    />
    
    
  );

  const handleProfilePress = () => {
    navigation.navigate('ProfileDetails', { profile: Profiles });
  };
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Upcoming' },
    { key: 'second', title: 'Completed' },
    { key: 'third', title: 'Canceled' },
  ]);

  const renderScene = SceneMap({
    first: () => ( 
  //   <ScrollView>
  //   <TouchableOpacity onPress={handleProfilePress}>
      
        
  //     <View style={{ margin: 10, padding: 10, borderWidth: 1, marginTop: 10, borderRadius: 10 }}>

  //       {Profiles.map(e => {
  //         return (<View style={{ marginBottom: 50 }}><Text style={{ marginLeft: 110 }} >{e.name}<Icon name="message" size={30} color="black" style={styles.icon} /></Text>
  //           <Text style={{ marginLeft: 110 }} >{e.specialization}</Text>
  //           <Image
  //             source={e.image}
  //             style={{ width: 100, height: 100, borderRadius: 50, marginTop: -40 }}
  //           />
  //           <View style={{ borderBottomWidth: 50, width: 90, borderRadius: 40, marginLeft: 40, borderColor: 'gold' }} >
  //             <Text style={{ marginTop: 20, marginLeft: 5 }}>See Details</Text>
  //           </View>
  //         </View>)
  //       })}



  //     </View>
  //   </TouchableOpacity>
  // </ScrollView>
//   <ScrollView>
//   {Profiles.map((e, index) => (
//     <TouchableOpacity key={index} onPress={handleProfilePress}>
//       <View style={{ margin: 10, padding: 10, borderWidth: 1, marginTop: 10, borderRadius: 10 }}>
//         <View>
//         <Icon name="message" size={30} color="black" style={styles.icon}  />
        
//         </View>
//         <View style={{marginTop:-35}}>
//         <Text style={{ marginLeft: 110 }}>{e.name}</Text>
//         <Text style={{ marginLeft: 110 }}>{e.specialization}</Text>
//         <Image source={e.image} style={{ width: 100, height: 100, borderRadius: 50, marginTop: -60 }} />
//         </View>
//         <View style={{ borderBottomWidth: 1, borderBottomColor: 'black', marginVertical: 10 }} />
//         <View style={{ borderBottomWidth: 50, width: 90, borderRadius: 40, marginLeft: 130, borderColor: 'gold', marginBottom:-2 }}>
//           <Text style={{ marginTop: 20, marginLeft: 5 }}>See Details</Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   ))}
// </ScrollView>
<ScrollView>
{Profiles.map((e, index) => (
  <TouchableOpacity key={index} onPress={handleProfilePress}>
    <View style={{ margin: 10, padding: 10, borderWidth: 1, marginTop: 10, borderRadius: 10 }}>
      <View>
        <Icon name="message" size={30} color="black" style={styles.icon} />
      </View>
      <View style={{ marginTop: -35 }}>
        <Text style={{ marginLeft: 110 }}>{e.name}</Text>
        <Text style={{ marginLeft: 110 }}>{e.specialization}</Text>
        <Image source={e.image} style={{ width: 100, height: 100, borderRadius: 17, marginTop: -60 }} />
      </View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: 'black', marginVertical: 10 }} />
      <TouchableOpacity  style={{ backgroundColor: 'black', borderRadius: 40, width: 120, marginLeft: 40, marginTop: -1, padding: 10 }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>See Details</Text>
      </TouchableOpacity>
      <TouchableOpacity  style={{ backgroundColor: 'black', borderRadius: 40, width: 120, marginLeft: 180, marginTop: -39.9, padding: 10 }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
))}
</ScrollView>
    ),
    second:Completed,
    third : Canceled

  });

  
  return (
    
       <TabView
    navigationState={{index, routes }}
    renderScene={renderScene}
    onIndexChange={setIndex}
    renderTabBar={renderTabBar}
  />
   
   
  

  );
 
};
const styles = StyleSheet.create({
  icon: {
    marginLeft:310,
    marginTop:20
  },
})

export default LawyerProfile;
