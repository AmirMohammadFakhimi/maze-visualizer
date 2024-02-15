import InputName from "./InputName";
import {atom} from "recoil";

export const yourNameState = atom<string>({
  key: 'yourNameState',
  default: 'hi'
})

export const mazeNameState = atom<string>({
  key: 'mazeNameState',
  default: 'Map'
})

export default function InputNameContainer() {
  return (
    <div className={'flex flex-col'}>
      <InputName id={'your name'} title={'Your Name'} atom={yourNameState}/>
      <InputName id={'maze name'} title={'Maze Name'} atom={mazeNameState}/>
    </div>
  )
}