import CellTypeBar from "./cellType/CellTypeBar";
import InputNameContainer, {mazeNameState} from "./name/InputNameContainer";
import HeightInput from "./heightWidth/HeightInput";
import WidthInput from "./heightWidth/WidthInput";
import {InputFile} from "./InputFile";
import {useRecoilState, useRecoilValue} from "recoil";
import {mapState, pathState, visitedState} from "../Maze";
import {useState} from "react";
import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

export default function ControlBar() {
  const [map, setMap] = useRecoilState(mapState)
  const mazeName = useRecoilValue(mazeNameState)
  const visited = useRecoilValue(visitedState)
  const path = useRecoilValue(pathState)
  const [isRunning, setIsRunning] = useState<boolean>(false)

  function handleRunningButtonOnClick() {
    if (isRunning || visited.length === 0)
      return

    setIsRunning(true)
    visited.forEach((visit, i) => {
      setTimeout(() => {
        setMap(prevMap => prevMap.map((row, k) => row.map((cell, l) => visit[0] === l && visit[1] === k && map[k][l] !== 'S' && map[k][l] !== 'E' ? 'V' : cell)))
      }, 100 * i);
    })

    if (path.length === 0) {
      setIsRunning(false)
      return
    }

    path.forEach((step, i) => {
      setTimeout(() => {
        setMap(prevMap => prevMap.map((row, k) => row.map((cell, l) => step[0] === l && step[1] === k && map[k][l] !== 'S' && map[k][l] !== 'E' ? 'P' : cell)))

        if (i === path.length - 1)
          setIsRunning(false)
      }, 100 * i + 100 * visited.length);
    })
  }

  return (
    <div className={'flex flex-col ml-16'}>
      <InputNameContainer/>
      <CellTypeBar/>
      <div className={'flex mt-10 text-lg font-semibold'}>
        <HeightInput/>
        <WidthInput/>
      </div>

      <InputFile id={'file'}/>

      <div className={'flex justify-between gap-5 mt-5 w-full'}>
        <a download={`${mazeName}.csv`}
           href={`data:text/csv;charset=utf-8,${encodeURIComponent(map.map(e => e.join(",")).join("\n"))}`}
           className={'bg-blue-400 text-white p-2 text-center rounded-md shadow-md hover:bg-blue-500 text-md font-semibold w-1/2'}>
          <GetAppRoundedIcon className={'mr-2'}/>
          Export Map
        </a>
        <button
          className={'bg-green-500 text-white p-2 rounded-md shadow-md hover:bg-green-600 text-md font-semibold w-1/2'}
          onClick={handleRunningButtonOnClick}>
          <PlayArrowRoundedIcon className={'mr-2'}/>
          {isRunning ? 'Running ...' : 'Run'}
        </button>
      </div>
    </div>
  )
}