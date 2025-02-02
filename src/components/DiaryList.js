import React, {useState} from "react";
import MyButton from "./MyButton";
import {useNavigate} from "react-router-dom";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
    {
        value : 'latest',
        name : '최신순'
    },
    {
        value : 'oldest',
        name : '오래된 순'
    }
]

const filterOptionList = [
    {
        value:'all',
        name:'전체'
    },
    {
        value:'good',
        name:'좋은 감정만'
    },
    {
        value:'bad',
        name:'안 좋은 감정만'
    }
]

const ControlMenu = React.memo(({value, onChange, optionList}) => {
    return (
        <select
            className='ControlMenu'
            value={value}
            onChange={(event) => onChange( event.target.value)}>
            {optionList.map((it, idx) =>
                <option
                    key={idx}
                    value={it.value}>
                    {it.name}
                </option>
            )}
        </select>
    )
})

const DiaryList = ({diaryList}) => {

    const navigate = useNavigate()
    const [sortType, setSortType] = useState('latest')
    const [filter, setFilter] = useState('all')

    const getProcessedDiaryList = () => {

        const filterCallBack = (item) => {
            if(filter === 'good'){
                return parseInt(item.emotion) <= 3
            } else {
                return parseInt(item.emotion) > 3
            }
        }
        const compare = (a,b) => {
            if(sortType === 'latest'){
                return parseInt(b.date) - parseInt(a.date)
            } else {
                return parseInt(a.date) - parseInt(b.date)
            }
        }

        const copyList = JSON.parse(JSON.stringify(diaryList))

        const filterdList = filter === 'all' ?
            copyList :
            copyList.filter((it)=>filterCallBack(it))

        const sortedList = filterdList.sort(compare)

        return sortedList

    }

    return (
        <div className='DiaryList'>
            <div className='menu_wrapper'>
                <div className='left_col'>
                    <ControlMenu
                        valeu={sortType}
                        onChange={setSortType}
                        optionList={sortOptionList}
                    />
                    <ControlMenu
                        value={filter}
                        onChange={setFilter}
                        optionList={filterOptionList}
                    />
                </div>
                <div className='right_col'>
                    <MyButton
                        type={'positive'}
                        text={'새 일기 쓰기'}
                        onclick={()=>navigate('/new')} />
                </div>
            </div>

            { getProcessedDiaryList().map((it) => (
                <DiaryItem key={it.id} {...it}/>
            ))}
        </div>
    )
}

DiaryList.defaultProps = {
    diaryList : []
}

export default DiaryList