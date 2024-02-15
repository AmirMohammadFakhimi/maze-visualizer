import {RecoilState, useRecoilState} from "recoil";

export function InputNumber({id, title, className, atom}: {
  id: string,
  title: string,
  className?: string,
  atom: RecoilState<number | ''>
}) {
  const [state, setState] = useRecoilState(atom)

  return (
    <div>
      <label htmlFor={id}>
        {title}:
      </label>
      <input type={'number'} id={id} name={id} defaultValue={1} value={state} min={1} max={50}
             className={'ml-4 w-16 ' + className}
             onChange={(e) => setState(parseInt(e.target.value) || '')}/>
    </div>
  )
}