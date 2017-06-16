 import {EP} from "./const"
const studentStore={
	state: {
        totaldata:{},
       
    },
 mutations: {
        
            [EP](state,data){
                console.log(data);
            	state.totaldata=data;
            },
            
       }
}
 export {studentStore as  default};
