import React from 'react';
import { StyleSheet, Text, View , TouchableOpacity, TextInput, Image} from 'react-native';
import { color } from 'react-native-reanimated';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
export default class Transaction extends React.Component{
  constructor(){
    super()
  this.state={
hascamerapermissions:null,
  scanned:false,
  buttonstate:'normal',
  scannedbook:'',
  scannedstudent:''
}
  }

   getcamerapermissions=async(id)=>{
const {status} = await Permissions.askAsync(Permissions.CAMERA)
console.log(status)
this.setState({hascamerapermissions:status==='granted',buttonstate:id,scanned:false})
  }

  barcodescanner=async({type,data})=>{
    if(this.state.buttonstate==='student'){
  this.setState({scannedstudent:data,scanned:true,buttonstate:'normal'})
    }
    else if(this.state.buttonstate==='student'){
      this.setState({scannedbook:data,scanned:true,buttonstate:'normal'})
    }
  console.log(type)
  }

  render(){
    if(this.state.buttonstate!='normal'&& this.state.hascamerapermissions){
      return(
        <BarCodeScanner style={StyleSheet.absoluteFillObject} onBarCodeScanned={this.state.scanned?(undefined):this.barcodescanner}/>
        )
    }
    else if(this.state.buttonstate==="normal"){
      return(
        <View style={styles.container}>
        <Text style={styles.header}>Willy App</Text>
        <Image source={require('../assets/booklogo.jpg')}/>
        <View style={styles.inputView}>
        
        <TextInput style={styles.inputBox} placeholder={'Book ID'} value={this.state.scannedbook}/>
        <TouchableOpacity style={styles.scanButton}
        onPress={()=>{
          this.getcamerapermissions('book')
        }}
        >
          <Text style={styles.buttonText}>Scan</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.inputView}>
        
        <TextInput style={styles.inputBox} placeholder={'Student ID'} value={this.state.scannedstudent}/>
        <TouchableOpacity style={styles.scanButton}
        onPress={
          ()=>{
            this.getcamerapermissions('student')
          }
        }
        >
          <Text style={styles.buttonText}>Scan</Text>
        </TouchableOpacity>
        </View>
        </View>
      )
    }
    
  }
}

const styles = StyleSheet.create({
container:{
flex:1,
alignItems:'center',
justifyContent:'center',
},
displaytext:{
fontSize:18,
textDecorationLine:'underline'
},
scanbutton:{
margin:10,
padding:10,
backgroundColor:'orange',

},container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
},
displayText:{
  fontSize: 15,
  textDecorationLine: 'underline'
},
scanButton:{
  backgroundColor: '#2196F3',
  padding: 10,
  margin: 10
},
buttonText:{
  fontSize: 15,
  textAlign: 'center',
  marginTop: 10
},
inputView:{
  flexDirection: 'row',
  margin: 20
},
inputBox:{
  width: 200,
  height: 40,
  borderWidth: 1.5,
  borderRightWidth: 0,
  fontSize: 20
},
scanButton:{
  backgroundColor: '#66BB6A',
  width: 50,
  borderWidth: 1.5,
  borderLeftWidth: 0
},
header:{
justifyContent:'center',
alignItems:'center',
textAlign:'center',
fontSize:30,
fontWeight:'bold',
}
})