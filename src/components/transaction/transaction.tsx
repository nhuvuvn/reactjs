import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { fetchData } from '../../datasource/fetch-data';
import { Transaction } from '../../models/transaction';
import moment from 'moment';

const columns = [
    {
        title: 'ID',
        dataIndex: 'key',
        key: 'key',
        render: (key: number) => (
            <b>#{key}</b>
        ),
    },
    {
        title: 'Subject',
        dataIndex: 'subject',
        key: 'subject',
    },
    {
        title: 'Requested Date',
        dataIndex: 'requestedDate',
        key: 'requestedDate',
        render: (date: string) => (
            moment(date).format("DD-MM-YYYY")
        )
    },
    {
        title: 'Latest Update',
        key: 'latestUpdate',
        dataIndex: 'latestUpdate',
        render: (date: string) => (
            moment(date).format("DD-MM-YYYY")
        )
    },
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status'
    },
    {
        title: 'Action',
        key: 'action',
        dataIndex: 'key',
        render: (key: string) => (
            <span>
                <a href={'open-transaction/' + key}>Open</a>
            </span>
        ),
    },
];

export function TransactionData() {
    const [data, setTransaction] = useState<Transaction[]>([]);
        useEffect(() => {
            (async () => {
                try {
                    const data = await fetchData('http://localhost:3000/transactions');

                    setTransaction(data);
                } catch (e) { 
                    setTransaction([]);
                }
            })();
        }, []);
        
    return (
        <Table columns={columns} dataSource={data} />
    );
}
