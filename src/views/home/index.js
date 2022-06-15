import {useEffect, useState} from "react";
import products from "../../service/products";
import {Input, message, Table} from "antd";
import Cookies from 'js-cookie'
import {HomeBlock} from "./atoms";

export const HomePage = () => {
    const token = Cookies.get('token')
    const [data, setData] = useState([]);
    const [sortData, setSortData] = useState([])
    const [pagination, setPagination] = useState({current: 1, pageSize: 10});
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (token) {
            const params = {
                size: pagination.pageSize,
                page: pagination.current
            }
            setLoading(true)
            products.getProducts(params)
                .then(response => {
                    setLoading(false)
                    setData(response.data.items)
                    setTotalCount(response.data.total_count)
                })
                .catch(error => {
                    setLoading(false)
                    message.error(error?.response?.data?.message)
                })
        }

    }, [pagination]);

    useEffect(() => {
        if (data?.length) {
            const filterData = data.filter(item => item.productName.toUpperCase().indexOf(search.toUpperCase()) > -1)
                .sort((a, b) => a.productName.split(search)[0].length - b.productName.split(search)[0].length)
            setSortData(filterData)
        }
    }, [search, data])


    const columns = [
        {
            title: 'Name',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Barcode',
            dataIndex: 'barcode',
            key: 'barcode',
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            key: 'sku',
        },
        {
            title: 'Product Properties',
            dataIndex: 'productProperties',
            key: 'productProperties',
            render: (properties) => <>{properties.map(item => <div><span>{item.name}: </span><span>{item.value}</span>
            </div>)}</>,
        },
        {
            title: 'Properties',
            dataIndex: 'properties',
            key: 'properties',
            render: (properties) => <>{properties.map(item => <div><span>{item.name}: </span><span>{item.value}</span>
            </div>)}</>,
        },
    ];

    return (
        <HomeBlock>
            <Input
                placeholder='Search...'
                onChange={(e) => setSearch(e.target.value)}
            />
            <Table
                rowKey={record => record.id}
                pagination={{...pagination, total: totalCount}}
                dataSource={sortData}
                columns={columns}
                loading={loading}
                onChange={(e) => setPagination(e)}
                croll={{ x: 1000 }}
            />
        </HomeBlock>
    )
}