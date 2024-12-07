import { Modal,View, Text, TouchableOpacity,StyleSheet, TextInput } from 'react-native'
import React from 'react'


interface ModalProps{
    label?:string,
    description?:string,
    fecharBtn:(item:boolean)=>void,
    labelfunc:(text:string)=>void,
    descrifunc:(text:string)=>void,
}

export default function ModalCOmp({label,description,fecharBtn,labelfunc,descrifunc}:ModalProps) {
  return (

    
    
    
        <View style={style.modaCOntainer}>
            <Text style={style.textLabels}>Título</Text>
             <TextInput
                style={{width:250,height:50,borderColor:'#000',borderWidth:1,backgroundColor:'white',borderRadius:5}}
                value={label}
                onChangeText={(text)=>{
                    labelfunc(text)
                }}
                />
                <Text style={style.textLabels}>Descrição</Text>
                <TextInput
                style={{width:250,height:50,borderColor:'#000',borderWidth:1,backgroundColor:'white',borderRadius:5}}
                value={description}
                onChangeText={(text)=>{
                    descrifunc(text)
                }}
                />
            <TouchableOpacity 
            onPress={()=>fecharBtn(false)}
            style={style.btnModal}>
                <Text 
                style={style.btnModaltx}
                
                >
                    Fechar
                </Text>
            </TouchableOpacity>

        </View>
    
    
  )
}

const style = StyleSheet.create({
    modaCOntainer:{
        width: 300,
        height:300,
        backgroundColor:'#485765',
        borderRadius:10,justifyContent:'center',
        alignItems:'center',
        gap:10

    },
    btnModal:{
        width: 250,
        height:50,
        backgroundColor:'#f72a0f',
        justifyContent:"center",
        alignItems:'center',
        borderRadius:10
    },
    btnModaltx:{
        textAlign:'center',
        fontSize:24,
        fontWeight:'600'
    },
    textLabels:{
        color:'#fff',
        fontSize:16,


    }
})

{/* <Text>Título</Text>
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
        /> */}