import React, { Component } from 'react';
import { Table } from 'antd';
import Column from 'antd/lib/table/Column';
import { withTranslation } from 'react-i18next';

class CompanyTable extends Component {
  render() {
    const { allCompany, t } = this.props;

    return (
      <Table
        rowKey="id"
        expandedRowRender={record => {
          return (
            <div className="row">
              <div className="col-md-4">
                <p>{t('phone')}: {record.phone}</p>
                <p>{t('createdAt')}: {record.created_at}</p>
              </div>
              <div className="col-md-8">
                <p>{t('manager')}: {record.manager.name}</p>
                <p>Email: {record.manager.email}</p> 
              </div>
            </div>
          )
        }}
        dataSource={allCompany}
      >
        <Column title="#" key="#" render={(text, record, index) => index + 1} />
        <Column title={t('name')} dataIndex="name" key="name" />
        <Column title={t('address')} dataIndex="address" key="address" />
      </Table>
    );
  }
}

export default withTranslation()(CompanyTable);