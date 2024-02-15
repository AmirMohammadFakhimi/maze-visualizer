import {CellColor, CellType} from "../../Maze";

export default function RadioButton({id, setCellType}: { id: CellType, setCellType: (cellType: CellType) => void }) {
  return (
    <div className={'mt-2'}>
      <input type={'radio'} id={id} name={'cellType'} value={id} defaultChecked={id === 'wall'} onChange={() => setCellType(id)}
             className={'mr-2'}/>
      <label htmlFor={id} className={'text-lg font-semibold drop-shadow-[0_0px_3px_rgba(0,0,0,0.6)]'} style={{color: CellColor[id]}}>
        {id.toUpperCase()}
      </label>
    </div>
  )
}