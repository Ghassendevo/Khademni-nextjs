import KhademniHeader from "./KhademniHeader"

const Layout = ({ children, select, fori }) => {
    return (

        <>
            <KhademniHeader select={select} fori={fori} />
            {children}
        </>



    )
}
export default Layout;