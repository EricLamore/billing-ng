jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { SubscriptionFeatureBillingService } from '../service/subscription-feature-billing.service';

import { SubscriptionFeatureBillingComponent } from './subscription-feature-billing.component';

describe('Component Tests', () => {
  describe('SubscriptionFeatureBilling Management Component', () => {
    let comp: SubscriptionFeatureBillingComponent;
    let fixture: ComponentFixture<SubscriptionFeatureBillingComponent>;
    let service: SubscriptionFeatureBillingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [SubscriptionFeatureBillingComponent],
        providers: [
          Router,
          {
            provide: ActivatedRoute,
            useValue: {
              data: of({
                defaultSort: 'id,asc',
              }),
              queryParamMap: of(
                jest.requireActual('@angular/router').convertToParamMap({
                  page: '1',
                  size: '1',
                  sort: 'id,desc',
                })
              ),
            },
          },
        ],
      })
        .overrideTemplate(SubscriptionFeatureBillingComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SubscriptionFeatureBillingComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(SubscriptionFeatureBillingService);

      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [{ id: 'ABC' }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.subscriptionFeatures?.[0]).toEqual(jasmine.objectContaining({ id: 'ABC' }));
    });

    it('should load a page', () => {
      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.subscriptionFeatures?.[0]).toEqual(jasmine.objectContaining({ id: 'ABC' }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalledWith(expect.objectContaining({ sort: ['id,desc'] }));
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenLastCalledWith(expect.objectContaining({ sort: ['name,desc', 'id'] }));
    });
  });
});
