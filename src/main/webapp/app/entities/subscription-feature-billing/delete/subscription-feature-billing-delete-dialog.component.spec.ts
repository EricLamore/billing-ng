jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { SubscriptionFeatureBillingService } from '../service/subscription-feature-billing.service';

import { SubscriptionFeatureBillingDeleteDialogComponent } from './subscription-feature-billing-delete-dialog.component';

describe('Component Tests', () => {
  describe('SubscriptionFeatureBilling Management Delete Component', () => {
    let comp: SubscriptionFeatureBillingDeleteDialogComponent;
    let fixture: ComponentFixture<SubscriptionFeatureBillingDeleteDialogComponent>;
    let service: SubscriptionFeatureBillingService;
    let mockActiveModal: NgbActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [SubscriptionFeatureBillingDeleteDialogComponent],
        providers: [NgbActiveModal],
      })
        .overrideTemplate(SubscriptionFeatureBillingDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SubscriptionFeatureBillingDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(SubscriptionFeatureBillingService);
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
