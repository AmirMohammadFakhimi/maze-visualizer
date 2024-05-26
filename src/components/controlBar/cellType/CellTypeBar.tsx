import RadioButton from "./RadioButton";
import {useSetRecoilState} from "recoil";
import {cellTypeState} from "../../Maze";

export default function CellTypeBar() {
  const setCellType = useSetRecoilState(cellTypeState)

  return (
    <>
      <h1 className={'text-2xl font-semibold'}>
        Cell Type:
      </h1>
      <div className={'ml-4 mt-1'}>
        <RadioButton id={'wall'} setCellType={setCellType}/>
        <RadioButton id={'free'} setCellType={setCellType}/>
        <RadioButton id={'start'} setCellType={setCellType}/>
        <RadioButton id={'end'} setCellType={setCellType}/>
      </div>
    </>
  )
}