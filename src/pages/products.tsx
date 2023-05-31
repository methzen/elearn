import Head from 'next/head';
import Script from 'next/script';
import * as React from 'react';

function PricingPage() {
  // Paste the stripe-pricing-table snippet in your React component
  return (
<>

<Head>
 checkout

<script async src="https://js.stripe.com/v3/pricing-table.js"></script>

</Head>

{/* <stripe-pricing-table pricing-table-id="prctbl_1N0gFULpx5FbhsTKw34HllBS"
publishable-key="pk_test_51N03KWLpx5FbhsTKcTBMwVT9E6OrNjaixT2L0axSdg5Uircuq3XjuuG6nAVhX1duoWMNoJ4fEZ41wuao0lSQJCE300bO55xsrS">
</stripe-pricing-table> */}
</>

  );
}

export default PricingPage;