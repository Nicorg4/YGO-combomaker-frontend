import React from 'react'

export default function MainContainer({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <main className="flex min-h-screen flex-col items-center p-5 md:p-16 bg-slate-700">
            <div className="max-w-[800px] w-full flex flex-col items-center flex-1 gap-3">
                {children}
            </div>
        </main>
    )
}