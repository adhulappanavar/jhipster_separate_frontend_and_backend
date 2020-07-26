package com.ps.banking.retail.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import com.ps.banking.retail.domain.enumeration.KYCStatus;

/**
 * A Customer.
 */
@Entity
@Table(name = "customers")
public class Customer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "middle_name")
    private String middleName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "legal_name")
    private String legalName;

    @Column(name = "title")
    private String title;

    @Column(name = "suffix")
    private String suffix;

    @Column(name = "customer_number")
    private String customerNumber;

    @Column(name = "mobile_phone")
    private String mobilePhone;

    @Column(name = "email")
    private String email;

    @Column(name = "date_of_birth")
    private Instant dateOfBirth;

    @Column(name = "relationship_status")
    private String relationshipStatus;

    @Column(name = "employment_status")
    private String employmentStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "kyc_status")
    private KYCStatus kycStatus;

    @OneToMany(mappedBy = "customer")
    private Set<Address> addresses = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public Customer firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public Customer middleName(String middleName) {
        this.middleName = middleName;
        return this;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public Customer lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getLegalName() {
        return legalName;
    }

    public Customer legalName(String legalName) {
        this.legalName = legalName;
        return this;
    }

    public void setLegalName(String legalName) {
        this.legalName = legalName;
    }

    public String getTitle() {
        return title;
    }

    public Customer title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSuffix() {
        return suffix;
    }

    public Customer suffix(String suffix) {
        this.suffix = suffix;
        return this;
    }

    public void setSuffix(String suffix) {
        this.suffix = suffix;
    }

    public String getCustomerNumber() {
        return customerNumber;
    }

    public Customer customerNumber(String customerNumber) {
        this.customerNumber = customerNumber;
        return this;
    }

    public void setCustomerNumber(String customerNumber) {
        this.customerNumber = customerNumber;
    }

    public String getMobilePhone() {
        return mobilePhone;
    }

    public Customer mobilePhone(String mobilePhone) {
        this.mobilePhone = mobilePhone;
        return this;
    }

    public void setMobilePhone(String mobilePhone) {
        this.mobilePhone = mobilePhone;
    }

    public String getEmail() {
        return email;
    }

    public Customer email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Instant getDateOfBirth() {
        return dateOfBirth;
    }

    public Customer dateOfBirth(Instant dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
        return this;
    }

    public void setDateOfBirth(Instant dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getRelationshipStatus() {
        return relationshipStatus;
    }

    public Customer relationshipStatus(String relationshipStatus) {
        this.relationshipStatus = relationshipStatus;
        return this;
    }

    public void setRelationshipStatus(String relationshipStatus) {
        this.relationshipStatus = relationshipStatus;
    }

    public String getEmploymentStatus() {
        return employmentStatus;
    }

    public Customer employmentStatus(String employmentStatus) {
        this.employmentStatus = employmentStatus;
        return this;
    }

    public void setEmploymentStatus(String employmentStatus) {
        this.employmentStatus = employmentStatus;
    }

    public KYCStatus getKycStatus() {
        return kycStatus;
    }

    public Customer kycStatus(KYCStatus kycStatus) {
        this.kycStatus = kycStatus;
        return this;
    }

    public void setKycStatus(KYCStatus kycStatus) {
        this.kycStatus = kycStatus;
    }

    public Set<Address> getAddresses() {
        return addresses;
    }

    public Customer addresses(Set<Address> addresses) {
        this.addresses = addresses;
        return this;
    }

    public Customer addAddress(Address address) {
        this.addresses.add(address);
        address.setCustomer(this);
        return this;
    }

    public Customer removeAddress(Address address) {
        this.addresses.remove(address);
        address.setCustomer(null);
        return this;
    }

    public void setAddresses(Set<Address> addresses) {
        this.addresses = addresses;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Customer)) {
            return false;
        }
        return id != null && id.equals(((Customer) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Customer{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", middleName='" + getMiddleName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", legalName='" + getLegalName() + "'" +
            ", title='" + getTitle() + "'" +
            ", suffix='" + getSuffix() + "'" +
            ", customerNumber='" + getCustomerNumber() + "'" +
            ", mobilePhone='" + getMobilePhone() + "'" +
            ", email='" + getEmail() + "'" +
            ", dateOfBirth='" + getDateOfBirth() + "'" +
            ", relationshipStatus='" + getRelationshipStatus() + "'" +
            ", employmentStatus='" + getEmploymentStatus() + "'" +
            ", kycStatus='" + getKycStatus() + "'" +
            "}";
    }
}
