import React from 'react';
import { Layout } from 'antd';
import { UserProfile } from '../user-profile/user-profile';
import { TransactionData } from '../transaction/transaction';
import { AnalysisData } from './analysis';

const { Sider, Content } = Layout;
export function Home() {
    return (
        <div>
            <AnalysisData />
            <Layout>
                <Layout>
                    <Content>
                        <div className='datatable'>
                          <TransactionData  /> 
                        </div>
                    </Content>
                    <Sider>
                        <div className='profile'>
                            <UserProfile  />
                        </div>
                    </Sider>
                </Layout>
            </Layout>
        </div >
    );
}
