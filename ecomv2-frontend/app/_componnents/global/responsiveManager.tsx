"use client"

import { useMediaQuery } from "react-responsive";
import { Fragment } from "react";

interface ResponsiveManagerProps<mobileProps, desktopProps, tableProps = undefined|unknown>{
    Mobile:React.FC<mobileProps>,
    Desktop:React.FC<desktopProps>,
    MobileProps: mobileProps,
    DesktopProps: desktopProps,
    Tablet?:React.FC<tableProps>,
    TabletProps?: tableProps,
}

export default function ResponsiveManager<MobileProps, DesktopProps>(props:ResponsiveManagerProps<MobileProps, DesktopProps>) {
  
    const {Mobile, Desktop, MobileProps, DesktopProps} = props;

    const isDeviceMobile = useMediaQuery({ query :"(max-width: 1024px)"})

    

    return (
    <Fragment>
        {isDeviceMobile ? <Mobile {...MobileProps}/>:<Desktop {...DesktopProps}/>}
        </Fragment>
    )
}