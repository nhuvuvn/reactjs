import React, { useEffect, useState } from 'react';
import { Statistic, Card, Row, Col } from 'antd';
import { HeartOutlined, ShoppingOutlined, ScheduleOutlined } from '@ant-design/icons';
import { Analysis } from '../../models/analysis';
import { fetchData } from '../../datasource/fetch-data';

const colorsAry = ['#3f8600', '#cf1322', '#0a61bf'];
const iconsAry = [HeartOutlined, ShoppingOutlined, ScheduleOutlined];

export function AnalysisData() {
    const [datas, setAnalysis] = useState<Analysis[]>([]);
    useEffect(() => {
        (async () => {
            try {
                const data = await fetchData('http://localhost:3000/analysis');

                for (var i = 0; i < data.length; i++) {
                    data[i].color = colorsAry[i];
                    data[i].icon = iconsAry[i];
                }
                setAnalysis(data);

            } catch (e) {
                setAnalysis([]);
            }
        })();
    }, []);

    return (
        <div className="site-statistic-demo-card">
            <Row gutter={16}>
                {datas.map((data) => {
                    return (
                        <Col span={8} key={data.id}>
                            <Card>
                                <Statistic
                                    title={data.title}
                                    value={data.value}
                                    valueStyle={{ fontSize: '40px', color: data.color }}
                                    prefix={<data.icon />}
                                />
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
}
