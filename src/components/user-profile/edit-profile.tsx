import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Breadcrumb, Select } from 'antd';
import { Profile } from '../../models/profile';
import { fetchData } from '../../datasource/fetch-data';
import { AnalysisData } from '../home/analysis';
import { UserProfile } from './user-profile';
import { Layout } from 'antd';
import { Redirect } from 'react-router-dom';

const { Sider, Content } = Layout;
interface FormEditProps {
  initialValues: Profile;
  onFinish: (formValue: any) => void;
}
function FormEdit(props: FormEditProps) {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
  };
  function handleChange(value: string) {
    
  }
  return (
    <Form
      {...layout}
      name='basic'
      initialValues={props.initialValues}
      onFinish={props.onFinish}
    >
      <Form.Item
        label='Username'
        name='name'
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label='Title' name='title'>
        <Input />
      </Form.Item>

      <Form.Item label='Role' name='roles'>
        <Select mode="tags" style={{ width: '100%' }} placeholder="roles" onChange={handleChange}>
        </Select>
      </Form.Item>

      <Form.Item label='Email' name='email'>
        <Input />
      </Form.Item>

      <Form.Item label='Phone' name='phone'>
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export function EditProfile() {

  const [redirect, setRedirect] = useState<boolean>(false);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [saveState, setSaveState] = useState<{
    id: string;
    body: string;
  } | null>(null);
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

  useEffect(() => {
    (async () => {
      if (!saveState) {
        return;
      }
      try {
        // convert data before update
        let jsonData = JSON.parse(saveState.body);
        let rolesLength = jsonData.roles.length;
        let rolesObj = [];
        if (rolesLength) {
          for (const value of jsonData.roles) {
            rolesObj.push(value);
          }
        } else {
          rolesObj.push(jsonData.roles);
        }
        jsonData.roles = rolesObj;
        await fetchData('http://localhost:3000/profile', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify(jsonData),
        });
        // redirect TODO
        setRedirect(true);

      } catch (e) {
        console.log(e);
      }
    })();
  }, [saveState]);

  function onFinish(args: any) {

    setSaveState({
      id: profile!.id,
      body: JSON.stringify(args),
    });
  }
  return (
    <>
      {redirect ? <Redirect to="/" /> : null}
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
              {profile ? (
                <FormEdit
                  initialValues={profile}
                  onFinish={onFinish}
                />
              ) : (
                  <p>Loading...</p>
                )}
            </div>
          </Content>
          <Sider>
            <div className='profile'>
              <UserProfile />
            </div>
          </Sider>
        </Layout>
      </Layout>
    </>
  );
}
