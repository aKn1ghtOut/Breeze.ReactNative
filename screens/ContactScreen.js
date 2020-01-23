import React,{Component} from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

// export default function ContactScreen() {
//   return (
//     <ScrollView style={styles.container}>
//       {/**
//        * Make this as similar to the web Contact page as possible,
//        * with pull-to-refresh, search, etc
//        */}
//        <Text>Hey</Text>
//     </ScrollView>
//   );
// }


export default class ContactScreen extends Component {

	
  people= [
     {
       name: "Balaji Vunnava",
       position: "ChairPerson",
       phone: "7042049395",
       email: "bv808@snu.edu.in"
     },
     {
       name: "Rahul Goyal",
       position: "Administrator",
       phone: "9821400910",
       email: "rg294@snu.edu.in"
     },
     {
       name: "Mohnish Jagwani",
       position: "Co-Chairperson",
       phone: "8017035960",
       email: "mj474@snu.edu.in"
     },
     {
       name: "Anirudh Kaushik ",
       position: "Technical Director",
       phone: "9884983595",
       email: "ak669@snu.edu.in"
     },
     {
       name: "Madhur Gupta",
       position: "Head of Finance",
       phone: "9818245177",
       email: "mg786@snu.edu.in"
     },
     {
       name: "Mallika Gupta",
       position: "Head of Public Relations",
       phone: "9149392440",
       email: "mg958@snu.edu.in"
     },
     {
       name: "Sarath Chandra Mudigonda ",
       position: "Head of Finance",
       phone: "9884491080 ",
       email: "sm261@snu.edu.in "
     },
     {
       name: "Keval Sushruth",
       position: "Sports Director",
       phone: "8826243936",
       email: "sk405@snu.edu.in"
     },
     {
       name: "Kaustuv Acharyya ",
       position: "Head of Public Relations",
       phone: "9643427888",
       email: "ka117@snu.edu.in"
     },
     {
       name: "Abhinav Keshri",
       position: "Cultural Director",
       phone: "9835534434",
       email: "ak825@snu.edu.in"
     },
     {
       name: "Abhirami Reddy",
       position: "Sports Director",
       phone: "9515502260",
       email: "ar197@snu.edu.in "
     }
   ]

 

   render() {
   const contacts = this.people.map(e => 
     <View
     >

       <Text>
       {e.name}
       </Text>
       <Text>
       
         <Text>{e.position} </Text>
       </Text>
       <Text>
       
         <Text>{e.phone} </Text>
       </Text>
       <Text>
         <Text >{e.email} </Text>
       </Text>
     
   </View>	
   )


       return (
           
   <Text>

       <Text >Contact Us</Text>


     <Text>
       {contacts}
     </Text>

           <Text>
                   Reach Us At
                 </Text> 
               <Text>
                 breeze@snu.edu.in
               </Text>

         <Text>
           Address
         </Text> 
         <Text >
           Shiv Nadar University NH - 91, Tehsil Dadri Gautam Buddha Nagar Uttar Pradesh - 201314
         </Text>


   </Text>
       )
   }
}


ContactScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0)',
  },
});
