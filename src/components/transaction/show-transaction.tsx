import React from 'react';
import { Transaction } from '../../models/transaction';
import { Alert } from 'antd';
import moment from 'moment';

interface Props {
  transaction: Transaction;
}
export function ShowTransactionData(props: Props) {
  const { transaction } = props;
  return (
    <div>
      <Alert message={"Transaction Key: " + transaction.key} type="success" />
      <Alert message={"Transaction subject: " + transaction.subject} type="info" />
      <Alert message={"Requested Date: " + moment(transaction.requestedDate).format("DD-MM-YYYY")} type="success" />
      <Alert message={"Latest Update Date: " + moment(transaction.latestUpdate).format("DD-MM-YYYY")} type="info" />
      <Alert message={"Status: " + transaction.status} type="success" />
    </div>
  );
}