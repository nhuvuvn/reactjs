import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { Profile } from '../../models/profile';
import { fetchData } from '../../datasource/fetch-data';

interface FormEditProps {
  initialValues: Profile;
  onFinish: (formValue: any) => void;
}
function FormEdit(props: FormEditProps) {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

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

      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export function EditProfile() {
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
        await fetchData('http://localhost:3000/profile', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: saveState.body,
        });
        // redirect TODO
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
      <div>Edit Profile</div>
      {profile ? (
        <div>
          <FormEdit
            initialValues={profile}
            onFinish={onFinish}
          />
        </div>
      ) : (
          <p>Loading...</p>
        )}
    </>
  );
}
