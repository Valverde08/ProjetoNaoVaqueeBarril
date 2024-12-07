
import { Button, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {requestForegroundPermissionsAsync,
getCurrentPositionAsync,
LocationObject,
watchPositionAsync,
LocationAccuracy
} from 'expo-location'
import { useEffect, useState } from 'react';
import MapView,{Marker, Polygon} from 'react-native-maps';
import ModalCOmp from './src/Components/btnModal';


export default function App() {

  const [location,SetLocation] = useState<LocationObject | null >(null)
  const [nameLabel, setNameLabel] = useState<string>('')
  const [description,SetDescription] = useState<string>('')
  const [modalValue,SetModalValue] = useState<booelan>(false)
  const [polygonCoordinates, setPolygonCoordinates] = useState<any>([])



  const handleMapPress = (event) => {
    const newPoint = event.nativeEvent.coordinate;
    setPolygonCoordinates([...polygonCoordinates, newPoint]);
  };

  async function requestLocatio(){
    const {granted} = await requestForegroundPermissionsAsync()

    if(granted){
      const currentPosition = await getCurrentPositionAsync()
      SetLocation(currentPosition)

      console.log("Localização Atual", currentPosition);
      
      
    }
  }

  useEffect(()=>{
    requestLocatio()
  },[])

  useEffect(()=>{
    watchPositionAsync({
      accuracy:LocationAccuracy.High,
      timeInterval: 1000,
      distanceInterval:1

    },(response)=>{
      console.log('novalocalização');
      SetLocation(response)
      
    })
  },[])
  return (
    <View style={[styles.container,{position:'relative'}]}>
      {location ? 
       <MapView
       
       
       style={{flex:1,width:'100%'}}
       initialRegion={{
         latitude: location.coords.latitude,
         longitude: location.coords.longitude,
         latitudeDelta:0.005,
         longitudeDelta:0.005,
       }}
       showsUserLocation={true}
       onPress={handleMapPress}
       
       
       >
        <Marker
        coordinate={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }}

        title={nameLabel}
        description={description}
        
        />
        
       </MapView> : <Text>Carregando Localização...</Text> }
     
       {!modalValue && location != null ? 
       
         <TouchableOpacity
         style={styles.btnopt}
         onPress={()=>SetModalValue(true)}>
          <Text style={styles.btnopttext}>Opções</Text>
         </TouchableOpacity>
       
        
        
        : <View></View>}
        <Modal 
        animationType='slide'
        transparent={true}
        
        visible={modalValue}
        onRequestClose={()=>console.log('Modal has been closed')}
        >
          <View style={styles.modalContainer}>
            <ModalCOmp
            fecharBtn={SetModalValue}
            labelfunc={setNameLabel}
            descrifunc={SetDescription}
            label={nameLabel}
            description={description}
            
            />
          </View>
            
        </Modal>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  modalContainer:{
    flex:1,
    margin:30,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5
    
    },
    
    btnopt:{
      width: 250,
      height:50,
      alignItems:'center',
      justifyContent:"center",
      backgroundColor:'#485765',
       borderRadius:10,
       marginBottom:10,

        
    },
    btnopttext:{
      textAlign:'center',
      fontSize:24,
      fontWeight:'600'
    }
});
