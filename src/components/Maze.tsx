import {useEffect} from "react";
import Header from "./Header";
import ControlBar from "./controlBar/ControlBar";
import {atom, useRecoilState, useRecoilValue} from "recoil";

export type CellType = 'free' | 'wall' | 'start' | 'end'
export const CellColor: { [key in CellType | 'visited' | 'path']: string } = {
  free: 'white',
  wall: 'black',
  start: 'green',
  end: 'red',
  visited: '#60a4d9',
  path: 'yellow'
}
export type CellColorType = typeof CellColor[keyof typeof CellColor]

export const cellTypeState = atom<CellType>({
  key: 'cellTypeState',
  default: 'wall'
})

export const mapState = atom<string[][]>({
  key: 'mapState',
  default: [
    ['S', '0', '0', '0', '0', '0', '0', '0', '1', '1'],
    ['0', '0', '0', '0', '1', '0', '0', '0', '1', '0'],
    ['1', '1', '0', '0', '0', '0', '0', '0', '1', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '1', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '1', '0', '1'],
    ['0', '1', '0', '1', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['1', '0', '0', '0', '0', '0', '0', '0', '0', 'E']
  ]
})

export const pathState = atom<number[][]>({
  key: 'pathState',
  default: [[]]
})

export const visitedState = atom<number[][]>({
  key: 'visitedState',
  default: [[]]
})

export const heightState = atom<number | ''>({
  key: 'heightState',
  default: 10
})

export const widthState = atom<number | ''>({
  key: 'widthState',
  default: 10
})

export default function Maze() {
  const [map, setMap] = useRecoilState(mapState)
  const [height, setHeight] = useRecoilState(heightState)
  const [width, setWidth] = useRecoilState(widthState)
  const cellType = useRecoilValue(cellTypeState)


  function adjustMapSize(map: string[][], desiredSize: number | '', isHeight: boolean): string[][] {
    if (desiredSize === '')
      return map;


    if (isHeight) {
      if (map.length < desiredSize) {
        const newMap = [...map];
        for (let i = 0; i < desiredSize - map.length; i++) {
          newMap.push(new Array(map[0].length).fill('0'));
        }
        return newMap;
      } else if (map.length > desiredSize) {
        return map.slice(0, desiredSize);
      }
    } else {
      if (map[0].length < desiredSize) {
        return map.map(row => {
          const newRow = [...row];
          for (let i = 0; i < desiredSize - row.length; i++) {
            newRow.push('0');
          }
          return newRow;
        });
      } else if (map[0].length > desiredSize) {
        return map.map(row => row.slice(0, desiredSize));
      }
    }
    return map;
  }

  useEffect(() => {
    setMap(prevMap => adjustMapSize(prevMap, height, true));
    setMap(prevMap => adjustMapSize(prevMap, width, false));
  }, [height, setMap, width]);

  useEffect(() => {
    setHeight(map.length)
    setWidth(map[0].length)
  }, [map, setHeight, setWidth])

  function getColor(i: number, j: number): string {
    switch (map[i][j]) {
      case '0':
        return CellColor.free
      case '1':
        return CellColor.wall
      case 'S':
        return CellColor.start
      case 'E':
        return CellColor.end
      case 'V':
        return CellColor.visited
      case 'P':
        return CellColor.path
      default:
        return CellColor.free
    }
  }

  function handleTileOnClick(i: number, j: number) {
    return () => {
      let changedMap: string[][] = [[]]

      switch (cellType) {
        case 'free':
          changedMap = map.map((row, k) => row.map((cell, l) => i === k && j === l ? '0' : cell))
          break
        case 'wall':
          changedMap = map.map((row, k) => row.map((cell, l) => i === k && j === l ? '1' : cell))
          break
        case 'start':
          changedMap = map.map((row, k) => row.map((cell, l) => i === k && j === l ? 'S' : cell === 'S' ? '0' : cell))
          break
        case 'end':
          changedMap = map.map((row, k) => row.map((cell, l) => i === k && j === l ? 'E' : cell === 'E' ? '0' : cell))
          break
      }

      setMap(changedMap)
    }
  }

  return (
    <div>
      <Header/>
      <div className={'grid grid-cols-custom-percent mt-10'}>
        <ControlBar/>
        <div className={'flex flex-col justify-center items-center'}>
          {map.map((row, i) => (
            <div key={i} style={{display: 'flex'}}>
              {row.map((cell, j) => (
                <div key={j} className={`w-6 h-6 border border-black`} style={{backgroundColor: getColor(i, j)}}
                     onClick={handleTileOnClick(i, j)}/>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}