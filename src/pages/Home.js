import {useContext, useEffect, useState} from "react";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import {DiaryStateContext} from "../App";
import DiaryList from "../components/DiaryList";

const Home = () => {

    useEffect(()=>{
        const titleElement = document.getElementsByTagName('title')[0]
        titleElement.innerHTML = '져니의 감정 일기장'
    },[])

    const diaryList = useContext(DiaryStateContext)
    const [data, setData] = useState([])
    const [curDate, setCurDate] = useState(new Date())
    const head_text = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`

    useEffect(()=>{
        if(diaryList.length >= 1 ){
            const firstDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                1
            ).getTime()

            const lastDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth() + 1,
                0,
                23,
                59,
                59
            ).getTime()

            setData(
                diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
            )
        }
    },[diaryList, curDate])

    const increaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(),
                curDate.getMonth() + 1,
                curDate.getDate())
            )
    }

    const deCreaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(),
            curDate.getMonth() - 1,
            curDate.getDate())
        )
    }

    return (
        <div>
            <MyHeader
                headText={head_text}
                leftChild={<MyButton text={'<'} onclick={deCreaseMonth}></MyButton>}
                rightChild={<MyButton text={'>'} onclick={increaseMonth}></MyButton>}
            />
            <DiaryList diaryList={data}/>
        </div>
    )
}

export default Home