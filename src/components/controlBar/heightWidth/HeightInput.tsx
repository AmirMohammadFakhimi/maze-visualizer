import {InputNumber} from "./InputNumber";
import {heightState} from "../../Maze";

export default function HeightInput() {
  return (
    <InputNumber id={'height'} title={'Height'} className={'mr-6'} atom={heightState}/>
  )
}