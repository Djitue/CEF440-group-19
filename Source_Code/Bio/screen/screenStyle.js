import { StyleSheet , Dimensions} from "react-native";
import colors from "../components/colors";


// Get the device dimensions
const { width, height } = Dimensions.get('window');
const isTablet = width >= 768;


const Screenstyles = StyleSheet.create({

   Welcome:{
    width: 'auto',
    height: "auto",
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 80,
    marginBottom: 20,
   },
   Image:{
    margin: 20,
    alignSelf: 'center',
   },
   Welcometitle:{
    fontSize: 20,
    fontWeight: '450',
    alignSelf: 'center',
    color: colors.black
   },
   Welcometitle_Bold:{
    fontSize: 20,
    fontWeight: '450',
    alignSelf: 'center',
    fontWeight: '600',
    color: colors.black,


   },
   logo:{
    fontSize: 30,
    fontWeight: '600',
   fontStyle: 'normal',
    color: colors.text,
    elevation: 8
   },
   subtitle: {
    fontWeight: '500'
   },
   btnBox:{
    position: 'static',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    width: isTablet? 100: 345,
    height: isTablet? 60: 50,
    backgroundColor: colors.buttons,
    marginBottom: isTablet? 20: 0,
    // margin: isTablet? 20: 10,
    
    
    
    alignSelf: 'center',
    borderRadius: 25,
   },
   btn:{
    color: colors.white,
    fontSize: 28,
    fontWeight: '600',
    alignSelf: 'center',
       
   },
  
      forgot_pass:{
        
        marginBottom: isTablet? 20: 20,
        margin: isTablet? 20: 10,
        right: 25,
        alignSelf: 'flex-end',
        fontSize: 20,
        color: colors.text,
      },
      forgot_pass_text:{
        color: colors.text,
        fontWeight: '500',
      },
      or:{
        
        color: colors.black,
        fontSize: 20,
        fontWeight: '700',
        alignSelf: 'center'

      },
      login_with:{
        width: 'auto',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 25,
        borderColor: '#888',
        marginLeft: 28,
        marginRight: 28,
      },
      login_with_text:{
        fontSize: 17,
        fontWeight: '600',
        margin: 5
      },
      Image_login_box: {
        marginTop: 100,
        width: 200,
        height: 200,
        
        elevation: 0,
       
        alignSelf: 'center',
      },
      Image_login:{
       
        width: 160,
        height: 160,
        
        
        alignSelf: 'center',
        
       },
       inputText:{
        width: isTablet? 730 : 350,
        height: 50,
        backgroundColor: colors.background,
        borderRadius: 20,
        elevation: 1,
        alignSelf: 'center',
        paddingLeft: isTablet? 20 : 15,
        marginBottom: 10,
      },

})

export default Screenstyles