
export type SubscriptionStatus =  "incomplete" | "incomplete_expired"| "trialing"| "active"| "past_due"| "canceled"| "unpaid"

export interface StripePrice {
        id: string,
        object: string,
        active: boolean,
        created: number,
        currency: string,
        livemode: boolean,
        nickname: null|string,
        product: string,
        recurring: {
            aggregate_usage: null,
            interval: string,
            interval_count: number,
            trial_period_days: null|number,
            usage_type: any
        },
        tax_behavior: any,
        tiers_mode: any,
        transform_quantity: any,
        type: any,
        unit_amount: number,
        unit_amount_decimal: number
}

export interface StripePlan {
    id: string,
    active: boolean,
    amount: number,
    amount_decimal: number,
    created: number,
    currency: string,
    interval: string,
    interval_count: number,
    livemode: boolean,
    metadata: any,
    nickname: null | string,
    product: string,
}

export interface StripeSubscription {
    id: string,
    object: string,
    application: any,
    automatic_tax: {
        enabled: boolean
    },
    billing_cycle_anchor: number,
    billing_thresholds: any,
    cancel_at: number,
    cancel_at_period_end: boolean,
    canceled_at: number,
    cancellation_details: {
        comment: any,
        feedback: any,
        reason: any
    },
    collection_method:string,
    created: number,
    currency: string,
    current_period_end: number,
    current_period_start: number,
    customer: string,
    days_until_due: any,
    default_payment_method: any,
    default_source: any,
    default_tax_rates: any,
    description: null|string,
    ended_at: null|number,
    items: {
        object: string,
        data: [
            {
                id: string,
                object: string,
                created: number,
                metadata: any,
                plan: StripePlan,
                price: StripePrice,
                quantity: number,
                subscription: string,
                tax_rates: any
            }
        ],
        has_more: boolean,
        total_count: number,
        url: string
    },
    latest_invoice: string,
    livemode: boolean,
    metadata: any,
    next_pending_invoice_item_invoice: any,
    on_behalf_of: any,
    pause_collection: any,
    payment_settings: {
        payment_method_options: any,
        payment_method_types: any,
        save_default_payment_method: any
    },
    pending_invoice_item_interval: any,
    pending_setup_intent: any,
    pending_update: any,
    plan: StripePlan,
    quantity: number,
    schedule: any,
    start_date: number,
    status: SubscriptionStatus,
    test_clock: null,
    transfer_data: null,
    trial_end: number,
    trial_settings: {
        end_behavior: {
            missing_payment_method: any
        }
    },
    trial_start: number
}


export interface CustomerStripeInvoice {
    id: string,
    account_country: string,
    account_name: string,
    account_tax_ids: null|string,
    amount_due: number,
    amount_paid: number,
    amount_remaining: number,
    amount_shipping: number,
    application: any,
    application_fee_amount: any,
    attempt_count: number,
    attempted: boolean,
    auto_advance: boolean,
    automatic_tax: {
        enabled: boolean,
        status: any
    },
    billing_reason: string,
    charge: string,
    collection_method: string,
    created: number,
    currency:string,
    custom_fields: any,
    customer: string,
    customer_address: any,
    customer_email: string,
    customer_name: any,
    customer_phone: any,
    customer_shipping: any,
    customer_tax_exempt: string,
    customer_tax_ids: any,
    default_payment_method: any,
    default_source: any,
    default_tax_rates: any,
    description: any,
    discount: any,
    discounts: any,
    due_date: any,
    effective_at: number,
    ending_balance: number,
    footer: any,
    from_invoice: any,
    hosted_invoice_url: string,
    invoice_pdf: string,
    last_finalization_error: any,
    latest_revision: any,
    lines: {
        object: string,
        data: [
            {
                id: string,
                amount: number,
                amount_excluding_tax: number,
                currency: string,
                description: string,
                discount_amounts: any,
                discountable: true,
                discounts: any,
                livemode: false,
                metadata: {},
                period: {
                    end: number,
                    start: number
                },
                plan: StripePlan,
                price: StripePrice,
                proration: false,
                proration_details: {
                    credited_items: any
                },
                quantity: number,
                subscription: string,
                subscription_item: string,
                tax_amounts: any,
                tax_rates: any,
                type: string,
                unit_amount_excluding_tax: string
            }
        ],
        has_more: false,
        total_count: number,
        url: string
    },
    livemode: false,
    metadata: any,
    next_payment_attempt: any,
    number: string,
    on_behalf_of: any,
    paid: true,
    paid_out_of_band: false,
    payment_intent: string,
    payment_settings: {
        default_mandate: any,
        payment_method_options: any,
        payment_method_types: any
    },
    period_end: number,
    period_start: number,
    post_payment_credit_notes_amount: number,
    pre_payment_credit_notes_amount: number,
    quote: any,
    receipt_number: any,
    rendering: any,
    rendering_options: any,
    shipping_cost: any,
    shipping_details: any,
    starting_balance: number,
    statement_descriptor: any,
    status: string,
    status_transitions: {
        finalized_at: number,
        marked_uncollectible_at: any,
        paid_at: number,
        voided_at: any
    },
    subscription: string,
    subscription_details: {
        metadata: any
    },
    subtotal: number,
    subtotal_excluding_tax: number,
    tax: any,
    test_clock: any,
    total: number,
    total_discount_amounts: any,
    total_excluding_tax: number,
    total_tax_amounts: any,
    transfer_data: any,
    webhooks_delivered_at: number
}

export type PaymentType = 'card'
export type StripeCardBrand = 'american axpress'| 'diners club'| 'discover'| 'eftpos australia'|'mastercard'| 'unionpay'| 'visa'| 'unknown'
export interface StripeCard {
    brand: StripeCardBrand,
    checks: {
        address_line1_check: any,
        address_postal_code_check: string,
        cvc_check: string
    },
    country: string,
    exp_month: number,
    exp_year: number,
    fingerprint: string,
    funding: "credit" | any,
    generated_from: any,
    last4: string,
    networks: {
        available: string[],
        preferred: any
    },
    three_d_secure_usage: {
        supported: true
    },
    wallet: any
}
export interface StripePaymentMethod {
    id: string,
    billing_details: {
        address: {
            city: any,
            country: any,
            line1: any,
            line2: any,
            postal_code: string,
            state: any
        },
        email: any,
        name: string,
        phone: any
    },
    card: StripeCard,
    created: number,
    customer: string,
    livemode: false,
    metadata: any,
    type: PaymentType
}

export type Recurring = "month" | "year"

export enum RecurringString {
  yearly = "year",
  monthly = "month"
}

export type Price = {
    interval: Recurring
    price: number
    id?: string;
    currency: string;
    stripe_price_id: string
    group?: string;
}