package com.universign.universigncs.billing.web.rest;

import com.universign.universigncs.billing.domain.InvoiceItem;
import com.universign.universigncs.billing.repository.InvoiceItemRepository;
import com.universign.universigncs.billing.service.InvoiceItemService;
import com.universign.universigncs.billing.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.universign.universigncs.billing.domain.InvoiceItem}.
 */
@RestController
@RequestMapping("/api")
public class InvoiceItemResource {

    private final Logger log = LoggerFactory.getLogger(InvoiceItemResource.class);

    private static final String ENTITY_NAME = "invoiceItem";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InvoiceItemService invoiceItemService;

    private final InvoiceItemRepository invoiceItemRepository;

    public InvoiceItemResource(InvoiceItemService invoiceItemService, InvoiceItemRepository invoiceItemRepository) {
        this.invoiceItemService = invoiceItemService;
        this.invoiceItemRepository = invoiceItemRepository;
    }

    /**
     * {@code POST  /invoice-items} : Create a new invoiceItem.
     *
     * @param invoiceItem the invoiceItem to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new invoiceItem, or with status {@code 400 (Bad Request)} if the invoiceItem has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/invoice-items")
    public ResponseEntity<InvoiceItem> createInvoiceItem(@RequestBody InvoiceItem invoiceItem) throws URISyntaxException {
        log.debug("REST request to save InvoiceItem : {}", invoiceItem);
        if (invoiceItem.getId() != null) {
            throw new BadRequestAlertException("A new invoiceItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InvoiceItem result = invoiceItemService.save(invoiceItem);
        return ResponseEntity
            .created(new URI("/api/invoice-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /invoice-items/:id} : Updates an existing invoiceItem.
     *
     * @param id the id of the invoiceItem to save.
     * @param invoiceItem the invoiceItem to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated invoiceItem,
     * or with status {@code 400 (Bad Request)} if the invoiceItem is not valid,
     * or with status {@code 500 (Internal Server Error)} if the invoiceItem couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/invoice-items/{id}")
    public ResponseEntity<InvoiceItem> updateInvoiceItem(
        @PathVariable(value = "id", required = false) final String id,
        @RequestBody InvoiceItem invoiceItem
    ) throws URISyntaxException {
        log.debug("REST request to update InvoiceItem : {}, {}", id, invoiceItem);
        if (invoiceItem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, invoiceItem.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!invoiceItemRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        InvoiceItem result = invoiceItemService.save(invoiceItem);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, invoiceItem.getId()))
            .body(result);
    }

    /**
     * {@code PATCH  /invoice-items/:id} : Partial updates given fields of an existing invoiceItem, field will ignore if it is null
     *
     * @param id the id of the invoiceItem to save.
     * @param invoiceItem the invoiceItem to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated invoiceItem,
     * or with status {@code 400 (Bad Request)} if the invoiceItem is not valid,
     * or with status {@code 404 (Not Found)} if the invoiceItem is not found,
     * or with status {@code 500 (Internal Server Error)} if the invoiceItem couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/invoice-items/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<InvoiceItem> partialUpdateInvoiceItem(
        @PathVariable(value = "id", required = false) final String id,
        @RequestBody InvoiceItem invoiceItem
    ) throws URISyntaxException {
        log.debug("REST request to partial update InvoiceItem partially : {}, {}", id, invoiceItem);
        if (invoiceItem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, invoiceItem.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!invoiceItemRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<InvoiceItem> result = invoiceItemService.partialUpdate(invoiceItem);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, invoiceItem.getId())
        );
    }

    /**
     * {@code GET  /invoice-items} : get all the invoiceItems.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of invoiceItems in body.
     */
    @GetMapping("/invoice-items")
    public ResponseEntity<List<InvoiceItem>> getAllInvoiceItems(Pageable pageable) {
        log.debug("REST request to get a page of InvoiceItems");
        Page<InvoiceItem> page = invoiceItemService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /invoice-items/:id} : get the "id" invoiceItem.
     *
     * @param id the id of the invoiceItem to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the invoiceItem, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/invoice-items/{id}")
    public ResponseEntity<InvoiceItem> getInvoiceItem(@PathVariable String id) {
        log.debug("REST request to get InvoiceItem : {}", id);
        Optional<InvoiceItem> invoiceItem = invoiceItemService.findOne(id);
        return ResponseUtil.wrapOrNotFound(invoiceItem);
    }

    /**
     * {@code DELETE  /invoice-items/:id} : delete the "id" invoiceItem.
     *
     * @param id the id of the invoiceItem to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/invoice-items/{id}")
    public ResponseEntity<Void> deleteInvoiceItem(@PathVariable String id) {
        log.debug("REST request to delete InvoiceItem : {}", id);
        invoiceItemService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }
}
