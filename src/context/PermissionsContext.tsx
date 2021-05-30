import React,{ createContext, useEffect, useState } from "react";
import { AppState, Platform } from "react-native";
import { check, PERMISSIONS, PermissionStatus, request, openSettings} from "react-native-permissions";


export interface PermissionsState{
    locationStatus:PermissionStatus;
}

export const permissionsInitState:PermissionsState={
    locationStatus:'unavailable'
};

type PermissionContextProps={
    permissions:PermissionsState;
    askLocationPermission:()=>void;
    checkLocationPermission:()=>void;
}

export const PermissionsContext=createContext({} as PermissionContextProps); //que exporta

export const PermissionsProvider=({children}:any)=>{

    const [permissions, setPermissions] = useState(permissionsInitState);

    useEffect(() => {
        //checkLocationPermission();
        AppState.addEventListener('change',(state)=>{
            if(state!='active')return;
                checkLocationPermission();
        });
    }, [])

    const askLocationPermission=async()=>{
        let permissionStatus:PermissionStatus;
        if(Platform.OS=='android'){
            permissionStatus=await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }else{
            permissionStatus=await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        }

        if(permissionStatus=='blocked'){
            openSettings();
        }

        setPermissions({
            ...permissions,
            locationStatus:permissionStatus
        });
    };
    const checkLocationPermission=async()=>{
        let permissionStatus:PermissionStatus;
        if(Platform.OS=='android'){
            permissionStatus=await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }else{
            permissionStatus=await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        }
        setPermissions({
            ...permissions,
            locationStatus:permissionStatus
        });
    };

    return(
        <PermissionsContext.Provider
            value={{
                permissions,
                askLocationPermission,
                checkLocationPermission
            }}
        >
            {children}
        </PermissionsContext.Provider>
    )
};