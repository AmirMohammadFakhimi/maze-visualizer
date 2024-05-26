import {RecoilState, useRecoilState} from "recoil";

export default function InputName({id, title, atom}: {
  id: string,
  title: string,
  atom: RecoilState<string>
}) {
  const [state, setState] = useRecoilState(atom)

  return (
    <div className={'flex flex-col'}>
      <label htmlFor={id} className={'text-lg font-semibold'}>
        {title}:
      </label>
      <input type={'text'} placeholder={id} id={id} value={state} onChange={(e) => setState(e.target.value)}
             className={'w-full h-10 rounded-md border-2 border-gray-300 p-2 mt-2 mb-7'}/>
    </div>
  )
}