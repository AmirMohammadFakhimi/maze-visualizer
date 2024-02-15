import {InputNumber} from "./InputNumber";
import {widthState} from "../../Maze";

export default function WidthInput() {
  return (
    <InputNumber id={'width'} title={'Width'} atom={widthState}/>
  )
}