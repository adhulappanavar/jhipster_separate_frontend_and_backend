import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './address.reducer';
import { IAddress } from 'app/shared/model/address.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAddressDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AddressDetail = (props: IAddressDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { addressEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="customerUiApp.address.detail.title">Address</Translate> [<b>{addressEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="line1">
              <Translate contentKey="customerUiApp.address.line1">Line 1</Translate>
            </span>
          </dt>
          <dd>{addressEntity.line1}</dd>
          <dt>
            <span id="line2">
              <Translate contentKey="customerUiApp.address.line2">Line 2</Translate>
            </span>
          </dt>
          <dd>{addressEntity.line2}</dd>
          <dt>
            <span id="line3">
              <Translate contentKey="customerUiApp.address.line3">Line 3</Translate>
            </span>
          </dt>
          <dd>{addressEntity.line3}</dd>
          <dt>
            <span id="city">
              <Translate contentKey="customerUiApp.address.city">City</Translate>
            </span>
          </dt>
          <dd>{addressEntity.city}</dd>
          <dt>
            <span id="county">
              <Translate contentKey="customerUiApp.address.county">County</Translate>
            </span>
          </dt>
          <dd>{addressEntity.county}</dd>
          <dt>
            <span id="countryCode">
              <Translate contentKey="customerUiApp.address.countryCode">Country Code</Translate>
            </span>
          </dt>
          <dd>{addressEntity.countryCode}</dd>
          <dt>
            <span id="state">
              <Translate contentKey="customerUiApp.address.state">State</Translate>
            </span>
          </dt>
          <dd>{addressEntity.state}</dd>
          <dt>
            <span id="postCode">
              <Translate contentKey="customerUiApp.address.postCode">Post Code</Translate>
            </span>
          </dt>
          <dd>{addressEntity.postCode}</dd>
          <dt>
            <span id="addressType">
              <Translate contentKey="customerUiApp.address.addressType">Address Type</Translate>
            </span>
          </dt>
          <dd>{addressEntity.addressType}</dd>
          <dt>
            <Translate contentKey="customerUiApp.address.customer">Customer</Translate>
          </dt>
          <dd>{addressEntity.customer ? addressEntity.customer.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/address" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/address/${addressEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ address }: IRootState) => ({
  addressEntity: address.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AddressDetail);
