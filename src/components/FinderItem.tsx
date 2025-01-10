import { FC } from 'react'
import './FinderItem.css'
import { AppDispatch } from '../store'
import { setTextType  } from "../slices/dataSlice";

interface Props {
    TextType: string
    dispatch: AppDispatch
}

const FinderItem: FC<Props> = ({ TextType, dispatch}) => (

    <div className="container_div">
        <select name="type" className='selector' onChange={(event => dispatch(setTextType(event.target.value)))} value={TextType}>
            <option className="select_option" value="">Тип</option>
            <option className="select_option" value="en" >Изначальный</option>
            <option className="select_option" value="de" >Закодированный</option>
        </select>
    </div>    
)

export default FinderItem