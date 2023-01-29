import JobHeader from "./jobHeader"

const LayoutSecond = ({children,disabled})=>{
    return(
       <>
        <JobHeader disabled={disabled}/>
        {children}
       </>
    )
}
export default LayoutSecond;