package com.ps.banking.retail.web.rest;

import com.ps.banking.retail.CustomerserviceApp;
import com.ps.banking.retail.domain.Customer;
import com.ps.banking.retail.repository.CustomerRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.ps.banking.retail.domain.enumeration.KYCStatus;
/**
 * Integration tests for the {@link CustomerResource} REST controller.
 */
@SpringBootTest(classes = CustomerserviceApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CustomerResourceIT {

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_MIDDLE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_MIDDLE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LEGAL_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LEGAL_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_SUFFIX = "AAAAAAAAAA";
    private static final String UPDATED_SUFFIX = "BBBBBBBBBB";

    private static final String DEFAULT_CUSTOMER_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_CUSTOMER_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_MOBILE_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_MOBILE_PHONE = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE_OF_BIRTH = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_OF_BIRTH = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_RELATIONSHIP_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_RELATIONSHIP_STATUS = "BBBBBBBBBB";

    private static final String DEFAULT_EMPLOYMENT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_EMPLOYMENT_STATUS = "BBBBBBBBBB";

    private static final KYCStatus DEFAULT_KYC_STATUS = KYCStatus.INPROGRESS;
    private static final KYCStatus UPDATED_KYC_STATUS = KYCStatus.DONE;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCustomerMockMvc;

    private Customer customer;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Customer createEntity(EntityManager em) {
        Customer customer = new Customer()
            .firstName(DEFAULT_FIRST_NAME)
            .middleName(DEFAULT_MIDDLE_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .legalName(DEFAULT_LEGAL_NAME)
            .title(DEFAULT_TITLE)
            .suffix(DEFAULT_SUFFIX)
            .customerNumber(DEFAULT_CUSTOMER_NUMBER)
            .mobilePhone(DEFAULT_MOBILE_PHONE)
            .email(DEFAULT_EMAIL)
            .dateOfBirth(DEFAULT_DATE_OF_BIRTH)
            .relationshipStatus(DEFAULT_RELATIONSHIP_STATUS)
            .employmentStatus(DEFAULT_EMPLOYMENT_STATUS)
            .kycStatus(DEFAULT_KYC_STATUS);
        return customer;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Customer createUpdatedEntity(EntityManager em) {
        Customer customer = new Customer()
            .firstName(UPDATED_FIRST_NAME)
            .middleName(UPDATED_MIDDLE_NAME)
            .lastName(UPDATED_LAST_NAME)
            .legalName(UPDATED_LEGAL_NAME)
            .title(UPDATED_TITLE)
            .suffix(UPDATED_SUFFIX)
            .customerNumber(UPDATED_CUSTOMER_NUMBER)
            .mobilePhone(UPDATED_MOBILE_PHONE)
            .email(UPDATED_EMAIL)
            .dateOfBirth(UPDATED_DATE_OF_BIRTH)
            .relationshipStatus(UPDATED_RELATIONSHIP_STATUS)
            .employmentStatus(UPDATED_EMPLOYMENT_STATUS)
            .kycStatus(UPDATED_KYC_STATUS);
        return customer;
    }

    @BeforeEach
    public void initTest() {
        customer = createEntity(em);
    }

    @Test
    @Transactional
    public void createCustomer() throws Exception {
        int databaseSizeBeforeCreate = customerRepository.findAll().size();
        // Create the Customer
        restCustomerMockMvc.perform(post("/api/customers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customer)))
            .andExpect(status().isCreated());

        // Validate the Customer in the database
        List<Customer> customerList = customerRepository.findAll();
        assertThat(customerList).hasSize(databaseSizeBeforeCreate + 1);
        Customer testCustomer = customerList.get(customerList.size() - 1);
        assertThat(testCustomer.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testCustomer.getMiddleName()).isEqualTo(DEFAULT_MIDDLE_NAME);
        assertThat(testCustomer.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testCustomer.getLegalName()).isEqualTo(DEFAULT_LEGAL_NAME);
        assertThat(testCustomer.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testCustomer.getSuffix()).isEqualTo(DEFAULT_SUFFIX);
        assertThat(testCustomer.getCustomerNumber()).isEqualTo(DEFAULT_CUSTOMER_NUMBER);
        assertThat(testCustomer.getMobilePhone()).isEqualTo(DEFAULT_MOBILE_PHONE);
        assertThat(testCustomer.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testCustomer.getDateOfBirth()).isEqualTo(DEFAULT_DATE_OF_BIRTH);
        assertThat(testCustomer.getRelationshipStatus()).isEqualTo(DEFAULT_RELATIONSHIP_STATUS);
        assertThat(testCustomer.getEmploymentStatus()).isEqualTo(DEFAULT_EMPLOYMENT_STATUS);
        assertThat(testCustomer.getKycStatus()).isEqualTo(DEFAULT_KYC_STATUS);
    }

    @Test
    @Transactional
    public void createCustomerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = customerRepository.findAll().size();

        // Create the Customer with an existing ID
        customer.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCustomerMockMvc.perform(post("/api/customers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customer)))
            .andExpect(status().isBadRequest());

        // Validate the Customer in the database
        List<Customer> customerList = customerRepository.findAll();
        assertThat(customerList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCustomers() throws Exception {
        // Initialize the database
        customerRepository.saveAndFlush(customer);

        // Get all the customerList
        restCustomerMockMvc.perform(get("/api/customers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(customer.getId().intValue())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME)))
            .andExpect(jsonPath("$.[*].middleName").value(hasItem(DEFAULT_MIDDLE_NAME)))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME)))
            .andExpect(jsonPath("$.[*].legalName").value(hasItem(DEFAULT_LEGAL_NAME)))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].suffix").value(hasItem(DEFAULT_SUFFIX)))
            .andExpect(jsonPath("$.[*].customerNumber").value(hasItem(DEFAULT_CUSTOMER_NUMBER)))
            .andExpect(jsonPath("$.[*].mobilePhone").value(hasItem(DEFAULT_MOBILE_PHONE)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].dateOfBirth").value(hasItem(DEFAULT_DATE_OF_BIRTH.toString())))
            .andExpect(jsonPath("$.[*].relationshipStatus").value(hasItem(DEFAULT_RELATIONSHIP_STATUS)))
            .andExpect(jsonPath("$.[*].employmentStatus").value(hasItem(DEFAULT_EMPLOYMENT_STATUS)))
            .andExpect(jsonPath("$.[*].kycStatus").value(hasItem(DEFAULT_KYC_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getCustomer() throws Exception {
        // Initialize the database
        customerRepository.saveAndFlush(customer);

        // Get the customer
        restCustomerMockMvc.perform(get("/api/customers/{id}", customer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(customer.getId().intValue()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME))
            .andExpect(jsonPath("$.middleName").value(DEFAULT_MIDDLE_NAME))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME))
            .andExpect(jsonPath("$.legalName").value(DEFAULT_LEGAL_NAME))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.suffix").value(DEFAULT_SUFFIX))
            .andExpect(jsonPath("$.customerNumber").value(DEFAULT_CUSTOMER_NUMBER))
            .andExpect(jsonPath("$.mobilePhone").value(DEFAULT_MOBILE_PHONE))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.dateOfBirth").value(DEFAULT_DATE_OF_BIRTH.toString()))
            .andExpect(jsonPath("$.relationshipStatus").value(DEFAULT_RELATIONSHIP_STATUS))
            .andExpect(jsonPath("$.employmentStatus").value(DEFAULT_EMPLOYMENT_STATUS))
            .andExpect(jsonPath("$.kycStatus").value(DEFAULT_KYC_STATUS.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingCustomer() throws Exception {
        // Get the customer
        restCustomerMockMvc.perform(get("/api/customers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCustomer() throws Exception {
        // Initialize the database
        customerRepository.saveAndFlush(customer);

        int databaseSizeBeforeUpdate = customerRepository.findAll().size();

        // Update the customer
        Customer updatedCustomer = customerRepository.findById(customer.getId()).get();
        // Disconnect from session so that the updates on updatedCustomer are not directly saved in db
        em.detach(updatedCustomer);
        updatedCustomer
            .firstName(UPDATED_FIRST_NAME)
            .middleName(UPDATED_MIDDLE_NAME)
            .lastName(UPDATED_LAST_NAME)
            .legalName(UPDATED_LEGAL_NAME)
            .title(UPDATED_TITLE)
            .suffix(UPDATED_SUFFIX)
            .customerNumber(UPDATED_CUSTOMER_NUMBER)
            .mobilePhone(UPDATED_MOBILE_PHONE)
            .email(UPDATED_EMAIL)
            .dateOfBirth(UPDATED_DATE_OF_BIRTH)
            .relationshipStatus(UPDATED_RELATIONSHIP_STATUS)
            .employmentStatus(UPDATED_EMPLOYMENT_STATUS)
            .kycStatus(UPDATED_KYC_STATUS);

        restCustomerMockMvc.perform(put("/api/customers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCustomer)))
            .andExpect(status().isOk());

        // Validate the Customer in the database
        List<Customer> customerList = customerRepository.findAll();
        assertThat(customerList).hasSize(databaseSizeBeforeUpdate);
        Customer testCustomer = customerList.get(customerList.size() - 1);
        assertThat(testCustomer.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testCustomer.getMiddleName()).isEqualTo(UPDATED_MIDDLE_NAME);
        assertThat(testCustomer.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testCustomer.getLegalName()).isEqualTo(UPDATED_LEGAL_NAME);
        assertThat(testCustomer.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testCustomer.getSuffix()).isEqualTo(UPDATED_SUFFIX);
        assertThat(testCustomer.getCustomerNumber()).isEqualTo(UPDATED_CUSTOMER_NUMBER);
        assertThat(testCustomer.getMobilePhone()).isEqualTo(UPDATED_MOBILE_PHONE);
        assertThat(testCustomer.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testCustomer.getDateOfBirth()).isEqualTo(UPDATED_DATE_OF_BIRTH);
        assertThat(testCustomer.getRelationshipStatus()).isEqualTo(UPDATED_RELATIONSHIP_STATUS);
        assertThat(testCustomer.getEmploymentStatus()).isEqualTo(UPDATED_EMPLOYMENT_STATUS);
        assertThat(testCustomer.getKycStatus()).isEqualTo(UPDATED_KYC_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingCustomer() throws Exception {
        int databaseSizeBeforeUpdate = customerRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCustomerMockMvc.perform(put("/api/customers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customer)))
            .andExpect(status().isBadRequest());

        // Validate the Customer in the database
        List<Customer> customerList = customerRepository.findAll();
        assertThat(customerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCustomer() throws Exception {
        // Initialize the database
        customerRepository.saveAndFlush(customer);

        int databaseSizeBeforeDelete = customerRepository.findAll().size();

        // Delete the customer
        restCustomerMockMvc.perform(delete("/api/customers/{id}", customer.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Customer> customerList = customerRepository.findAll();
        assertThat(customerList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
