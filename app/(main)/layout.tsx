import { NavigationSideBar } from "@/components/navigation/navigation-sidebar"


const MainLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
  return (
    <div className="h-full">
        {/* removed a className "hidden" */}
        {/* need to fix tailwind issue of it overwriting hidden */}
        <div className="hidden h-full z-30 flex-col fixed inset-y-0 md:flex w-[72px]">
            <NavigationSideBar />
        </div>
        <main className="md:pl-[72px] h-full">
            {children}
        </main>
    </div>
  )
}

export default MainLayout