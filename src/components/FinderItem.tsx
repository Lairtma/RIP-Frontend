import { FC } from 'react'
import './FinderItem.css'

interface Props {
    TextType: string
    setTextType: (TextType : string) => void
}

const FinderItem: FC<Props> = ({ TextType, setTextType}) => (

    <div className="container_div">
        <select name="type" className='selector' onChange={(event => setTextType(event.target.value))} value={TextType}>
            <option className="select_option" value="">Тип</option>
            <option className="select_option" value="en" >Изначальный</option>
            <option className="select_option" value="de" >Закодированный</option>
        </select>
    </div>

    
)

export default FinderItem