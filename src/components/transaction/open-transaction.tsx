import React, { useEffect, useState } from 'react';
import { fetchData } from '../../datasource/fetch-data';
import { Transaction } from '../../models/transaction';
import { ShowTransactionData } from './show-transaction';
import { Breadcrumb, Layout } from 'antd';
import { AnalysisData } from '../home/analysis';
import { UserProfile } from '../user-profile/user-profile';

let urlJsonServer = 'http://localhost:3000/transactions/';

const { Sider, Content } = Layout;

export function OpenTransaction(props: any) {
  let transactionId = props.match.params.id;
  urlJsonServer = urlJsonServer + transactionId; 
  const [transactionData, setTransaction] = useState<Transaction | null>(null);
        useEffect(() => {
            (async () => {
                try { 
                    let data = await fetchData(urlJsonServer);
                    setTransaction(data);
                } catch (e) { 
                    setTransaction(null);
                }
            })();
        }, []);
  return (
    <div>
      <AnalysisData />
      <div className="ant-layout-content">
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="/">Home</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Transaction detail</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Layout>
        <Layout>
          <Content>
            <div className='datatable'>
              {transactionData ? <ShowTransactionData transaction={transactionData} /> : null}
            </div>
          </Content>
          <Sider>
            <div className='profile'>
              <UserProfile />
            </div>
          </Sider>
        </Layout>
      </Layout>
    </div>
  );
}