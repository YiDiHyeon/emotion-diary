import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {DiaryStateContext} from "../App";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

import {getStringDate} from "../util/date";
import {emotionList} from "../util/emotion";

const Diary = () => {

    const diaryList = useContext(DiaryStateContext)
    const { id } = useParams()
    const navigate = useNavigate()
    const [data, setDate] = useState()

    useEffect(()=>{
        const titleElement = document.getElementsByTagName('title')[0]
        titleElement.innerHTML = `${id}번째 일기`
    },[])

    useEffect(()=>{
        if(diaryList.length >= 1){
            const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id))
            if(targetDiary) {
                setDate(targetDiary)
            } else {
                alert('없는 일기입니다')
                navigate('/',{replace:true})
            }
        }
    },[id, diaryList])

    if(!data){
        return <div className='DiaryPage'>로딩중...</div>
    } else {
        const curEmotionDate = emotionList.find((it) => parseInt(it.emotion_id) === parseInt(data.emotion))
        return (
            <div className='DiaryPage'>
                <MyHeader
                    headText={`${getStringDate(new Date(data.date))} 기록`}
                    leftChild={<MyButton text={'뒤로가기'} onclick={()=>navigate(-1)}/>}
                    rightChild={<MyButton text={'수정하기'} onclick={()=>navigate(`/edit/${data.id}`)}/>}
                />
                <article>
                    <section>
                        <h4>오늘의 감정</h4>
                        <div className={['diary_img_wrapper', `diary_img_wrapper_${data.emotion}`].join(' ')}>
                            <img src={curEmotionDate.emotion_img} alt={curEmotionDate.emotion_des}/>
                            <div className='emotion_des'>
                                {curEmotionDate.emotion_des}
                            </div>
                        </div>

                    </section>
                    <section>
                        <h4>오늘의 일기</h4>
                        <div className='diary_content_wrapper'>
                            <p>{data.content}</p>
                        </div>
                    </section>
                </article>
            </div>
        )
    }

}

export default Diary