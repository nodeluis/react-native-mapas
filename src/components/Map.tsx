import React, { useEffect, useRef, useState } from 'react';
import MapView, { PROVIDER_GOOGLE,Polyline } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../pages/LoadingScreen';
import { Fab } from './Fab';


export const Map = () => {

    const [showPolilyne, setshowPolilyne] = useState(true);

    const {
        hasLocation,
        initialPosition,
        getcurrentLocation,
        followUserLocation,
        userLocation,
        stopFollowUserLocation,
        routeLines
    }=useLocation();

    useEffect(() => {
       followUserLocation();
       return ()=>{
            stopFollowUserLocation();
       }
    }, []);

    useEffect(() => {
        if(!following.current)return;
        const {latitude,longitude}=userLocation;
        mapViewRef.current?.animateCamera({
            center:{
                latitude,
                longitude
            }
        });
    }, [userLocation])//cuando se cambia el user location

    const mapViewRef = useRef<MapView>(); //por defecto undefined
    const following = useRef<boolean>(true);

    const centerPosition=async()=>{

        const {latitude,longitude}=await getcurrentLocation();
        following.current=true;
        mapViewRef.current?.animateCamera({
            center:{
                latitude,
                longitude
            }
        });
    }
    
    if(!hasLocation){
        return <LoadingScreen/>
    }

    return (
        //<> segunm esto es un fragmento
        <>
            <MapView
                ref={(el)=>mapViewRef.current=el!}
                showsUserLocation //={true} no hace falta especificar
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={{flex:1}}
                region={{
                    latitude: initialPosition!.latitude,
                    longitude: initialPosition!.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                onTouchStart={()=>{following.current=false}}
            >
                
                {
                    showPolilyne&&(
                        <Polyline
                            coordinates={routeLines}
                            strokeColor="black"
                            strokeWidth={3}
                        />
                    )
                }

                {/*<Marker
                    image={require('../assets/custom-marker.png')}
                    coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                    }}
                    title="titulo"
                    description="esto es mi descripcion"
                />*/}
                
            </MapView>
            <Fab
                iconName="compass-outline"
                onPress={centerPosition}
                style={{
                    position:'absolute',
                    bottom:20,
                    right:20
                }}
            />
            <Fab
                iconName="brush-outline"
                onPress={()=>setshowPolilyne(value=>!value)}
                style={{
                    position:'absolute',
                    bottom:80,
                    right:20
                }}
            />
        </>
    )
}
