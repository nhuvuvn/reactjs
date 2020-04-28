import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { Profile } from '../../models/profile';
import { UserProfile } from '../user-profile/user-profile';
import { fetchData } from '../../datasource/fetch-data';
import { TransactionData } from './transaction';
import { AnalysisData } from './analysis';

const { Sider, Content } = Layout;
export function Home() {
    const [profile, setProfile] = useState<Profile | null>(null);
    useEffect(() => {
        (async () => {
            try {
                const data = await fetchData('http://localhost:3000/profile');
                setProfile(data);
            } catch (e) { 
                console.log(e);
            }
        })();
    }, []);
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
                            {profile ? <UserProfile profile={profile} /> : null}
                        </div>
                    </Sider>
                </Layout>
            </Layout>
        </div >
    );
}
