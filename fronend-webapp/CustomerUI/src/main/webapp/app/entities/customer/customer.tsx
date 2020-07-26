import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './customer.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomerProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Customer = (props: ICustomerProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { customerList, match, loading } = props;
  return (
    <div>
      <h2 id="customer-heading">
        <Translate contentKey="customerUiApp.customer.home.title">Customers</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="customerUiApp.customer.home.createLabel">Create new Customer</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {customerList && customerList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="customerUiApp.customer.firstName">First Name</Translate>
                </th>
                <th>
                  <Translate contentKey="customerUiApp.customer.middleName">Middle Name</Translate>
                </th>
                <th>
                  <Translate contentKey="customerUiApp.customer.lastName">Last Name</Translate>
                </th>
                <th>
                  <Translate contentKey="customerUiApp.customer.legalName">Legal Name</Translate>
                </th>
                <th>
                  <Translate contentKey="customerUiApp.customer.title">Title</Translate>
                </th>
                <th>
                  <Translate contentKey="customerUiApp.customer.suffix">Suffix</Translate>
                </th>
                <th>
                  <Translate contentKey="customerUiApp.customer.customerNumber">Customer Number</Translate>
                </th>
                <th>
                  <Translate contentKey="customerUiApp.customer.mobilePhone">Mobile Phone</Translate>
                </th>
                <th>
                  <Translate contentKey="customerUiApp.customer.email">Email</Translate>
                </th>
                <th>
                  <Translate contentKey="customerUiApp.customer.dateOfBirth">Date Of Birth</Translate>
                </th>
                <th>
                  <Translate contentKey="customerUiApp.customer.relationshipStatus">Relationship Status</Translate>
                </th>
                <th>
                  <Translate contentKey="customerUiApp.customer.employmentStatus">Employment Status</Translate>
                </th>
                <th>
                  <Translate contentKey="customerUiApp.customer.kycStatus">Kyc Status</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {customerList.map((customer, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${customer.id}`} color="link" size="sm">
                      {customer.id}
                    </Button>
                  </td>
                  <td>{customer.firstName}</td>
                  <td>{customer.middleName}</td>
                  <td>{customer.lastName}</td>
                  <td>{customer.legalName}</td>
                  <td>{customer.title}</td>
                  <td>{customer.suffix}</td>
                  <td>{customer.customerNumber}</td>
                  <td>{customer.mobilePhone}</td>
                  <td>{customer.email}</td>
                  <td>{customer.dateOfBirth ? <TextFormat type="date" value={customer.dateOfBirth} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{customer.relationshipStatus}</td>
                  <td>{customer.employmentStatus}</td>
                  <td>
                    <Translate contentKey={`customerUiApp.KYCStatus.${customer.kycStatus}`} />
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${customer.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${customer.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${customer.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="customerUiApp.customer.home.notFound">No Customers found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ customer }: IRootState) => ({
  customerList: customer.entities,
  loading: customer.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
