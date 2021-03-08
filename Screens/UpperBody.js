import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Modal, TextInput } from 'react-native';
import { Header, Input, Icon, ListItem, Button } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';



const db = SQLite.openDatabase('shoppingdb.db');


export default function UpperBodyScreen() {
    const [training, setTraining] = useState('');
    const [amount, setAmount] = useState('');
    const [result, setResult] = useState('');
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


    const renderItem = ({ item }) => (
     <ListItem bottomDivider>
        
  <ListItem.Content style={styles.listItem}>
    <View>
      
    
        <ListItem.Title style={{fontSize: 20}}>{item.training}</ListItem.Title>
        <ListItem.Subtitle style={{fontSize: 15}}>{item.amount}</ListItem.Subtitle>
        <ListItem.Subtitle style={{fontSize: 15}}>{item.result}</ListItem.Subtitle>
     
       
      
      
    </View>
    <View style={{paddingTop: 10}}>
      <Icon type='material' name='delete' color='red' onPress={() => deleteItem(item.id)}/>
    </View>
  </ListItem.Content>
</ListItem>
)
      

    
      
  
    const Clear = () => {
      setTraininglist([]);
  
    }

    

   
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Header
      leftComponent={{ icon: 'menu', color: '#fff' }}
      centerComponent={{ text: 'YLÄKROPPA', style: { color: '#fff'} }}
      />
      </View>
      <Input placeholder='Treeni'
        label='Treeni'
        keyboardType={'default'}
        leftIcon={
          <Icon type='ionicon' name='barbell-outline' color='black'/>
        }
        onChangeText={(training) => setTraining(training)}
        value={training}

      />
      <Input placeholder='Toistot/määrä'
        label='Määrät'
        leftIcon={
          <Icon type='ionicon' name='repeat-outline' color='black'/>
        }
        keyboardType={'default'}

        onChangeText={(amount) => setAmount(amount)}
        value={amount}

      />

      <Input placeholder='Millä painoilla teit viimeksi?'
        label='Tulos'
        leftIcon={
          <Icon type='material' name='check' color='black'/>
        }
        keyboardType={'default'}

        onChangeText={(result) => setResult(result)}
        value={result}

      />  
      
      
      <View style={styles.buttonContainer}>
        <View style={styles.addButton}>
      <Button raised title="LISÄÄ TREENIIN" 
      type="outline"
      onPress={saveItem} />
      </View>
      <Button raised title="TYHJENNÄ KAIKKI"
      type="outline"
      onPress={Clear} />
      </View>
      <View style={{width: "100%"}}>
      <FlatList
        data={traininglist}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        
      />
      </View>
      </View>
      
     
  
  );
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
   
    
    
  },
 
  buttonContainer: {
    flexDirection: 'row',
  
    

  },
  addButton: {
    width: '45%',
    height: 20,
    paddingRight: 20

  },
  listItem: {
    alignItems: 'center',
    width: '100%'
    
  },

  header: {
    alignSelf: 'flex-start',
    paddingTop: 22,
    paddingBottom: 15
    
  
  }
  
});
