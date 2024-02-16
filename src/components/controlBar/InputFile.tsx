import {ChangeEvent, useRef, useState} from "react";
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import {useSetRecoilState} from "recoil";
import {initialMapState, mapState, pathState, visitedState} from "../Maze";

export function InputFile({id}: { id: string }) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [fileName, setFileName] = useState<string>('Upload all exported data here')

  const setMap = useSetRecoilState(mapState)
  const setInitialMap = useSetRecoilState(initialMapState)
  const setPath = useSetRecoilState(pathState)
  const setVisited = useSetRecoilState(visitedState)

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const fileObj = e.target.files && e.target.files[0];
    if (!fileObj)
      return

    setFileName(fileObj.name)

    const formData = new FormData();
    formData.append('files', fileObj);

    const fileText = await fileObj.text()
    const splitText = fileText.split('\n')

    const visitedText = splitText[0].split(',').map((x) => parseInt(x))
    const visited: number[][] = []
    for (let i = 0; i < visitedText.length && !isNaN(visitedText[i]); i += 2)
      visited.push([visitedText[i], visitedText[i + 1]])


    const pathText = splitText[1].split(',').map((x) => parseInt(x))
    const path: number[][] = []
    for (let i = 0; i < pathText.length && !isNaN(pathText[i]); i += 2)
      path.push([pathText[i], pathText[i + 1]])

    let mapText = splitText.slice(2).map((x) => x.split(','))
    const height = mapText.length
    let width = 0
    while (width < mapText[0].length && mapText[0][width] !== undefined && mapText[0][width] !== '')
      ++width
    for (let i = 0; i < mapText.length; i++)
      mapText[i] = mapText[i].slice(0, width)
    if (mapText[height - 1].length < width)
      mapText = mapText.slice(0, height - 1)


    setMap(mapText)
    setInitialMap(mapText)
    setPath(path)
    setVisited(visited)
  }


  return (
    <div>
      <input ref={fileInputRef} type={'file'} accept={".csv"} onChange={handleFileChange}
             onClick={(e) => {
               e.currentTarget.value = ''
             }}
             placeholder={'Upload file'} id={id} name={id} className={'hidden'}/>

      <button onClick={() => fileInputRef.current?.click()}
              className={'bg-blue-400 text-white p-2 rounded-md shadow-md hover:bg-blue-500 text-md font-semibold w-full mt-5'}>
        <div>
          <FileUploadRoundedIcon className={'mr-2'}/>
          {fileName}
        </div>
      </button>
    </div>
  )
}