import MyButton from ".//MyButton";
import MyHeader from "./MyHeader";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useRef, useState, useCallback} from "react";
import EmotionItem from "./EmotionItem";
import {DiaryDispatchContext} from "../App";
import {getStringDate} from "../util/date";
import {emotionList} from '../util/emotion'

const DiaryEditor = ({isEdit, originData}) => {

    const contentRef = useRef()
    const navigate = useNavigate()

    const [emotion, setEmotion] = useState(3)
    const [content, setContent] = useState('')
    const [date, setDate] = useState(getStringDate(new Date()))

    const {onCreate, onEdit, onRemove} = useContext(DiaryDispatchContext)

    const handleClickEmote = useCallback((emotion) => {
        setEmotion(emotion)
    },[])

    const handleSubmit = () => {
        if(content.length < 1){
            contentRef.current.focus()
            return
        }

        if(window.confirm(
            isEdit ? '일기를 수정하실래요?' : '일기를 작성완료 하실래요?')
        ){
            if(!isEdit){
                onCreate(date, content, emotion)
            } else {
                onEdit(originData.id, date, content, emotion)
            }
        }
        navigate('/', {replace:true})
    }

    const handleRemove = () => {
        if(window.confirm('정말 삭제할꺼야?')){
            onRemove(originData.id)
            navigate('/', {replace:true})
        }
    }

    useEffect(()=>{
        if(isEdit){
            setDate(getStringDate(new Date(parseInt(originData.date))))
            setEmotion(originData.emotion)
            setContent(originData.content)
        }
    },[isEdit, originData])

    return (
        <div className='DiaryEditor'>
            <MyHeader
                headText={isEdit ? '일기 수정하기' : '새 일기 쓰기'}
                leftChild={
                    <MyButton text={'< 뒤로가기'} onclick={()=>navigate(-1)}/>}
                rightChild={isEdit &&  <MyButton text={'삭제하기'} type={'negative'} onclick={handleRemove}/> }
            />
            <div>
                <section>
                    <h4>오늘은 몇월 며칠인가요?</h4>
                    <div className='input_box'>
                        <input
                            className='input_date'
                            type="date"
                            value={date}
                            onChange={(event) => setDate(event.target.value)}
                        />
                    </div>
                </section>
                <section>
                    <h4>오늘의 감정은 어떤가요?</h4>
                    <div className='input_box emotion_list_wrapper'>
                        {emotionList.map((it) =>
                            <EmotionItem
                                key={it.emotion_id}
                                {...it}
                                onClick={handleClickEmote}
                                isSelected={it.emotion_id === emotion}
                            />
                        )}
                    </div>
                </section>
                <section>
                    <h4>오늘의 일기를 써보세요!</h4>
                    <div className='input_box text_wrapper'>
                        <textarea
                            placeholder={'오늘은 어떘나요?'}
                            ref={contentRef}
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                        />
                    </div>
                </section>
                <section>
                    <div className='control_box'>
                        <MyButton text={'취소하기'} onclick={()=>navigate(-1)}/>
                        <MyButton text={'작성완료'} type={'positive'} onclick={handleSubmit}/>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default DiaryEditor