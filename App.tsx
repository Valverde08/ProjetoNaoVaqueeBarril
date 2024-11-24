
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {requestForegroundPermissionsAsync,
getCurrentPositionAsync,
LocationObject,
watchPositionAsync,
LocationAccuracy
} from 'expo-location'
import { useEffect, useState } from 'react';
import MapView,{Marker, Polygon} from 'react-native-maps';


export default function App() {

  const [location,SetLocation] = useState<LocationObject | null >(null)
  const [nameLabel, setNameLabel] = useState<string>('')
  const [description,SetDescription] = useState<string>('')
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
     
      <View style={{position:'absolute', top:'70%',backgroundColor:'transparent', gap:5}}>
        <Text>Título</Text>
        <TextInput
        style={{width:250,height:50,borderColor:'#000',borderWidth:1,backgroundColor:'white',borderRadius:5}}
        value={nameLabel}
        onChangeText={(text)=>{
          setNameLabel(text)
        }}
        />
        <Text>Descrição</Text>
        <TextInput
        style={{width:250,height:50,borderColor:'#000',borderWidth:1,backgroundColor:'white',borderRadius:5}}
        value={description}
        onChangeText={(text)=>{
          SetDescription(text)
        }}
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
    justifyContent: 'center',
  },
});
