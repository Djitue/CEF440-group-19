import { View, Text, SafeAreaView, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, onPress } from 'react-native'
import React, { useState } from 'react'

const Data = [
    {id: 1, text: 'item one'},
    {id: 2, text: 'item 34'},
    {id: 3, text: 'item 4one'},
    {id: 4, text: 'item o46ne'},
    {id: 5, text: 'item o0ne'},
]

const EditTest = () => {
    const [data, setData] = useState(Data)
    const [isrRender, setisRedender] = useState(false)
    const [isModalVisible, setisModalVisible] = useState(false)
    const [Textinput, setisTextinput] = useState('')
    const [editItem, seteditItem] = useState(null)

    const onPressItem =(item) =>{
        setisModalVisible(true);
        setisTextinput(item.text);
        seteditItem(item.id)
    }

    const renderItem = ({item, index}) =>{
        return(
            <TouchableOpacity style={styles.items} onPress={()=> onPressItem(item)}>
                <Text style={styles.texts}>{item.text}</Text>
            </TouchableOpacity>
        )
    }

    const handleEditItem = (id) => {
        const newData = data.map(item => {
            if (item.id === id) {
                item.text = Textinput;
                return item;
            }
            return item;
        });
        setData(newData);
        setisRedender(!isrRender); // Force re-render
    };


    const onPressSaveEdit = () =>{
      handleEditItem(editItem)
      setisModalVisible(false)
    }
  return (
    <SafeAreaView style={styles.container}>
        <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        extraData={isrRender}
         />
         <Modal
         style={styles.modalView}
         animationType='fade'
         visible={isModalVisible}
         onRequestClose={()=> setisModalVisible(false)}
         >
           <View>
            <Text style={styles.texts}>Change text:</Text>
            <TextInput
            style={styles.input}
            onChangeText={(text) => setisTextinput(text)}
            defaultValue={Textinput} 
            editable={true}
            multiline={false}
            maxLength={200}
             />
           </View>

           <TouchableOpacity  style={styles.save} onPress={() => onPressSaveEdit()}>
             <Text>Save</Text>
           </TouchableOpacity>
         </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1
      
      
    },
    items:{
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        alignItems: 'flex-start'

        
    },
    texts:{
        marginVertical: 30,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    input: {
        width: '80%',
        height: 70,
        borderColor: 'gray',
        borderWidth: 1,
        fontFamily: 25
    },
    modalView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    save: {
        backgroundColor: 'orange',
        paddingHorizontal: 100,
        alignItems: 'center',
        marginTop: 20,
    }

  });
export default EditTest