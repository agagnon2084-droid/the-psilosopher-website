import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
});

const tiers = [
  { name: 'Essentials', slug: 'essentials', monthlyPrice: 999, yearlyPrice: 9900 },
  { name: 'Premium', slug: 'premium', monthlyPrice: 2499, yearlyPrice: 24900 },
  { name: 'Pro', slug: 'pro', monthlyPrice: 4999, yearlyPrice: 49900 },
];

async function main() {
  console.log('Creating Stripe products and prices...\n');

  for (const tier of tiers) {
    const product = await stripe.products.create({
      name: `The Psilosopher — ${tier.name}`,
      metadata: { slug: tier.slug },
    });

    const monthlyPrice = await stripe.prices.create({
      product: product.id,
      unit_amount: tier.monthlyPrice,
      currency: 'usd',
      recurring: { interval: 'month' },
      metadata: { slug: tier.slug, period: 'monthly' },
    });

    const yearlyPrice = await stripe.prices.create({
      product: product.id,
      unit_amount: tier.yearlyPrice,
      currency: 'usd',
      recurring: { interval: 'year' },
      metadata: { slug: tier.slug, period: 'yearly' },
    });

    console.log(`${tier.name}:`);
    console.log(`  Product: ${product.id}`);
    console.log(`  Monthly: ${monthlyPrice.id} ($${(tier.monthlyPrice / 100).toFixed(2)}/mo)`);
    console.log(`  Yearly:  ${yearlyPrice.id} ($${(tier.yearlyPrice / 100).toFixed(2)}/yr)\n`);
  }

  console.log('--- Run this SQL in Supabase SQL Editor ---\n');

  // Re-fetch to get the IDs (we already have them above but let's list the SQL)
  const prices = await stripe.prices.list({ limit: 100, active: true });

  for (const tier of tiers) {
    const monthly = prices.data.find(
      (p) => p.metadata.slug === tier.slug && p.metadata.period === 'monthly'
    );
    const yearly = prices.data.find(
      (p) => p.metadata.slug === tier.slug && p.metadata.period === 'yearly'
    );

    if (monthly && yearly) {
      console.log(
        `UPDATE public.membership_tiers SET stripe_price_id_monthly = '${monthly.id}', stripe_price_id_yearly = '${yearly.id}' WHERE slug = '${tier.slug}';`
      );
    }
  }

  console.log('\nDone!');
}

main().catch(console.error);
