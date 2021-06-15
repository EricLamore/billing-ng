jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ProductRatePlanChargeBillingService } from '../service/product-rate-plan-charge-billing.service';

import { ProductRatePlanChargeBillingDeleteDialogComponent } from './product-rate-plan-charge-billing-delete-dialog.component';

describe('Component Tests', () => {
  describe('ProductRatePlanChargeBilling Management Delete Component', () => {
    let comp: ProductRatePlanChargeBillingDeleteDialogComponent;
    let fixture: ComponentFixture<ProductRatePlanChargeBillingDeleteDialogComponent>;
    let service: ProductRatePlanChargeBillingService;
    let mockActiveModal: NgbActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ProductRatePlanChargeBillingDeleteDialogComponent],
        providers: [NgbActiveModal],
      })
        .overrideTemplate(ProductRatePlanChargeBillingDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductRatePlanChargeBillingDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(ProductRatePlanChargeBillingService);
      mockActiveModal = TestBed.inject(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete('ABC');
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith('ABC');
          expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.close).not.toHaveBeenCalled();
        expect(mockActiveModal.dismiss).toHaveBeenCalled();
      });
    });
  });
});
