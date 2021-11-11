import React, { useRef,useState } from 'react';
import StatusCard from 'components/StatusCard';
import ChartLine from 'components/ChartLine';
import ChartBar from 'components/ChartBar';
import PageVisitsCard from 'components/PageVisitsCard';
import TrafficCard from 'components/TrafficCard';
import useInterval from 'use-interval';
import axios from 'axios';

import NumberEasing from 'react-number-easing';



import RealtimeLineChart from 'components/RealtimeLineChart'

const TIME_RANGE_IN_MILLISECONDS = 30 * 1000;
const ADDING_DATA_INTERVAL_IN_MILLISECONDS = 10000;
const ADDING_DATA_RATIO = 0.8;

export default function Dashboard() {

    const nameList = [1,2,3];
    const defaultDataList = nameList.map(name => ({
      name: name,
      data: []
    }));
    const [post, setPosts] = useState(defaultDataList);
    const [num1,setNum1] = useState(0)
    const [num2,setNum2] = useState(0)
    const [num3,setNum3] = useState(0)
    const refX = useRef(post);

    useInterval(async() => {
        let hairetu=[]   
        var min = 100 ;
        var max = 1000 ;
        var a_num = Math.floor( Math.random() * (max + 1 - min) ) + min ;
        setNum1(a_num)

        var min = 200 ;
        var max = 2000 ;
        var b_num = Math.floor( Math.random() * (max + 1 - min) ) + min ;
        setNum2(b_num)

        var min = 1000 ;
        var max = 5000 ;
        var c_num = Math.floor( Math.random() * (max + 1 - min) ) + min ;
        setNum3(c_num)
          const hoge_1 =
          {
            name:'x軸',
            data:[
              ...post[0].data,
            {
              x:new Date(),
              y:a_num
            }
          ]
          }
          const hoge_2 =
          {
            name:'y軸',
            data:[
              ...post[1].data,
            {
              x:new Date(),
              y:b_num
            }
          ]
          }
          const hoge_3 =
          {
            name:'z軸',
            data:[
              ...post[2].data,
            {
              x:new Date(),
              y:c_num
            }
          ]
          }
    
          hairetu.push(hoge_1)
          hairetu.push(hoge_2)
          hairetu.push(hoge_3)
    
          setPosts(hairetu) 
    
    
        console.log(hairetu)
    
      }, 4000);

      const doSomething = async (data,id) => {
        console.log("doSomething!!!");
        try {
          
            const hoge = await axios.get(`http://localhost:8000/sno/${id}`).then((res) => {    
            console.log(data)   
            setNum1(res.data[0].xdata)
 
            return [
                ...data,
              {
                x:res.data[0].instime,
                y:res.data[0].xdata
              }
            ]
          }
          )
          return hoge;
        } catch (err) {
          console.error(err.message);
        }
      };



    return (
        <>
            <div className="bg-light-blue-500 px-3 md:px-8 h-10" />

            <div className="px-3 md:px-8 -mt-24">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 xl:grid-cols-5">
                        <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14 mt-20">
                        <RealtimeLineChart
                            dataList={post}
                            range={TIME_RANGE_IN_MILLISECONDS}
                        />
                        </div>
                        <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
                            {/* <ChartBar /> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-3 md:px-8">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mb-4">
                        <StatusCard
                            color="pink"
                            icon="trending_up"
                            title="X軸"
                            amount={num1}
                            // percentage="3.48"
                            percentageIcon="arrow_upward"
                            percentageColor="green"
                            // date="Since last month"
                        />
                        <StatusCard
                            color="orange"
                            icon="trending_up"
                            title="Y軸"
                            amount={num2}
                            // percentage="3.48"
                            percentageIcon="arrow_downward"
                            percentageColor="red"
                            // date="Since last week"
                        />
                        <StatusCard
                            color="purple"
                            icon="trending_up"
                            title="Z軸"
                            amount={num3}
                            // percentage="1.10"
                            percentageIcon="arrow_downward"
                            percentageColor="orange"
                            // date="Since yesterday"
                        />
                        {/* <NumberEasing
                        value={num}
                        speed={3000}
                        decimals={0}
                        ease="quintInOut" /> */}
                        {/* <StatusCard
                            color="blue"
                            icon="poll"
                            title=""
                            amount="49,65%"
                            percentage="12"
                            percentageIcon="arrow_upward"
                            percentageColor="green"
                            date="Since last month"
                        /> */}
                    </div>
                </div>
            </div>

            <div className="px-3 md:px-8 h-auto">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 xl:grid-cols-5">
                        {/* <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
                            <PageVisitsCard />
                        </div>
                        <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
                            <TrafficCard />
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
}
