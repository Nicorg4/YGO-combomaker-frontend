import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

const MainWrapper = ({ children }: Props) => {
    return (
        <div className="flex flex-col flex-1 bg-slate-900 p-10 min-w-full clip-diagonal slide-in-from-top gap-2">
            {children}
        </div>
    )
}

export default MainWrapper