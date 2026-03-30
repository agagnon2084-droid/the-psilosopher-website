-- ============================================================
-- Update Annual Membership Pricing
-- Improves annual discount from ~17% to ~34% to align with
-- market standards and improve conversion on annual plans.
--
-- Old → New (in cents):
--   Essentials:  $99/yr (9900) → $79/yr (7900)
--   Premium:    $249/yr (24900) → $199/yr (19900)
--   Pro:        $499/yr (49900) → $399/yr (39900)
-- ============================================================

UPDATE public.membership_tiers SET price_yearly = 7900,  stripe_price_id_yearly = 'price_1TG3yj5pbKqpMaZKAmwZG6Zv' WHERE slug = 'essentials';
UPDATE public.membership_tiers SET price_yearly = 19900, stripe_price_id_yearly = 'price_1TG3yk5pbKqpMaZKjy4I97Td' WHERE slug = 'premium';
UPDATE public.membership_tiers SET price_yearly = 39900, stripe_price_id_yearly = 'price_1TG3yl5pbKqpMaZKmWWSXlck' WHERE slug = 'pro';
