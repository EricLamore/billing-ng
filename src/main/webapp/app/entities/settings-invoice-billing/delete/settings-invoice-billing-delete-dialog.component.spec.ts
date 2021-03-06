jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { SettingsInvoiceBillingService } from '../service/settings-invoice-billing.service';

import { SettingsInvoiceBillingDeleteDialogComponent } from './settings-invoice-billing-delete-dialog.component';

describe('Component Tests', () => {
  describe('SettingsInvoiceBilling Management Delete Component', () => {
    let comp: SettingsInvoiceBillingDeleteDialogComponent;
    let fixture: ComponentFixture<SettingsInvoiceBillingDeleteDialogComponent>;
    let service: SettingsInvoiceBillingService;
    let mockActiveModal: NgbActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [SettingsInvoiceBillingDeleteDialogComponent],
        providers: [NgbActiveModal],
      })
        .overrideTemplate(SettingsInvoiceBillingDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SettingsInvoiceBillingDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(SettingsInvoiceBillingService);
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
