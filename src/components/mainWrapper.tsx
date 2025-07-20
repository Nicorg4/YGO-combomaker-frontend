import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

const MainWrapper = ({ children }: Props) => {
    return (
        <div className="flex flex-col flex-1 bg-slate-900 p-10 min-w-full align-middle clip-diagonal gap-3 slide-in-from-top">
            {children}
        </div>
    )
}

export default MainWrapper