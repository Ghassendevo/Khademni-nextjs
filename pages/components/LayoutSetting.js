import SettingHeader from "./settingHeader"
const LayoutSetting = ({ children ,disabled}) => {
    return (
        <>
            <SettingHeader disabled={disabled} />
            {children}
        </>
    )
}
export default LayoutSetting;