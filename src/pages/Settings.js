import StatusCard from 'components/StatusCard';
import SettingsForm from 'components/SettingsForm';
import ProfileCard from 'components/ProfileCard';
import Dropdown from "@material-tailwind/react/Dropdown"
import DropdownItem from "@material-tailwind/react/DropdownItem"
import DropdownLink from "@material-tailwind/react/DropdownLink"
import Radio from "@material-tailwind/react/radio"
import Checkbox from "@material-tailwind/react/Checkbox"

import React, { useRef,useState,useEffect } from 'react';
import axios from 'axios';

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setName,checkSensor,setAll } from "store/sensor";


export default function Dashboard() {
    const dispatch = useDispatch();

    const hoge = [1,2,3]
    const [sensorNm,setSensorNm] = useState([])

    const sensorList = useSelector(state => state.sensor)    
    const sensorList_sno = useSelector(state => state.sensor)    

    const hogeOnClick= (e) =>{
        dispatch(checkSensor(e))
    }

    useEffect(async()=>{
        console.log('Start')
    //     const hoge =  await axios.get(`http://172.31.8.30:8000/sensor`).then((res) => {   
    //         const mapIndex = res.data.map((i) => {
    //          return [
    //                     i.sno,
    //                     i.title,
    //                     i.flg
    //                 ]
    //          })
    //          dispatch(setAll(mapIndex))            
    //     })        
      },[])
  
    return (
        <>
            <div className="bg-light-blue-3 pt-14 pb-28 px-3 md:px-8 h-auto">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
                    </div>
                </div>
            </div>

            <div className="px-3 md:px-8 h-auto -mt-24">
            <div>
                {
                    sensorList.map((i) => (
                        <div className="text-4xl pb-3">
                        <Checkbox
                        key={i[0]}
                        color="lightBlue"
                        text={`${i[0]}`}
                        id={i[0]}
                        name="option"
                        onClick={()=>hogeOnClick(i[0])}
                        checked={i[2]}
                        />
                    </div> 
                    ))
                }
    
            </div>
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 xl:grid-cols-6">
                    </div>
                </div>
            </div>
        </>
    );
}
