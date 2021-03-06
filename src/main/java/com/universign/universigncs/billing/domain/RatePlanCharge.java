package com.universign.universigncs.billing.domain;

import java.io.Serializable;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A RatePlanCharge.
 */
@Document(collection = "rate_plan_charge")
public class RatePlanCharge implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("step")
    private Integer step;

    @Field("unit_price")
    private Double unitPrice;

    @Field("discount")
    private Double discount;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public RatePlanCharge id(String id) {
        this.id = id;
        return this;
    }

    public Integer getStep() {
        return this.step;
    }

    public RatePlanCharge step(Integer step) {
        this.step = step;
        return this;
    }

    public void setStep(Integer step) {
        this.step = step;
    }

    public Double getUnitPrice() {
        return this.unitPrice;
    }

    public RatePlanCharge unitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
        return this;
    }

    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Double getDiscount() {
        return this.discount;
    }

    public RatePlanCharge discount(Double discount) {
        this.discount = discount;
        return this;
    }

    public void setDiscount(Double discount) {
        this.discount = discount;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RatePlanCharge)) {
            return false;
        }
        return id != null && id.equals(((RatePlanCharge) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RatePlanCharge{" +
            "id=" + getId() +
            ", step=" + getStep() +
            ", unitPrice=" + getUnitPrice() +
            ", discount=" + getDiscount() +
            "}";
    }
}
