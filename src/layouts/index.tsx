import NavBar from "./navbar";

const Layout = (props: any) => {
return (
    <>
        <NavBar />
        <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200">
            <h1>Hi ${props} </h1>
        </main>
    </>
  )
}

export default Layout;