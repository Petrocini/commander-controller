import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { 
    View, 
    Text, 
    StyleSheet,
    TouchableOpacity,
    TextInput
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace'
import { api } from '../../services/api'
import { useSafeAreaFrame } from 'react-native-safe-area-context'

type RouteDetailParams = {
    Order: {
        number: string | number;
        order_id: string;
    }
}

type CategoryProps = {
    id: string;
    name: string; 
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>

export default function Order() {
    
    const route = useRoute<OrderRouteProps>()

    const navigation = useNavigation()

    const [category, setCategory] = useState<CategoryProps[] | []>([])
    const [categorySelected, setCategorySelected] = useState<CategoryProps>()

    const [amount, setAmount] = useState('1')

    useEffect(() => {
        async function loadInfo() {

            const response = await api.get('/category')

            setCategory(response.data)
            
            setCategorySelected(response.data[0])

        }
    })

    async function handleCloseOrder() {

        try {

            const response = await api.delete('/order', {
                params: {
                    order_id: route.params?.order_id
                }
            })

            navigation.goBack()

        } catch (err) {
            console.log(err)
        }

    }

    return (
        <View style={style.container}>

            <View style={style.header} >
                <Text style={style.title}>Mesage {route.params.number}</Text>
                <TouchableOpacity onPress={handleCloseOrder}>
                    <Feather name='trash-2' size={28} color='#ff3f4b'/>
                </TouchableOpacity>
            </View>

            {category.length !== 0 && (
                <TouchableOpacity style={style.input}>
                    <Text style={{ color: '#fff' }}> 
                        { categorySelected?.name }
                    </Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity style={style.input}>
                <Text style={{ color: '#fff' }}> Pizza de calabresa</Text>
            </TouchableOpacity>

            <View style={style.qtdContainer}>
                <Text style={style.qtdText}>Quantidade</Text>
                <TextInput
                    style={[style.input, { width: '60%', textAlign: 'center'}]}
                    placeholder='1'
                    placeholderTextColor='#f0f0f0'
                    keyboardType='numeric'
                    value={amount}
                    onChangeText={setAmount}/>
            </View>

            <View style={style.actions}>
                <TouchableOpacity style={style.buttonAdd}>
                    <Text style={style.buttonText}>+</Text>
                </TouchableOpacity>
            
                <TouchableOpacity style={style.button}>
                    <Text style={style.buttonText}>Avançar</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const style = StyleSheet.create({  
    container: {
        flex: 1,
        backgroundColor: '#1d1d2e',
        paddingVertical: '5%',
        paddingEnd: '4%',
        paddingStart: '4%'
    },
    header: {
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'center',
        marginTop: 24
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginRight: 14
    },
    input: {
        backgroundColor: '#101026',
        borderRadius: 4,
        width: '100%',
        height: 40,
        marginBottom: 12,
        justifyContent: 'center',
        paddingHorizontal: 8,
        color: '#fff',
        fontSize: 20
    },
    qtdContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    qtdText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    actions: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    buttonAdd: {
        width: '20%',
        backgroundColor: '#3fd1ff',
        borderRadius: 4,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#101026' ,
        fontSize: 18,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        height: 40,
        width: '75%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})