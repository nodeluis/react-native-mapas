import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { BlackButton } from '../components/BlackButton';
import { PermissionsContext } from '../context/PermissionsContext';

export const PermissionsScreen = () => {

    const {askLocationPermission}= useContext(PermissionsContext);


    return (
        <View style={styles.container}>
            <BlackButton
                title="permiso"
                onPress={askLocationPermission}
            />

        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});
