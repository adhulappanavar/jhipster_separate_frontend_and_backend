import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './customer.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CustomerDetail = (props: ICustomerDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { customerEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="customerUiApp.customer.detail.title">Customer</Translate> [<b>{customerEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="firstName">
              <Translate contentKey="customerUiApp.customer.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{customerEntity.firstName}</dd>
          <dt>
            <span id="middleName">
              <Translate contentKey="customerUiApp.customer.middleName">Middle Name</Translate>
            </span>
          </dt>
          <dd>{customerEntity.middleName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="customerUiApp.customer.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{customerEntity.lastName}</dd>
          <dt>
            <span id="legalName">
              <Translate contentKey="customerUiApp.customer.legalName">Legal Name</Translate>
            </span>
          </dt>
          <dd>{customerEntity.legalName}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="customerUiApp.customer.title">Title</Translate>
            </span>
          </dt>
          <dd>{customerEntity.title}</dd>
          <dt>
            <span id="suffix">
              <Translate contentKey="customerUiApp.customer.suffix">Suffix</Translate>
            </span>
          </dt>
          <dd>{customerEntity.suffix}</dd>
          <dt>
            <span id="customerNumber">
              <Translate contentKey="customerUiApp.customer.customerNumber">Customer Number</Translate>
            </span>
          </dt>
          <dd>{customerEntity.customerNumber}</dd>
          <dt>
            <span id="mobilePhone">
              <Translate contentKey="customerUiApp.customer.mobilePhone">Mobile Phone</Translate>
            </span>
          </dt>
          <dd>{customerEntity.mobilePhone}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="customerUiApp.customer.email">Email</Translate>
            </span>
          </dt>
          <dd>{customerEntity.email}</dd>
          <dt>
            <span id="dateOfBirth">
              <Translate contentKey="customerUiApp.customer.dateOfBirth">Date Of Birth</Translate>
            </span>
          </dt>
          <dd>
            {customerEntity.dateOfBirth ? <TextFormat value={customerEntity.dateOfBirth} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="relationshipStatus">
              <Translate contentKey="customerUiApp.customer.relationshipStatus">Relationship Status</Translate>
            </span>
          </dt>
          <dd>{customerEntity.relationshipStatus}</dd>
          <dt>
            <span id="employmentStatus">
              <Translate contentKey="customerUiApp.customer.employmentStatus">Employment Status</Translate>
            </span>
          </dt>
          <dd>{customerEntity.employmentStatus}</dd>
          <dt>
            <span id="kycStatus">
              <Translate contentKey="customerUiApp.customer.kycStatus">Kyc Status</Translate>
            </span>
          </dt>
          <dd>{customerEntity.kycStatus}</dd>
        </dl>
        <Button tag={Link} to="/customer" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/customer/${customerEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ customer }: IRootState) => ({
  customerEntity: customer.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetail);
