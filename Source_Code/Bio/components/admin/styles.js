import { StyleSheet , Dimensions} from "react-native";
import colors from "../colors";


// Get the device dimensions
const { width, height } = Dimensions.get('window');

const isTablet = width >= 768;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.background,
      },
      header: {
        width: "100%",
        height: isTablet? 90: 100,
        backgroundColor: colors.white,
        flexDirection: "row",
        justifyContent: 'space-around',
        lineHeight: 0.26,
        paddingTop: isTablet? 30 : 33,
        padding: isTablet? 20 : 15,
        alignSelf: "center",

        marginBottom: isTablet? 150 : 80,
        elevation: 5,
      },
      header1: {
        width: "100%",
        height: isTablet? 90: 100,
        backgroundColor: colors.white,
        flexDirection: "row",
        justifyContent: 'space-around',
        lineHeight: 0.26,
        paddingTop: isTablet? 30 : 35,
        padding: isTablet? 20 : 15,
        alignSelf: "center",
        marginBottom: isTablet? 20 : 15,
        elevation: 8,
      },
      
      icon:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    
      },
      title:{
        padding: isTablet? 5 : 10,
        fontSize: isTablet? 35: 25,
        fontWeight: '600',
        textTransform: 'capitalize',
        color: colors.text,
      },
      info:{
        marginLeft: isTablet? 10 : 5,
        padding: isTablet? 5 : 5,
        fontSize: 25,
        fontWeight: '400',
        textTransform: 'capitalize',
        color: '#404040'
      },
      box:{
       width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
      
        padding: isTablet? 10 : 5,
        margin: isTablet? 10 : 5,
        alignSelf: "center",
        
      },
      card:{
        width: isTablet? 350 : 180,
        height: isTablet? 300 : 160,
        backgroundColor: '#fff',
        marginLeft: isTablet? 15 : 8,
        marginRight: isTablet? 0 : 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        elevation: 8,
      },
      CardText:{
        fontSize: isTablet? 40 : 20,
        color: '4154f1',
        fontWeight: '600',
        textTransform: 'capitalize',
      },
      //search inputs
      search:{
        width: "auto",
        height: 60,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        marginTop: 10,

      },
      SearchInput:{
        width: isTablet? 730 : 400,
        height: 50,
        backgroundColor: colors.white,
        borderRadius: 5,
        elevation: 8,
        paddingLeft: isTablet? 20 : 10,
        
      },
      placeholder:{
        fontSize: 30,
        padding: 10,

        
      },
      SearchList:{
        width: isTablet? 730 : 400,
        height: isTablet? 800 : 500,
        alignSelf: "center",
        backgroundColor: "#fff",
        borderRadius: 5,
        marginBottom: 20,
        elevation: 9,

      },
      //back and next button part
      next_btn:{
        position: 'absolute',
        width: isTablet? 100: 150,
        height: isTablet? 60: 40,
        backgroundColor: colors.buttons,
        marginBottom: isTablet? 20: 10,
        margin: isTablet? 20: 10,
        right: 8,
        bottom: 15,
        
        alignSelf: 'flex-end',
        borderRadius: 5,
      },
      back_btn:{
        position: 'absolute',
        width: isTablet? 100: 150,
        height: isTablet? 60: 40,
        backgroundColor: "#888",
        marginBottom: isTablet? 20: 10,
        margin: isTablet? 20: 10,
        bottom: 15,
        
        alignSelf: 'flex-start',
        borderRadius: 5,
      },
      btn_text:{
        color: "#fff",
        fontSize: isTablet? 30: 20,
        alignSelf: 'center',
        padding: 3,
        fontWeight: '500',
      },
      image_box: {
       marginTop: 130,
        backgroundColor: "#fff",
        alignSelf: 'center',
        marginBottom: 10,
      },
      image:{
        marginBottom: 10,
      },
      subText:{
        color: colors.black,
        alignSelf: 'center',
        

      },
      Textanchor:{
        fontSize: 20,
        fontWeight: '500',
        color: colors.text,
      },

      //inputs style part
      inputbox:{
        width: isTablet? 730 : 400,
        height: isTablet? 800 : 500,
        alignSelf: "center",
        backgroundColor: colors.white,
        marginTop: 50,
        borderRadius: 5,
        marginBottom: 20,
        elevation: 9,
        paddingTop: 60,

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
      label:{
        fontWeight: '500',
        marginLeft: 30,
        color: colors.black,
      },
      //fingerprint style
      fingerprint_Box: {
        width: isTablet? 730 : 400,
        height: isTablet? 800 : 500,
        alignSelf: "center",
        backgroundColor: "#fff",
        borderRadius: 5,
        marginTop: 70,
        marginBottom: 20,
        
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 9,
      },
      fingerprint_image:{
        width: isTablet? 200: 200,
        height: isTablet? 200: 290,
        borderRadius: 1,
        alignSelf: 'center',
       
      },
      fingerprint_image_container:{
        width: isTablet? 200: 300,
        height: isTablet? 200: 300,
        
        padding: 5,
      },
      //list of data
      listContainer :{
        width: 'auto',
        height: 400,
        flex: 1,
        marginTop: 20,
        marginLeft: 10,
        
        backgroundColor: colors.white,
        elevation: 5,
        
      },
      listHeader: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderBottomColor: "#e1e1e1",
        backgroundColor: colors.white,
        padding: 1,
        

      },
      Header_table_list: {
        fontWeight: '700',
        fontSize: 20,
        flex: 1,
        color: colors.black,
        
        
        
      },
      row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 1,
        marginHorizontal: 1,
        paddingVertical: 6,
        paddingHorizontal: 6,
        borderRadius: 1,
        
        backgroundColor:colors.white,
        alignSelf: 'center',
        elevation: 3,
      },
      cell:{
        fontSize: 13,
        flex: 1,
      }
      

      

})

export default styles