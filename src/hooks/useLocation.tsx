import { useEffect, useState,useRef } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { Location } from '../interfaces/app-interfaces';

export const useLocation = () => {

    const [hasLocation, setHasLocation] = useState(false);
    const [routeLines, setrouteLines] = useState<Location[]>([]);

    const [initialPosition, setInitialPosition] = useState<Location>();

    const [userLocation, setuserLocation] = useState<Location>({
        latitude:0,
        longitude:0
    });

    const watchId = useRef<number>();
    const isMounted=useRef(true);

    useEffect(() => {
        isMounted.current=true;//cuando llame al return significa que el componente se esta desmontando
        return () => {
            isMounted.current=false;
        }
    }, [])

    useEffect(() => {
        getcurrentLocation().then(location=>{

            if(!isMounted.current)return;

            setInitialPosition(location);
            setuserLocation(location);
            setrouteLines(routes=>[...routes,location]);
            setHasLocation(true);
        }).catch(err=>console.log({err}));
    }, []);

    const getcurrentLocation=():Promise<Location>=>{
        return new Promise((resolve,reject)=>{
            Geolocation.getCurrentPosition(
                ({coords}) => {
                    resolve({
                        latitude:coords.latitude,
                        longitude:coords.longitude,
                    });
                },
                (err)=>reject({err}),{
                    enableHighAccuracy:true
                }//consume algo mas de bateria
            );
        });
    }

    const followUserLocation=()=>{
        watchId.current=Geolocation.watchPosition(({coords}) => {

            const location:Location={
                latitude:coords.latitude,
                longitude:coords.longitude
            }

            setuserLocation(location);

            setrouteLines(routes=>[...routes,location]);
        },
        (err)=>console.log({err}),{
            enableHighAccuracy:true,
            distanceFilter:10
        });
    }

    const stopFollowUserLocation=()=>{
        if(watchId.current)
            Geolocation.clearWatch(watchId.current);
    }

    return {
        hasLocation,
        initialPosition,
        getcurrentLocation,
        followUserLocation,
        userLocation,
        stopFollowUserLocation,
        routeLines
    }
}
