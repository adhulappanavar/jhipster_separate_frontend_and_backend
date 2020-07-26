import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './customer.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICustomerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CustomerUpdate = (props: ICustomerUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { customerEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/customer');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.dateOfBirth = convertDateTimeToServer(values.dateOfBirth);

    if (errors.length === 0) {
      const entity = {
        ...customerEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="customerUiApp.customer.home.createOrEditLabel">
            <Translate contentKey="customerUiApp.customer.home.createOrEditLabel">Create or edit a Customer</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : customerEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="customer-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="customer-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="firstNameLabel" for="customer-firstName">
                  <Translate contentKey="customerUiApp.customer.firstName">First Name</Translate>
                </Label>
                <AvField id="customer-firstName" type="text" name="firstName" />
              </AvGroup>
              <AvGroup>
                <Label id="middleNameLabel" for="customer-middleName">
                  <Translate contentKey="customerUiApp.customer.middleName">Middle Name</Translate>
                </Label>
                <AvField id="customer-middleName" type="text" name="middleName" />
              </AvGroup>
              <AvGroup>
                <Label id="lastNameLabel" for="customer-lastName">
                  <Translate contentKey="customerUiApp.customer.lastName">Last Name</Translate>
                </Label>
                <AvField id="customer-lastName" type="text" name="lastName" />
              </AvGroup>
              <AvGroup>
                <Label id="legalNameLabel" for="customer-legalName">
                  <Translate contentKey="customerUiApp.customer.legalName">Legal Name</Translate>
                </Label>
                <AvField id="customer-legalName" type="text" name="legalName" />
              </AvGroup>
              <AvGroup>
                <Label id="titleLabel" for="customer-title">
                  <Translate contentKey="customerUiApp.customer.title">Title</Translate>
                </Label>
                <AvField id="customer-title" type="text" name="title" />
              </AvGroup>
              <AvGroup>
                <Label id="suffixLabel" for="customer-suffix">
                  <Translate contentKey="customerUiApp.customer.suffix">Suffix</Translate>
                </Label>
                <AvField id="customer-suffix" type="text" name="suffix" />
              </AvGroup>
              <AvGroup>
                <Label id="customerNumberLabel" for="customer-customerNumber">
                  <Translate contentKey="customerUiApp.customer.customerNumber">Customer Number</Translate>
                </Label>
                <AvField id="customer-customerNumber" type="text" name="customerNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="mobilePhoneLabel" for="customer-mobilePhone">
                  <Translate contentKey="customerUiApp.customer.mobilePhone">Mobile Phone</Translate>
                </Label>
                <AvField id="customer-mobilePhone" type="text" name="mobilePhone" />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="customer-email">
                  <Translate contentKey="customerUiApp.customer.email">Email</Translate>
                </Label>
                <AvField id="customer-email" type="text" name="email" />
              </AvGroup>
              <AvGroup>
                <Label id="dateOfBirthLabel" for="customer-dateOfBirth">
                  <Translate contentKey="customerUiApp.customer.dateOfBirth">Date Of Birth</Translate>
                </Label>
                <AvInput
                  id="customer-dateOfBirth"
                  type="datetime-local"
                  className="form-control"
                  name="dateOfBirth"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.customerEntity.dateOfBirth)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="relationshipStatusLabel" for="customer-relationshipStatus">
                  <Translate contentKey="customerUiApp.customer.relationshipStatus">Relationship Status</Translate>
                </Label>
                <AvField id="customer-relationshipStatus" type="text" name="relationshipStatus" />
              </AvGroup>
              <AvGroup>
                <Label id="employmentStatusLabel" for="customer-employmentStatus">
                  <Translate contentKey="customerUiApp.customer.employmentStatus">Employment Status</Translate>
                </Label>
                <AvField id="customer-employmentStatus" type="text" name="employmentStatus" />
              </AvGroup>
              <AvGroup>
                <Label id="kycStatusLabel" for="customer-kycStatus">
                  <Translate contentKey="customerUiApp.customer.kycStatus">Kyc Status</Translate>
                </Label>
                <AvInput
                  id="customer-kycStatus"
                  type="select"
                  className="form-control"
                  name="kycStatus"
                  value={(!isNew && customerEntity.kycStatus) || 'INPROGRESS'}
                >
                  <option value="INPROGRESS">{translate('customerUiApp.KYCStatus.INPROGRESS')}</option>
                  <option value="DONE">{translate('customerUiApp.KYCStatus.DONE')}</option>
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/customer" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  customerEntity: storeState.customer.entity,
  loading: storeState.customer.loading,
  updating: storeState.customer.updating,
  updateSuccess: storeState.customer.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerUpdate);
