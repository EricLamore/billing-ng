jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { RatePlanChargeBillingService } from '../service/rate-plan-charge-billing.service';

import { RatePlanChargeBillingDeleteDialogComponent } from './rate-plan-charge-billing-delete-dialog.component';

describe('Component Tests', () => {
  describe('RatePlanChargeBilling Management Delete Component', () => {
    let comp: RatePlanChargeBillingDeleteDialogComponent;
    let fixture: ComponentFixture<RatePlanChargeBillingDeleteDialogComponent>;
    let service: RatePlanChargeBillingService;
    let mockActiveModal: NgbActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [RatePlanChargeBillingDeleteDialogComponent],
        providers: [NgbActiveModal],
      })
        .overrideTemplate(RatePlanChargeBillingDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RatePlanChargeBillingDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(RatePlanChargeBillingService);
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
