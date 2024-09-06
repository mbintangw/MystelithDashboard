import Sidebar from "../Components/Sidebar"

const MainLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="h-screen overflow-auto w-full">{children}</main>
    </div>
  )
}

export default MainLayout
