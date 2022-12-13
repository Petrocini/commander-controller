import { useState } from 'react'
import Head from "next/head"
import { canSSRAuth } from "../../utils/canSSRAuth"
import { Header } from "../../components/Header"

import styles from './styles.module.scss'
import { FiRefreshCcw } from "react-icons/fi"
import { setupAPIClient } from "../../services/api"
import { api } from "../../services/errors/apiClient"

type OrderProps = {
    id: string;
    table: string | number;
    status: boolean;
    draft: boolean;
    name: string | null;
}

interface HomeProps {
    orders: OrderProps
}

export default function Dashboard({ orders }: HomeProps) {
    
    const [orderList, setOrderList] = useState([])

    function handleOpenModalView(id: string) {

    }

    return (
        <>
            <Head>
                <title>Painel - Sujeito Pizzaria</title>
            </Head>
            <div>
                <Header />

                <main className={styles.container}>

                    <div className={styles.containerHeader}>
                        <h1>Últimos pedidos</h1>
                        <button>
                            <FiRefreshCcw size={25} color="#3fffa#"/>
                        </button>
                    </div>

                    <article className={styles.listOrders}>

                        {orderList.map( item => (
                            <section key={item.id} className={styles.orderItem}>
                                <button onClick={ () => {handleOpenModalView(item.id)}}>
                                    <div className={styles.tag}></div>
                                    <span>Mesa {item.table} </span>
                                </button>
                            </section>
                        ))}

                    </article>

                </main>

            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get('/orders')

    return {
        props: {
            orders: response.data
        }
    }

})