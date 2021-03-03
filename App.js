import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native';
import { Header, Input, Icon, ListItem, Button } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('shoppingdb.db');


export default function App() {
    const [training, setTraining] = useState('');
    const [amount, setAmount] = useState('');
    const [traininglist, setTraininglist] = useState([]);

    useEffect(() => {
      db.transaction(tx => {
        tx.executeSql('create table if not exists traininglist (id integer primary key not null, training text, amount text);');
      });
      updateList();    
    }, []);
  
    const saveItem = () => {
      db.transaction(tx => {
          tx.executeSql('insert into traininglist (training, amount) values (?, ?);', [training, amount]);    
        }, null, updateList
      )
    }
  
    const updateList = () => {
      db.transaction(tx => {
        tx.executeSql('select * from traininglist;', [], (_, { rows }) =>
          setTraininglist(rows._array)
        ); 
      });
    }
  
    const deleteItem = (id) => {
      db.transaction(
        tx => {
          tx.executeSql(`delete from traininglist where id = ?;`, [id]);
        }, null, updateList
      )    
    }
  
    const listSeparator = () => {
      return (
        <View
          style={{
            height: 5,
            width: "80%",
            backgroundColor: "#fff",
            marginLeft: "10%"
          }}
        />
      );
    };

    const renderItem = ({ item }) => (
      <ListItem bottomDivider>
  <ListItem.Content style={styles.listItem}>
    <View>
       <ListItem.Title style={{fontSize: 20}}>{item.training}</ListItem.Title>
       <ListItem.Subtitle style={{fontSize: 15}}>{item.amount}</ListItem.Subtitle>
    </View>
    <View style={{alignSelf:'center'}}>
      <Icon type='material' name='delete' color='red' onPress={() => deleteItem(item.id)}/>
    </View>
  </ListItem.Content>
</ListItem>
    )
  
    const Clear = () => {
      setTraining([]);
  
    }

   
  return (
    <View style={styles.container}>
      <TextInput placeholder='Treeni'
        style={styles.TextInputStyle}
        keyboardType={'default'}

        onChangeText={(training) => setTraining(training)}
        value={training}

      />
      <TextInput placeholder='Toistot/määrä'
        style={styles.TextInputStyle}

        keyboardType={'default'}

        onChangeText={(amount) => setAmount(amount)}
        value={amount}

      />
      
      <Button title="LISÄÄ" onPress={saveItem} />
      <FlatList
        data={traininglist}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
  </View>
  );
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 170
  },
  TextInputStyle: {
    textAlign: 'center',
    width: 200,
    borderColor: 'gray',
    borderWidth: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingTop: 40

  },
  button: {
    width: '30%',
    height: 40,

  },
});
