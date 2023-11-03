import React from 'react';
import { View, Text, FlatList,ScrollView } from 'react-native';

const completedAppointments = [
  { lawyer: 'Cherni Dhia', client: 'eiz edin adnan', date: '2023-10-15' },
  { lawyer: 'Balkis Bey', client: 'sofien hemdan', date: '2023-09-28' },
  { lawyer: 'Aziz Arfaoui', client: 'leila rdisi', date: '2023-08-10' },
  { lawyer: 'leith ayadi', client: 'ahmed boubli', date: '2023-08-10' },
  { lawyer: 'cherni dhia', client: 'abd errahim toujen', date: '2023-08-10' },
  { lawyer: 'Aziz Arfaoui', client: 'mohamed nabil toujen', date: '2023-08-10' },
  { lawyer: 'balkis bey', client: 'amine lorak', date: '2023-08-10' },
  { lawyer: 'cherni dhia', client: 'saad lmjared', date: '2023-08-10' },
  { lawyer: 'aziz arfaoui', client: 'mohamed amine hagui', date: '2023-08-10' },
  { lawyer: 'mouhib', client: 'ahmed khalil', date: '2023-08-10' },
  { lawyer: 'leith', client: 'daoud rdisi', date: '2023-08-10' },
  { lawyer: 'cherni dhia', client: 'ala srioui', date: '2023-08-10' },
  { lawyer: 'mouhib', client: 'fedi nasraoui', date: '2023-08-10' },
];
const Completed = () => {
  return (
    <ScrollView>
         <View style={{ flex: 1 }}>
      <FlatList
        data={completedAppointments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1, backgroundColor:'white' }}>
            <Text >Lawyer: {item.lawyer}</Text>
            <Text>Client: {item.client}</Text>
            <Text>Date: {item.date}</Text>
          </View>
        )}
      />
    </View>
    </ScrollView>
   
  );
};

export default Completed;





