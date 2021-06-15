import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'customer-billing',
        data: { pageTitle: 'Customers' },
        loadChildren: () => import('./customer-billing/customer-billing.module').then(m => m.CustomerBillingModule),
      },
      {
        path: 'settings-invoice-billing',
        data: { pageTitle: 'SettingsInvoices' },
        loadChildren: () => import('./settings-invoice-billing/settings-invoice-billing.module').then(m => m.SettingsInvoiceBillingModule),
      },
      {
        path: 'settings-invoice-unit-billing',
        data: { pageTitle: 'SettingsInvoiceUnits' },
        loadChildren: () =>
          import('./settings-invoice-unit-billing/settings-invoice-unit-billing.module').then(m => m.SettingsInvoiceUnitBillingModule),
      },
      {
        path: 'person-referer-billing',
        data: { pageTitle: 'PersonReferers' },
        loadChildren: () => import('./person-referer-billing/person-referer-billing.module').then(m => m.PersonRefererBillingModule),
      },
      {
        path: 'payment-method-billing',
        data: { pageTitle: 'PaymentMethods' },
        loadChildren: () => import('./payment-method-billing/payment-method-billing.module').then(m => m.PaymentMethodBillingModule),
      },
      {
        path: 'address-billing',
        data: { pageTitle: 'Addresses' },
        loadChildren: () => import('./address-billing/address-billing.module').then(m => m.AddressBillingModule),
      },
      {
        path: 'invoice-item-billing',
        data: { pageTitle: 'InvoiceItems' },
        loadChildren: () => import('./invoice-item-billing/invoice-item-billing.module').then(m => m.InvoiceItemBillingModule),
      },
      {
        path: 'organization-billing',
        data: { pageTitle: 'Organizations' },
        loadChildren: () => import('./organization-billing/organization-billing.module').then(m => m.OrganizationBillingModule),
      },
      {
        path: 'rate-plan-billing',
        data: { pageTitle: 'RatePlans' },
        loadChildren: () => import('./rate-plan-billing/rate-plan-billing.module').then(m => m.RatePlanBillingModule),
      },
      {
        path: 'product-rate-plan-billing',
        data: { pageTitle: 'ProductRatePlans' },
        loadChildren: () =>
          import('./product-rate-plan-billing/product-rate-plan-billing.module').then(m => m.ProductRatePlanBillingModule),
      },
      {
        path: 'rate-plan-charge-billing',
        data: { pageTitle: 'RatePlanCharges' },
        loadChildren: () => import('./rate-plan-charge-billing/rate-plan-charge-billing.module').then(m => m.RatePlanChargeBillingModule),
      },
      {
        path: 'product-rate-plan-charge-billing',
        data: { pageTitle: 'ProductRatePlanCharges' },
        loadChildren: () =>
          import('./product-rate-plan-charge-billing/product-rate-plan-charge-billing.module').then(
            m => m.ProductRatePlanChargeBillingModule
          ),
      },
      {
        path: 'feature-billing',
        data: { pageTitle: 'Features' },
        loadChildren: () => import('./feature-billing/feature-billing.module').then(m => m.FeatureBillingModule),
      },
      {
        path: 'subscription-feature-billing',
        data: { pageTitle: 'SubscriptionFeatures' },
        loadChildren: () =>
          import('./subscription-feature-billing/subscription-feature-billing.module').then(m => m.SubscriptionFeatureBillingModule),
      },
      {
        path: 'product-billing',
        data: { pageTitle: 'Products' },
        loadChildren: () => import('./product-billing/product-billing.module').then(m => m.ProductBillingModule),
      },
      {
        path: 'product-setting-billing',
        data: { pageTitle: 'ProductSettings' },
        loadChildren: () => import('./product-setting-billing/product-setting-billing.module').then(m => m.ProductSettingBillingModule),
      },
      {
        path: 'refund-billing',
        data: { pageTitle: 'Refunds' },
        loadChildren: () => import('./refund-billing/refund-billing.module').then(m => m.RefundBillingModule),
      },
      {
        path: 'consumption-billing',
        data: { pageTitle: 'Consumptions' },
        loadChildren: () => import('./consumption-billing/consumption-billing.module').then(m => m.ConsumptionBillingModule),
      },
      {
        path: 'invoice-billing',
        data: { pageTitle: 'Invoices' },
        loadChildren: () => import('./invoice-billing/invoice-billing.module').then(m => m.InvoiceBillingModule),
      },
      {
        path: 'subscription-tmp-billing',
        data: { pageTitle: 'SubscriptionTmps' },
        loadChildren: () => import('./subscription-tmp-billing/subscription-tmp-billing.module').then(m => m.SubscriptionTmpBillingModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
