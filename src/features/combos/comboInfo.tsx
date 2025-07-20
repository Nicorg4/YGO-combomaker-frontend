import { Combo } from '@/types/types'
import { formatDate } from '@/utils/auxFunctions'

type Props = {
    combo: Combo
}

const ComboInfo = (props: Props) => {
    return (
        <div className='flex flex-col gap-2 p-4 bg-white/80 text-slate-800 clip-diagonal'>
            <h1 className='text-2xl font-bold text-center'>{props.combo.title}</h1>
        </div>
    )
}

export default ComboInfo