import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICustomer } from 'app/shared/model/customer.model';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { getEntity, updateEntity, createEntity, reset } from './address.reducer';
import { IAddress } from 'app/shared/model/address.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAddressUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AddressUpdate = (props: IAddressUpdateProps) => {
  const [customerId, setCustomerId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { addressEntity, customers, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/address');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCustomers();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...addressEntity,
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
          <h2 id="customerUiApp.address.home.createOrEditLabel">
            <Translate contentKey="customerUiApp.address.home.createOrEditLabel">Create or edit a Address</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : addressEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="address-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="address-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="line1Label" for="address-line1">
                  <Translate contentKey="customerUiApp.address.line1">Line 1</Translate>
                </Label>
                <AvField id="address-line1" type="text" name="line1" />
              </AvGroup>
              <AvGroup>
                <Label id="line2Label" for="address-line2">
                  <Translate contentKey="customerUiApp.address.line2">Line 2</Translate>
                </Label>
                <AvField id="address-line2" type="text" name="line2" />
              </AvGroup>
              <AvGroup>
                <Label id="line3Label" for="address-line3">
                  <Translate contentKey="customerUiApp.address.line3">Line 3</Translate>
                </Label>
                <AvField id="address-line3" type="text" name="line3" />
              </AvGroup>
              <AvGroup>
                <Label id="cityLabel" for="address-city">
                  <Translate contentKey="customerUiApp.address.city">City</Translate>
                </Label>
                <AvField id="address-city" type="text" name="city" />
              </AvGroup>
              <AvGroup>
                <Label id="countyLabel" for="address-county">
                  <Translate contentKey="customerUiApp.address.county">County</Translate>
                </Label>
                <AvField id="address-county" type="text" name="county" />
              </AvGroup>
              <AvGroup>
                <Label id="countryCodeLabel" for="address-countryCode">
                  <Translate contentKey="customerUiApp.address.countryCode">Country Code</Translate>
                </Label>
                <AvField id="address-countryCode" type="text" name="countryCode" />
              </AvGroup>
              <AvGroup>
                <Label id="stateLabel" for="address-state">
                  <Translate contentKey="customerUiApp.address.state">State</Translate>
                </Label>
                <AvField id="address-state" type="text" name="state" />
              </AvGroup>
              <AvGroup>
                <Label id="postCodeLabel" for="address-postCode">
                  <Translate contentKey="customerUiApp.address.postCode">Post Code</Translate>
                </Label>
                <AvField id="address-postCode" type="text" name="postCode" />
              </AvGroup>
              <AvGroup>
                <Label id="addressTypeLabel" for="address-addressType">
                  <Translate contentKey="customerUiApp.address.addressType">Address Type</Translate>
                </Label>
                <AvInput
                  id="address-addressType"
                  type="select"
                  className="form-control"
                  name="addressType"
                  value={(!isNew && addressEntity.addressType) || 'PERMANENT'}
                >
                  <option value="PERMANENT">{translate('customerUiApp.AddressType.PERMANENT')}</option>
                  <option value="CURRENT">{translate('customerUiApp.AddressType.CURRENT')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="address-customer">
                  <Translate contentKey="customerUiApp.address.customer">Customer</Translate>
                </Label>
                <AvInput id="address-customer" type="select" className="form-control" name="customer.id">
                  <option value="" key="0" />
                  {customers
                    ? customers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/address" replace color="info">
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
  customers: storeState.customer.entities,
  addressEntity: storeState.address.entity,
  loading: storeState.address.loading,
  updating: storeState.address.updating,
  updateSuccess: storeState.address.updateSuccess,
});

const mapDispatchToProps = {
  getCustomers,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AddressUpdate);
