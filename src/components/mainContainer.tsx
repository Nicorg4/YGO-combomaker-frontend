import React from 'react'
import mainWallpaper from '../../public/images/main_wallpaper.png'

export default function MainContainer({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <main className="flex min-h-screen flex-col items-center p-5 md:p-16 bg-slate-700" style={{backgroundImage: `url(${mainWallpaper.src})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
            <div className="max-w-[800px] w-full flex flex-col items-center flex-1 gap-3">
                {children}
            </div>
        </main>
    )
}