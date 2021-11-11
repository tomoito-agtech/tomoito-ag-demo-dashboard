import React, { useRef,useState,useEffect } from 'react';
import StatusCard from 'components/StatusCard';
import ChartLine from 'components/ChartLine';
import ChartBar from 'components/ChartBar';
import PageVisitsCard from 'components/PageVisitsCard';
import TrafficCard from 'components/TrafficCard';
import useInterval from 'use-interval';
import axios from 'axios';

import { useSelector } from "react-redux";
import NumberEasing from 'react-number-easing';

import { BrowserRouter, Route, Link } from 'react-router-dom'


import RealtimeLineChart from 'components/RealtimeLineChart'

const TIME_RANGE_IN_MILLISECONDS = 50 * 1000;
const ADDING_DATA_INTERVAL_IN_MILLISECONDS = 10000;
const ADDING_DATA_RATIO = 0.8;

export default function Dashboard() {
    const nameList = ["x","y"];
    const sensorNm = useSelector(state => state.sensor)
    // const sensorList = useSelector(state => state.sensor)    

    const sensorList = useSelector((state)=> {
      return state.sensor.filter((i) => i[2] === true)
    })
    
    const [numX,setNumX] = useState(0)
    const [numY,setNumY] = useState(0)  

    const defaultDataList = nameList.map(name => ({
      name: name,
      data: []
    }));
    // const [post, setPosts] = useState(defaultDataList);
    const [post, setPosts] = useState(nameList.map(name => ({
      name: name,
      data: []
    })));

    const [postY, setPostsY] = useState(sensorList.map(name => ({
      name: name[0],
      data: []
    })));

         useInterval(() => {
      const arr=[]

      // 引数に指定した秒数だけ待つsleep関数
      // Promiseを返す
      function sleep(second) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, second * 10)
        })
      }
      async function syncLoop() {
        // 1~5までのランダムな整数の配列を生成
        const ran_arr = Array(5).fill(0).map(() => Math.floor(Math.random() * 5 + 1))
    
        // for文を使ってループ処理する
        for (let i = 0; i < postY.length; i++) {
          const hoge = await doSomething(postY[i].data,postY[i].name)
          arr.push({name:postY[i].name,data:hoge})
            console.log(postY[i].name)
            console.log(i+1 + "番目の処理が完了！！" + "待ち時間は" +  "秒！！")
        }
        setPostsY(arr)

        console.log("終了！！")
    }
    
    // 実行
    // awaitはトップレベルで使うことができない(ES2017時点)ので
    // asyncをつけた即時関数を作って呼び出している
    (async ()=>{
        console.log("同期的に呼び出す")
        await syncLoop()
    }).call()

    }, 2000);


      function test_promise(v){
        return new Promise((resolve, reject)=>{
                console.log(v);
                console.log("Promise☆");
                resolve();
            
        });
    }
      
      const doSomething =   (data,id) => {
        return new Promise(async(resolve, reject)=>{
          try {       
               
              var x = Math.floor(Math.random() * 500);
              let hoge = [
                  ...data,
                {
                  x:new Date(),
                  y:x
                }
                
              ]
            
            
            // console.log(hoge)
             resolve(hoge);

            // return hoge;
          } catch (err) {
            console.error(err.message);
          }
        })
      };


    return (
        <>
            <div className="bg-light-blue-500 px-3 md:px-8 h-2" />

            <div className="px-3 md:px-8 -mt-24">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 xl:grid-cols-5">
                      <div>
                        {/* {
                        sensorTest.map((i) => <p>{i}</p> )
                        } */}
                        {/* {post.map((i) => (
                          i.data.map((x) => x)
                        )) } */}
                        </div> 
                        
                        <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14 mt-20">
                        {
                          postY.length > 0 
                          ? <RealtimeLineChart
                              dataList={postY}
                              range={TIME_RANGE_IN_MILLISECONDS}
                             />
                           :<div className=" pt-10 m-10 text-5xl ">センサーを選択してください（Settings メニューから選択）</div>                             
                        }
                      </div>
                 
                        <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14 mt-20">
                      
                        </div> 
                    </div>
                </div>
            </div>

            <div className="px-3 md:px-8">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mb-4">

                    
                    </div>
                </div>
            </div>

            <div className="px-3 md:px-8 h-auto">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 xl:grid-cols-5">

                    </div>
                </div>
            </div>
        </>
    );
}
