

import { useClerk, useUser,Protect } from "@clerk/clerk-react"
import { Eraser, FileText, Hash, House, LucideIcon , ImageIcon, Scissors, SquarePen, User, LogOut } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"


interface navItemsInterface {
    to: string,
    label: string,
    Icon: LucideIcon 
}

const navItems:navItemsInterface[] = [
      {
        to: '/layout/dashboard',
        label: 'Dashboard',
        Icon: House
      },
       {
        to: '/layout/writeArticle',
        label: 'Write Article',
        Icon: SquarePen
      },
       {
        to: '/layout/blog',
        label: 'Blog Titles',
        Icon: Hash
      },
       {
        to: '/layout/genrateImage',
        label: 'Generate Images',
        Icon: ImageIcon
      },
       {
        to: '/layout/removeObj',
        label: 'Remove Object',
        Icon: Scissors
      },
       {
        to: '/layout/removebg',
        label: 'Remove Background',
        Icon: Eraser
      },
       {
        to: '/layout/reviewResume',
        label: 'Review Resume',
        Icon: FileText
      },
       {
        to: '/layout/community',
        label: 'Community',
        Icon: User
      },

]

interface sidebar{
    sidebar: boolean,
    setSideBar: any
}

function sidebar({sidebar, setSideBar}:sidebar) {

    const {user} = useUser();
    const pathname = usePathname()
    const {signOut,openUserProfile} = useClerk()
  return (
    <div className={`w-60 bg-white border-r border-gray-200 flex flex-col
                     justify-between items-center max-sm:absolute tp-14 bottom-0 
                     ${
                        sidebar ? 
                        'translate-x-0' : 
                        'max-sm:-translate-x-full'
                    } transition-all duration-300 ease-in-out`}
    >
      
     <div className="w-full my-7">

      {user?.imageUrl ? (
         <Image
          src={user.imageUrl}
         alt="Profile"
         width={100}
         height={100}
        className="w-13 rounded-full mx-auto"
      />
       ) : null}


      <h1 className="mt-1 text-center">{user?.fullName}</h1>
        
        <div className="px-6 mt-5 text-sm text-gray-600 font-medium">
          {
            navItems.map((item,inx)=>(
              <Link 
                key={inx}
                href={item.to}
                className={cn(
                  "px-5 py-2.5 flex items-center gap-3 rounded transition-colors",
                 pathname === item.to
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"               // Active style
                 : "hover:bg-gray-100 text-gray-900"   
                     )}
                  >
                   <item.Icon className="w-5 h-5" />
                   {item.label}
                </Link>
            ))
          }
        </div>
     </div>

     <div className="w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between">

      <div 
          onClick={()=>openUserProfile()} 
          className="flex gap-2 items-center cursor-pointer"
      >

        {
          user &&
         <Image 
            src={user?.imageUrl} 
            alt="uer-image" 
            width={100} 
            height={100} 
            className="w-8 rounded-full"
          />
        }
        <div>
          <h1 className="text-sm font-medium">{user?.fullName}</h1>
          <p className="text-xs text-gray-500">
            <Protect plan='primium_plan' fallback='Free '>Preminum</Protect>
            Plan
          </p>
        </div>
        
      </div>
           <LogOut 
       onClick={()=>signOut()} 
       className="w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer"
     />
     </div>

     


    </div>
  )
}

export default sidebar
