import {AvatarGenerator} from "random-avatar-generator";
import {useRecoilValue} from "recoil";
import {yourNameState} from "./controlBar/name/InputNameContainer";

export default function Header() {
  const yourName = useRecoilValue(yourNameState)
  const generator = new AvatarGenerator();

  return (
    <div className={'flex justify-center items-center bg-[#4684b0] border-2 border-[#6b24a9] rounded-b-lg font-bold text-2xl text-[#00FF87] p-2'}>
      <img alt={'random avatar'} src={generator.generateRandomAvatar(yourName)} className={'w-16 h-16 rounded-full mr-3'}/>
      <div>Maze Visualizer</div>
    </div>
  )
}