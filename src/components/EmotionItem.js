import React from "react";

const EmotionItem = ({
    emotion_id,
    emotion_img,
    emotion_des,
    onClick,
    isSelected
}) => {
    return (
        <div
            className={[
                'EmotionItem',
                isSelected ?
                    `EmotionItem_on_${emotion_id}` :
                    `EmotionItem_off`].join(' ')}
            onClick={()=>onClick(emotion_id)}
        >
            <img src={emotion_img} alt={emotion_des}/>
            <span>{emotion_des}</span>
        </div>
    )
}

export default React.memo(EmotionItem)