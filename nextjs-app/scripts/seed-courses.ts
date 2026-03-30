/**
 * Seed script for courses and lessons.
 * Run: npx tsx scripts/seed-courses.ts
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Parse .env.local manually (no dotenv dependency)
const envPath = resolve(__dirname, '../.env.local');
const envContent = readFileSync(envPath, 'utf-8');
for (const line of envContent.split('\n')) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seed() {
  console.log('Seeding courses and lessons...');

  // Add content column if it doesn't exist
  const { error: migrationError } = await supabase.rpc('exec_sql', {
    sql: 'ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS content text;',
  });
  if (migrationError) {
    console.log('Note: Could not run migration via RPC. Run this SQL manually in the Supabase SQL Editor:');
    console.log('  ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS content text;');
    console.log('Then re-run this script.\n');
  }

  // Get tier IDs
  const { data: tiers } = await supabase
    .from('membership_tiers')
    .select('id, slug')
    .order('sort_order');

  const tierMap = new Map((tiers ?? []).map((t: { id: string; slug: string }) => [t.slug, t.id]));

  // ─────────────────────────────────────────────────────────────
  // Course 1: Microdosing Fundamentals (Essentials tier)
  // ─────────────────────────────────────────────────────────────
  const { data: course1, error: c1err } = await supabase
    .from('courses')
    .upsert(
      {
        title: 'Microdosing Fundamentals',
        slug: 'microdosing-fundamentals',
        description:
          'An evidence-based introduction to microdosing practice. Learn the neuroscience, protocols, safety considerations, and how to integrate microdosing into a broader wellness practice.',
        tier_id: tierMap.get('essentials') ?? null,
        is_published: true,
        sort_order: 0,
      },
      { onConflict: 'slug' }
    )
    .select()
    .single();

  if (c1err) {
    console.error('Error creating course 1:', c1err);
    return;
  }

  console.log('Created course:', course1.title);

  // Course 1 lessons
  const c1Lessons = [
    {
      title: 'Module 1: The Science of Small Doses',
      slug: 'the-science-of-small-doses',
      description:
        'What microdosing is, how it works in the brain, what the research shows, and the current landscape.',
      is_free_preview: true,
      sort_order: 0,
      is_published: true,
      duration_seconds: 5400,
      content: `Lesson 1.1: What Is Microdosing?

Let us start with the most basic question. What are we actually talking about when we say microdosing?

A microdose is a sub-perceptual dose of a psychedelic substance. Sub-perceptual is the key word here. It means you should not feel high. You should not see trails or patterns. You should not have any noticeable alteration in your perception. If you are feeling significantly different, the dose is too high. That is not a microdose. That is a low dose, and it is a very different thing.

The typical microdose of psilocybin (the active compound in psychedelic mushrooms) falls between 0.05 and 0.3 grams of dried mushroom material. For context, a full psychedelic dose is usually between 2 and 5 grams. So we are talking about roughly one-tenth to one-twentieth of what would produce a noticeable psychedelic experience.

The idea is not to trip. The idea is to gently nudge your brain chemistry in ways that might improve mood, creativity, focus, or emotional resilience over time. Think of it less like flipping a switch and more like adjusting a thermostat by half a degree.

A Brief History

Microdosing entered the mainstream conversation around 2011 when Dr. James Fadiman published The Psychedelic Explorer's Guide. In that book, he described a protocol he had been refining for years and shared anecdotal reports from people who had been quietly microdosing for decades.

But the practice goes back much further. Indigenous communities in Mesoamerica have used sub-ceremonial doses of psilocybin mushrooms for generations. The Mazatec people of Oaxaca, Mexico, in particular, have a long tradition of using mushrooms at varying dose levels for different purposes. What we call microdosing is not new. We are just now starting to study it with modern tools.

The 2010s saw an explosion of interest, partly driven by media coverage of tech workers in Silicon Valley using microdoses to boost productivity and creativity. While those stories made for great headlines, they also created some misconceptions that we will need to unpack.

What Microdosing Is Not

Before we go further, let me be clear about a few things:

It is not a performance-enhancing drug. Despite the Silicon Valley narrative, microdosing is not a productivity hack. Some people report improved focus, but that is not the primary purpose, and the evidence for cognitive enhancement is mixed at best.

It is not a cure for anything. Research into psilocybin for depression, anxiety, and PTSD is promising, but those studies use full doses in clinical settings with professional support. Microdosing is a different practice entirely, and the evidence base is much smaller.

It is not risk-free. We will cover safety in detail in Module 3, but please know from the outset that there are real considerations, including drug interactions, contraindications, and legal risks.

It is not for everyone. Some people try microdosing and notice nothing. Some find it uncomfortable. Some have medical or psychological conditions that make it inadvisable. That is all okay. The goal of this course is to help you make an informed decision, not to convince you to try it.

---

Lesson 1.2: The Neuroscience

Now let us talk about what is happening in your brain. This is where it gets fascinating.

The Serotonin System

Psilocybin works primarily through the serotonin system. When you ingest psilocybin, your body converts it into psilocin, which binds to serotonin receptors in the brain, particularly the 5-HT2A receptor.

Serotonin is one of your brain's key neurotransmitters. It is involved in mood regulation, sleep, appetite, and cognition. The 5-HT2A receptor, specifically, plays a role in perception, cognition, and mood. When psilocin binds to these receptors, it changes the way different brain regions communicate with each other.

At full doses, this produces the well-known psychedelic experience: altered perception, emotional intensity, a sense of connection or unity. At microdoses, the effects are much more subtle. The receptor activation is gentler, and the downstream effects are more like a whisper than a shout.

The Default Mode Network

One of the most important discoveries in psychedelic neuroscience involves something called the Default Mode Network, or DMN. This is a network of brain regions that is most active when you are not focused on the outside world. When you are daydreaming, ruminating about the past, worrying about the future, or thinking about yourself, your DMN is firing away.

In people with depression, the DMN tends to be overactive. It gets stuck in repetitive loops: the same worries, the same self-critical thoughts, the same ruminations, over and over. Think of it like a river that has carved deep grooves into the landscape. The water (your thoughts) just keeps flowing through the same channels.

Psychedelics, even at microdoses, appear to reduce DMN activity. They quiet the mental chatter. At full doses, this is what creates the ego dissolution experience that people describe. At microdoses, the effect is much more subtle. People often describe it as a slight loosening. The mental grooves are still there, but the water is not flowing through them quite as automatically.

Robin Carhart-Harris at Imperial College London has described this as the brain becoming more entropic, meaning more flexible, less locked into rigid patterns. At microdose levels, this might manifest as slightly more creative thinking, a bit more emotional flexibility, or a gentle shift in perspective on a problem that has been stuck.

Neuroplasticity

Here is where it gets really interesting. Research published in the journal Neuron in 2018 showed that psychedelics, including psilocybin, promote the growth of new neural connections. This process is called neuroplasticity, and it is essentially your brain's ability to rewire itself.

The researchers found that a single dose of a psychedelic compound increased the number and density of dendritic spines (the tiny protrusions on neurons that form connections with other neurons) in the prefrontal cortex of rats. These changes were visible within 24 hours and persisted for at least a month.

This is significant because the prefrontal cortex is involved in executive function, decision-making, and emotional regulation. And in conditions like depression, this brain region often shows reduced connectivity and dendritic spine density.

Now, most of this research has been done with full doses, and we need to be honest about that. The evidence for microdoses specifically promoting neuroplasticity is still emerging. But there is reason to believe that even sub-perceptual doses may have some neuroplastic effects, particularly when combined with other plasticity-promoting activities like exercise, learning, and meditation. We will talk more about this in Module 4.

---

Lesson 1.3: What the Research Shows

Let us look at the actual evidence. And I want to be upfront: the research on microdosing specifically is still in its early stages. Most of the landmark psychedelic studies have used full doses in clinical settings. The microdosing research is catching up, but it is not there yet.

The Promising Findings

The Beckley Foundation Study (2019): One of the first rigorous studies of microdosing, this research found that people who microdosed reported improvements in mood, focus, and creativity compared to non-microdosers. However, the study was observational, not a controlled trial, which means we cannot rule out placebo effects.

The Imperial College Study (2021): Researchers conducted one of the largest controlled studies on microdosing, involving over 190 participants. They found that microdosers showed improvements in psychological well-being and emotional stability. But here is the catch: the placebo group also improved. The differences between the microdosing group and the placebo group were small.

The RAND Corporation Survey (2025): A comprehensive national survey found that approximately 8.4 million Americans reported having microdosed at least once. This tells us the practice is far more widespread than previously understood, though it does not speak to efficacy.

University of Chicago Study (2023): A double-blind, placebo-controlled study that found microdoses of psilocybin produced subtle but measurable changes in emotional processing and time perception, even at sub-perceptual doses. This was important because it suggested that something real is happening biologically, even if people cannot feel it consciously.

The Honest Caveats

I would be doing you a disservice if I only shared the positive findings. Here is what the research also shows:

The placebo effect is powerful. Multiple studies have found that people who think they are microdosing report benefits whether they received the actual substance or a placebo. This does not mean microdosing does not work. It means we need to be humble about how much of the reported benefit is pharmacological versus psychological.

Individual variation is huge. Some people report significant benefits. Some notice nothing. Some find it unpleasant. There is no one-size-fits-all response to microdosing, and the research reflects this variability.

Long-term effects are unknown. We do not have data on what happens when people microdose regularly for years. The safety profile of occasional use appears favorable, but long-term regular use has not been studied adequately.

The doses are not standardized. Different studies use different substances, different doses, and different protocols. This makes it hard to compare results across studies.

Key Takeaway

Microdosing is not snake oil, but it is not a miracle either. The early research is intriguing, but we are still in the early chapters of understanding what microdosing can and cannot do.

Approach the practice with curiosity and skepticism in equal measure. That is the scientific mindset, and it will serve you well here.

---

Lesson 1.4: The Current Landscape

As of early 2026, the psychedelic landscape is shifting rapidly. Here are the key developments that provide context for microdosing:

Compass Pathways Phase 3 Results: Compass Pathways has released promising Phase 3 clinical trial data for psilocybin therapy in treatment-resistant depression. While these trials use full doses in supervised clinical settings (not microdosing), they are paving the road toward potential FDA approval. If psilocybin becomes an FDA-approved medicine, it will fundamentally change the conversation about access and legitimacy.

State Legalization: Oregon, Colorado, and now New Mexico have created legal frameworks for psychedelic use. These vary significantly in structure. Oregon has a supervised-use model. Colorado allows personal possession and regulated healing centers. New Mexico is the newest addition. These developments mean that for some people, legal access to psilocybin is now a reality.

Growing Mainstream Acceptance: The RAND survey showing 8.4 million Americans have microdosed reflects a dramatic shift in public perception. Psychedelics have moved from counterculture to mainstream wellness conversation. This brings both opportunities (more research funding, reduced stigma) and risks (hype outpacing evidence, unqualified people offering guidance).

Understanding this landscape helps you make informed decisions about if, when, and how you might approach microdosing.

---

Module 1 Reflection

Take a Moment

Before moving on to Module 2, take a few minutes to reflect on what resonated with you in this module. Consider these questions:

What surprised you about the neuroscience of microdosing?

How does your understanding of microdosing differ from what you believed before?

What questions do you still have that you hope will be answered in later modules?

On a scale of 1 to 10, how confident do you feel in your understanding of the basic science?

Write your reflections in a journal or the notes section of The Psilosopher community forum.`,
    },
    {
      title: 'Module 2: Protocols and Practice',
      slug: 'protocols-and-practice',
      description:
        'The major microdosing protocols, finding your dose, and tracking your experience systematically.',
      is_free_preview: false,
      sort_order: 1,
      is_published: true,
      duration_seconds: 5400,
      content: `Lesson 2.1: The Major Protocols

Now that you understand the science, let us get practical. When people microdose, they do not just take a small amount every day. There are structured protocols, schedules that dictate when you dose and when you rest. The rest days are just as important as the dose days, and each protocol has a different rationale behind its schedule.

The Fadiman Protocol

Developed by Dr. James Fadiman, this is the most well-known and widely used microdosing protocol. The schedule is simple: one day on, two days off.

Day 1: Microdose day. Take your dose in the morning, ideally before 10am.

Day 2: Transition day. No dose. Many people report still feeling subtle effects or an afterglow.

Day 3: Normal day. No dose. This is your baseline day. Pay attention to how you feel without any influence.

Day 4: Dose day again. The cycle repeats.

Fadiman recommends following this cycle for 4 to 8 weeks, then taking a break of 2 to 4 weeks. The rest days serve two purposes: they prevent tolerance buildup (your body adapts to psilocybin quickly, so daily dosing would lose effectiveness within a week), and they give you contrast. You need non-dose days to actually notice whether the dose days are doing anything.

This protocol is a great starting point if you are new to microdosing. It is well-documented, widely used, and gives you plenty of rest days to observe and compare.

The Stamets Protocol

Developed by mycologist Paul Stamets, this protocol takes a different approach. The schedule is: four days on, three days off.

Stamets also recommends stacking the microdose with two other compounds: lion's mane mushroom (a non-psychedelic functional mushroom associated with nerve growth factor production) and niacin (vitamin B3, which causes a flushing sensation and may help distribute compounds to the peripheral nervous system).

The theory behind the Stamets Stack is that psilocybin creates new neural connections, lion's mane supports their growth and maintenance, and niacin helps deliver these compounds throughout the body. It is an elegant hypothesis, though it should be noted that the scientific evidence for this specific combination is largely theoretical at this point.

This protocol is more aggressive than Fadiman's (more dose days per week) and may be worth exploring after you have experience with the more conservative Fadiman approach.

The Intuitive Protocol

Some experienced microdosers eventually move to what might be called an intuitive approach. Rather than following a fixed schedule, they dose when they feel it would be beneficial. Maybe that is once a week, maybe twice, maybe less.

I want to be honest: this approach requires significant self-awareness and discipline. The risk is that it can slide into daily use (which builds tolerance and may have unknown long-term effects) or become a crutch for avoiding difficult emotions. If you are considering an intuitive approach, I would strongly recommend having at least 2 to 3 months of experience with a structured protocol first. You need a baseline understanding of how microdosing affects you before you can trust your intuition about when to use it.

---

Lesson 2.2: Finding Your Dose

This is one of the most common questions, and unfortunately, the answer is not a single number. Your optimal microdose depends on your body weight, metabolism, sensitivity, the specific mushroom species, and how those mushrooms were prepared and stored.

That said, here are general ranges that most practitioners and researchers reference:

Threshold: 0.05 - 0.1g — Barely noticeable, if at all

Low Micro: 0.1 - 0.15g — Subtle mood lift, slight energy

Standard Micro: 0.15 - 0.25g — Most commonly reported sweet spot

High Micro: 0.25 - 0.35g — Approaching perceptual. Caution.

The golden rule: start low. Begin at 0.05 to 0.1 grams on your first dose day. If you feel nothing after three cycles at that level, increase by 0.025 to 0.05 grams. Continue this slow titration until you find your sweet spot. The right dose is the one where you might notice a slight improvement in mood or focus but could also completely forget you took anything.

If you notice any perceptual changes, visual shifts, or feel high in any way, you have gone too far. Reduce your dose next time.

---

Lesson 2.3: Tracking Your Experience

One of the biggest mistakes people make with microdosing is not tracking their experience systematically. Without a journal, you are relying on memory and confirmation bias, and those are not reliable tools for understanding something as subtle as a microdose.

Here is what I recommend tracking:

Daily Rating (1-10): Rate your overall mood, energy, focus, creativity, and anxiety level each day. Do this whether it is a dose day or not. The non-dose days are your control group.

Sleep Quality: Note when you went to bed, when you woke up, and rate your sleep quality. Microdosing can sometimes affect sleep, especially if dosed too late in the day.

Physical Sensations: Any changes in appetite, energy levels, physical comfort or discomfort, headaches, or stomach issues.

Notable Moments: Did you have a particularly creative idea? A conversation that felt different? A reaction to stress that surprised you? These qualitative notes are often more valuable than the numbers.

External Factors: Exercise, diet, caffeine, alcohol, stress levels, menstrual cycle. All of these affect how you feel and can confound your microdosing observations if you do not account for them.

Pro Tip

Set a daily alarm for your tracking. Most people find that a brief end-of-day check-in (5 minutes before bed) works best. If you try to track in real-time, you end up over-analyzing every sensation.

Use whatever format works for you: a physical notebook, a spreadsheet, or the tracking templates in your Essentials membership.

---

Module 2 Reflection

Take a Moment

Which protocol resonates most with you, and why?

What dose range would you start with based on what you learned?

How will you set up your tracking system? What tools will you use?

What external factors in your life might affect your observations?

Write your thoughts in your integration journal.`,
    },
    {
      title: 'Module 3: Safety and Considerations',
      slug: 'safety-and-considerations',
      description:
        'Contraindications, medication interactions, legal realities, and harm reduction principles.',
      is_free_preview: false,
      sort_order: 2,
      is_published: true,
      duration_seconds: 5400,
      content: `Lesson 3.1: Contraindications

This is the module that might not be as exciting as the neuroscience, but it is arguably the most important one in this entire course. Safety is not optional. It is the foundation that everything else sits on.

There are certain conditions and medications that make microdosing inadvisable or potentially dangerous. Please take this section seriously.

Medication Interactions

SSRIs and SNRIs: If you are taking selective serotonin reuptake inhibitors (like Zoloft, Prozac, Lexapro, or Paxil) or serotonin-norepinephrine reuptake inhibitors (like Effexor or Cymbalta), psilocybin will compete for the same receptor sites. At minimum, the microdose may be less effective. At worst, there is a theoretical risk of serotonin syndrome, a potentially dangerous condition caused by too much serotonin activity. Never stop your medication to microdose. That is a decision to make with your prescribing doctor, not alone.

MAOIs: Monoamine oxidase inhibitors are a class of antidepressants that can have serious interactions with psilocybin. The combination can dangerously increase serotonin levels. This is a hard no.

Lithium: There are anecdotal reports (and some clinical concern) about dangerous interactions between lithium and psychedelics, including seizure risk. If you take lithium, microdosing is not safe for you.

Stimulants: ADHD medications like Adderall or Ritalin have not been well-studied in combination with psilocybin. Exercise caution and consult your doctor.

Mental Health Considerations

Psychotic disorders: If you have a personal or family history of schizophrenia, schizoaffective disorder, or other psychotic disorders, psychedelics of any dose are strongly contraindicated. Psilocybin can trigger or exacerbate psychotic episodes.

Bipolar disorder: There is concern that psychedelics may trigger manic episodes in people with bipolar disorder. This applies to microdoses as well. If you have bipolar disorder, please consult with your psychiatrist before considering microdosing.

Active crisis: If you are currently experiencing suicidal thoughts, severe anxiety, or acute psychological distress, microdosing is not the appropriate intervention. Please seek professional support first. Microdosing is a wellness practice, not an emergency measure.

Pregnancy and nursing: There is essentially no research on the effects of psilocybin on fetal development or breast milk. In the absence of safety data, the responsible position is to avoid microdosing during pregnancy and while nursing.

---

Lesson 3.2: Legal Realities

I am not a lawyer, and this is not legal advice. But you need to understand the legal landscape.

As of March 2026, psilocybin remains a Schedule I controlled substance under United States federal law. This means it is technically illegal to possess, cultivate, or distribute in any quantity, including microdose quantities. Federal law does not distinguish between a microdose and a recreational amount.

However, the state-level picture is changing rapidly:

Oregon: Legalized supervised psilocybin therapy in 2020 (Measure 109). You can legally access psilocybin at licensed service centers with a trained facilitator. Personal possession remains illegal.

Colorado: Passed Proposition 122 in 2022, decriminalizing personal possession and use for adults 21+ and creating a framework for regulated healing centers.

New Mexico: The newest addition to the legalization map. The specific framework is still being implemented, so check current regulations.

Many other cities and jurisdictions have deprioritized enforcement of psilocybin possession, including Denver, Oakland, Seattle, and others. Deprioritization is not the same as legalization. It means law enforcement has been directed to make psilocybin possession their lowest enforcement priority, but technically, you could still be charged.

If you live outside these jurisdictions, understand that possession of any amount of psilocybin is a criminal offense. I share this not to scare you, but because informed consent requires knowing the risks, including legal ones.

---

Lesson 3.3: Harm Reduction Principles

Harm reduction is a public health approach that acknowledges people will make their own choices and focuses on minimizing potential negative outcomes. Here are the core principles applied to microdosing:

Know your source. If you are obtaining mushrooms outside of a legal framework, quality and consistency are major concerns. Different species have different potency levels. Different parts of the mushroom (caps vs. stems) have different concentrations. Improperly identified mushrooms can be dangerous. This is not an area where you want to cut corners.

Test when possible. Reagent testing kits can confirm the presence of psilocybin and rule out some adulterants. They are not perfect, but they add a layer of safety.

Start low, go slow. I have said this before, but it bears repeating. You can always take more on the next cycle. You cannot un-take a dose that was too high.

Keep your environment stable. Do not start microdosing during a period of major life upheaval, a new job, a breakup, or a move. Give yourself a stable baseline so you can actually observe the effects.

Have a support person. Ideally, have at least one person in your life who knows you are microdosing. This person can offer objective observations about changes in your behavior and be there if you need support.

Know when to stop. If you experience increased anxiety, mood instability, sleep disruption, or any symptom that concerns you, stop. You can always try again later with a different approach. Pushing through discomfort is not courage. It is ignoring information your body is giving you.

---

Module 3 Reflection

Take a Moment

Do any of the contraindications apply to you? Be honest with yourself.

What is the legal status of psilocybin in your jurisdiction?

Who in your life could serve as your support person?

What would your personal stop criteria be? What symptoms would signal you to pause?

These are important questions. Please do not skip them.`,
    },
    {
      title: 'Module 4: Integration and Daily Life',
      slug: 'integration-and-daily-life',
      description:
        'Building a practice, pairing with meditation and exercise, navigating social life, and the long game.',
      is_free_preview: false,
      sort_order: 3,
      is_published: true,
      duration_seconds: 5400,
      content: `Lesson 4.1: Building a Practice, Not a Habit

There is an important distinction between a practice and a habit. A habit is something you do automatically, without much thought. A practice is something you engage with intentionally, with awareness and purpose.

Microdosing should be a practice, not a habit. The moment it becomes something you do on autopilot, something you would feel anxious about missing, something you rely on to get through the day, it has shifted from practice to dependence. And while psilocybin is not considered physically addictive, psychological dependence on any coping tool is worth taking seriously.

A healthy microdosing practice has these characteristics: it is time-bounded (you have a planned start and end date for each cycle), it is purposeful (you have a clear intention for each cycle), it includes rest (both the off-days within the protocol and longer breaks between cycles), and it is reflective (you are regularly assessing whether it is serving you).

---

Lesson 4.2: Pairing with Other Practices

Microdosing does not exist in a vacuum. The research on neuroplasticity suggests that the brain changes promoted by psilocybin may be most valuable when paired with activities that take advantage of that increased flexibility. Think of microdosing as opening a window. What matters is what you do while the window is open.

Meditation

The combination of microdosing and meditation is one of the most commonly reported positive pairings. This makes intuitive sense. If microdosing quiets the Default Mode Network and increases mental flexibility, meditation gives you a framework for observing and working with that mental space.

You do not need to be an experienced meditator. Even 10 to 15 minutes of simple breath awareness on your dose days can create a valuable container for observation. Sit quietly, focus on your breathing, and notice what arises without judgment.

Over time, many people find that the combination deepens both practices. The microdose makes the meditation more accessible, and the meditation makes the microdose more productive.

Exercise

Exercise is one of the most potent neuroplasticity-promoting activities available to us, and the evidence for this is robust. Aerobic exercise in particular increases BDNF (brain-derived neurotrophic factor), the same growth factor that psilocybin appears to influence.

The combination of microdosing and exercise creates a potential synergy: both promote neuroplasticity through overlapping but distinct mechanisms. Many microdosers report that exercise on dose days feels more engaging, more embodied, and more enjoyable.

Running, cycling, swimming, yoga, or any movement you enjoy can work. The key is consistency. A 30-minute session on dose days, done regularly over weeks, is more valuable than an intense workout once a month.

Journaling

We talked about tracking in Module 2, but journaling goes beyond data collection. Reflective journaling, writing about your thoughts, feelings, and experiences in an open-ended way, is an integration practice in itself.

On dose days, you might notice that your writing is slightly different. More fluid, more associative, more honest. These shifts can be subtle, but over time, they reveal patterns and insights that you might miss otherwise.

Some prompts to try on dose days: What am I noticing right now that I usually overlook? What assumption am I carrying that might not be true? What would I do if I were not afraid? What does my body want to tell me today?

---

Lesson 4.3: Navigating Social and Professional Life

One of the practical realities of microdosing that does not get discussed enough is the social dimension. Depending on where you live and what you do for work, microdosing may carry stigma or legal risk.

Here is my honest advice: be selective about who you tell. Not because there is anything wrong with what you are doing, but because not everyone will understand, and you do not owe anyone an explanation about your personal wellness practices.

For your close circle, the people you trust, sharing can be valuable. Having someone who can offer objective observations about your behavior is genuinely useful. But your coworkers, your extended family, your casual acquaintances? They do not need to know, and telling them may create unnecessary complications.

As for work performance: if your microdose is truly sub-perceptual, it should not noticeably affect your work behavior. If you find yourself impaired in any way, your dose is too high. Full stop. No one should be able to tell you are microdosing from your behavior. If they can, something needs to change.

---

Lesson 4.4: The Long Game

Most people do not microdose forever. And that is by design. The goal is not to create a lifelong dependency on a substance but to catalyze changes that eventually become self-sustaining.

Think of it this way: if microdosing helps you establish a meditation practice, develop better emotional awareness, build healthier habits, and shift some stuck patterns, then the microdosing has done its job. The practices and insights it helped establish should continue to benefit you long after you stop dosing.

Many experienced practitioners describe microdosing as training wheels for a more conscious life. At some point, you do not need them anymore. And when you reach that point, taking the training wheels off is not a loss. It is a graduation.

I recommend planning your microdosing in cycles: 4 to 8 weeks on, followed by 2 to 4 weeks completely off. During the off weeks, notice what sticks. What habits persist? What mental shifts remain? What reverts to old patterns? This information is incredibly valuable for understanding what microdosing is actually doing for you versus what you are doing for yourself.

---

Module 4 Reflection

Take a Moment

What practices do you want to pair with microdosing? (meditation, exercise, journaling, etc.)

Who will you share your microdosing journey with?

What does your ideal first cycle look like? What protocol, dose, and duration?

What will you use as your success criteria? How will you know if it is working?

What would graduation look like for you?`,
    },
  ];

  for (const lesson of c1Lessons) {
    const { error } = await supabase
      .from('lessons')
      .upsert({ ...lesson, course_id: course1.id }, { onConflict: 'course_id,slug' });
    if (error) console.error('Error creating lesson:', lesson.title, error);
    else console.log('  + Lesson:', lesson.title);
  }

  // ─────────────────────────────────────────────────────────────
  // Course 2: Integration Mastery (Premium tier)
  // ─────────────────────────────────────────────────────────────
  const { data: course2, error: c2err } = await supabase
    .from('courses')
    .upsert(
      {
        title: 'Integration Mastery',
        slug: 'integration-mastery',
        description:
          'Practical frameworks for making meaning from psychedelic experiences. A comprehensive guide to journaling, somatic practices, working with difficult experiences, and building a lasting daily practice.',
        tier_id: tierMap.get('premium') ?? null,
        is_published: true,
        sort_order: 1,
      },
      { onConflict: 'slug' }
    )
    .select()
    .single();

  if (c2err) {
    console.error('Error creating course 2:', c2err);
    return;
  }

  console.log('Created course:', course2.title);

  const c2Lessons = [
    {
      title: 'Module 1: What Integration Actually Means',
      slug: 'what-integration-actually-means',
      description:
        'Defining integration, the 72-hour neuroplasticity window, and the five most common integration mistakes.',
      is_free_preview: true,
      sort_order: 0,
      is_published: true,
      duration_seconds: 5400,
      content: `Lesson 1.1: Defining Integration

Let me start by telling you what integration is not, because there is a lot of confusion out there.

Integration is not just thinking about your experience. It is not posting about it on social media. It is not reading articles about psychedelics. It is not telling the story of your journey to friends over and over. All of those things can be part of processing, but they are not integration.

Integration is the deliberate practice of translating psychedelic insights into lasting changes in your thoughts, behaviors, relationships, and way of being in the world.

Read that again. Deliberate. Practice. Lasting changes.

A psychedelic experience might show you that you have been carrying anger toward your father for twenty years. That is an insight. Integration is what happens when you actually do something with that insight. Maybe that means starting therapy. Maybe it means writing a letter. Maybe it means changing how you interact with him. Maybe it means grieving what you lost. The insight without action is just information. Integration is where information becomes transformation.

The River Metaphor

I find it helpful to think of your habitual thought patterns as rivers that have carved deep channels through a landscape over years. The water flows through the same channels day after day, year after year. These channels are your default ways of thinking, feeling, and responding to the world.

A psychedelic experience is like a massive rainstorm. Suddenly, there is so much water that it overflows the banks. It finds new paths. It carves new channels. For a few hours, the landscape looks completely different.

But here is the thing: when the storm passes, the water will naturally settle back into the old channels. Those deep grooves are still there. They have been carved over decades. One rainstorm, no matter how powerful, does not permanently reroute a river.

Integration is the work of reinforcing those new channels while the ground is still soft. It is deliberately directing the water down the new paths, again and again, until they become deep enough to sustain flow on their own. If you do nothing, the old channels win. They always do. That is not a failure. That is just how brains work.

---

Lesson 1.2: The 72-Hour Window

Research on psychedelics and neuroplasticity tells us something important: after a significant psychedelic experience, there is a window of heightened brain plasticity that lasts roughly 24 to 72 hours. During this period, your brain is more receptive to forming new connections and patterns than usual.

This is not metaphorical. Studies using brain imaging have shown increased dendritic spine density, new neural connections forming in the prefrontal cortex, within hours of a psychedelic experience. These new connections are fragile at first. They need reinforcement to become permanent.

What you do during this 72-hour window matters enormously. This is when integration practices have the most impact. The new neural pathways are like wet concrete. They are moldable now but will harden into whatever shape they are in within a few days.

This does not mean you need to figure everything out in 72 hours. It means the actions you take during this window, journaling, meditation, gentle movement, conversation with a trusted person, these actions have an outsized effect on whether the insights stick.

What to avoid during the 72-hour window: rushing back to your normal routine, numbing out with alcohol or excessive screen time, making major life decisions (the clarity you feel may be real, but give it time before acting on big choices), telling everyone about your experience (choose your audience carefully), and self-judgment about what you did or did not experience.

---

Lesson 1.3: Common Integration Mistakes

After working with hundreds of people in various capacities, I have seen the same mistakes come up again and again. Knowing what they are can help you avoid them.

Mistake 1: The Spiritual Bypass. This is when someone uses spiritual or psychedelic insights to avoid dealing with difficult emotions. It sounds like: I have transcended my anger. I have let go of my grief. I do not need to process that anymore because I saw that everything is love. Transcendence is real, and so is the unresolved human stuff underneath it. Integration means honoring both, not using one to avoid the other.

Mistake 2: The Insight Collector. Some people become addicted to the insights themselves. They chase experience after experience, collecting profound realizations like stamps, without ever doing the messy, unglamorous work of applying them. If your journal is full of revelations but your daily life has not changed, you might be collecting rather than integrating.

Mistake 3: The Immediate Overhaul. You come back from a powerful experience and want to quit your job, end your relationship, move to Costa Rica, and become a shaman. The impulse is understandable. The experience showed you how much of your life is not aligned with your deeper values. But integration is not demolition. It is renovation. Make changes deliberately, one at a time, with time between each one to assess the impact.

Mistake 4: The Isolation Trap. Psychedelic experiences can feel so personal, so beyond language, that you withdraw from people who have not had similar experiences. You start to feel like nobody understands. This isolation actually undermines integration, because relationships are one of the primary arenas where integration happens. You need other people to test your insights against reality.

Mistake 5: Doing Nothing. The most common mistake of all. You have the experience. You feel changed. You go back to your routine. A week passes. A month passes. The insights fade like a dream you did not write down. The experience becomes a nice memory instead of a turning point. This course exists specifically to prevent this outcome.

---

Module 1 Reflection

Take a Moment

Think about a past psychedelic experience (or any significant experience). What insights did it offer you?

How many of those insights translated into lasting changes? How many faded?

Which of the five mistakes resonates most with your own patterns?

If you are within the 72-hour window right now, what is one small action you can take today to reinforce a new pattern?

Write your reflections before moving on.`,
    },
    {
      title: 'Module 2: Journaling as Medicine',
      slug: 'journaling-as-medicine',
      description:
        'Why journaling works for integration, the Three-Layer Framework, and advanced journaling techniques.',
      is_free_preview: false,
      sort_order: 1,
      is_published: true,
      duration_seconds: 5400,
      content: `Lesson 2.1: Why Journaling Works

Journaling is the single most effective integration tool I know. That is a strong claim, and I stand by it. Here is why.

Psychedelic experiences often operate at a level below language. You feel things. You see things. You know things. But when someone asks you what happened, words feel inadequate. The experience was bigger than language.

And that is exactly why writing about it matters. The act of translating a pre-verbal experience into words is not just documentation. It is processing. When you force yourself to put something into language, you are engaging your prefrontal cortex, your narrative brain, and asking it to make sense of material that originally bypassed it.

Neuroscience supports this. Research by James Pennebaker at the University of Texas has shown that expressive writing, writing about emotional experiences in a specific way, produces measurable improvements in physical health, immune function, and psychological well-being. The effect is not just about venting. It is about creating coherence. Your brain wants a story. Journaling helps you build one.

There is another benefit: externalization. When an insight lives only in your head, it is vulnerable to distortion, fading, and rationalization. When it is written down, it becomes an object you can examine, return to, and build on. Your journal becomes a record of your inner landscape, a map you can consult again and again.

---

Lesson 2.2: The Three-Layer Framework

I want to teach you a specific journaling framework that I have found especially powerful for psychedelic integration. I call it the Three-Layer Framework, and it moves from surface to depth.

Layer 1: The Narrative

Start with what happened. Write the story of your experience as you remember it, chronologically. What did you see? What did you feel? What surprised you? What scared you? What delighted you?

Do not try to interpret anything at this stage. Just tell the story. Be as specific as possible. Include sensory details. Include the weird stuff that does not seem to make sense. Especially include that stuff, because it often turns out to be the most meaningful upon reflection.

Some guiding questions for Layer 1: What was the setting? What was your state of mind going in? Walk through the experience from beginning to end. What were the key moments or turning points? What images, sensations, or emotions stood out? How did you feel when it ended?

Spend at least 20 to 30 minutes on this layer. Write more than you think you need to. Details you think are irrelevant now may become important later.

Layer 2: The Themes

Now read back what you wrote and look for patterns. What themes emerge? What kept coming up? If the experience had a message, what was it?

This is where you start to make meaning. Not forcing meaning onto the experience, but noticing what naturally emerges when you look at the narrative with fresh eyes.

Common themes people identify include: letting go of control, self-compassion, connection to nature or others, unresolved grief, the need for forgiveness (of self or others), creative expression, purpose and direction, the relationship between fear and growth.

Some guiding questions for Layer 2: If this experience were a movie, what would the title be? What emotions kept recurring? Were there any messages or insights that felt especially clear? What surprised you about what came up? Are there connections between what you experienced and your current life situation?

Do not worry if the themes feel contradictory. Psychedelic experiences often hold paradox. You can feel deep peace and deep sadness at the same time. You can see the beauty in something painful. Let the contradictions exist without resolving them.

Layer 3: The Application

This is the integration layer. Based on the themes you identified, what do you want to do differently? What changes, however small, do you want to make in your daily life?

The key here is specificity. Vague intentions like I want to be more present or I need to love myself more are nice sentiments, but they are not actionable. Integration requires concrete steps.

Transform vague intentions into specific actions. Instead of I want to be more present, try: I will put my phone in another room during dinner every night this week. Instead of I need to process my grief, try: I will schedule a therapy appointment by Friday and bring my journal notes. Instead of I want to be more creative, try: I will spend 30 minutes every Saturday morning drawing or writing with no agenda.

Some guiding questions for Layer 3: Based on what emerged, what is one specific thing I can do this week? What habit do I want to start, change, or stop? Is there a conversation I need to have? Is there something I need to give myself permission to feel? What support do I need to make these changes real?

Practice Exercise

Right now, with whatever experience is on your mind, work through all three layers in your journal. Set a timer: 20 minutes for the Narrative, 15 minutes for the Themes, 15 minutes for the Application.

Do not skip Layer 3. That is where the magic happens.

---

Lesson 2.3: Advanced Journaling Techniques

Dialogue Writing: This technique involves writing a conversation between yourself and an element of your experience. It might be a conversation with a figure you encountered, with an emotion that came up, with a younger version of yourself, or with a part of your psyche that revealed itself. Write both sides of the dialogue. Let it flow without censoring. You will be surprised at what emerges when you give voice to the parts of yourself that usually stay silent.

Letter Writing: Write a letter to someone relevant to your experience. Maybe it is a letter to a person you need to forgive. A letter to your younger self. A letter from your future self. You never need to send it. The act of writing it is the practice.

Visual Journaling: Not everything translates well into words. If you encountered visual imagery, colors, patterns, or spaces during your experience, try drawing or painting them. You do not need to be an artist. Rough sketches, color blocks, and abstract shapes can capture things that language misses.

Gratitude Mapping: After the initial processing, write about what you are grateful for in the experience, including the difficult parts. Gratitude is not about pretending everything was wonderful. It is about recognizing that even challenging experiences carry gifts. What did the difficult moments teach you? What strength did they reveal?

---

Module 2 Reflection

Take a Moment

Which journaling technique resonates most with you?

Have you completed the Three-Layer exercise? If not, schedule time for it today.

Is there a dialogue you need to have on paper, with a figure, an emotion, or a part of yourself?

How will you make journaling a regular practice, not just a one-time exercise?`,
    },
    {
      title: 'Module 3: Somatic Integration',
      slug: 'somatic-integration',
      description:
        'Working with the body through breathwork, movement practices, and techniques for releasing stuck sensations.',
      is_free_preview: false,
      sort_order: 2,
      is_published: true,
      duration_seconds: 5400,
      content: `Lesson 3.1: The Body Remembers

There is a line from Bessel van der Kolk that has become almost a cliche in the trauma and wellness world, but it is worth repeating because it is true: the body keeps the score.

Your body is not just a vehicle for carrying your brain around. It is a sensing, remembering, processing organ in its own right. Emotions live in the body. Trauma lives in the body. And psychedelic experiences, which often involve intense emotional and sensory content, absolutely live in the body.

You might have noticed this during or after a psychedelic experience: tension in your jaw, a heaviness in your chest, a buzzing in your hands, a feeling of expansion in your ribcage, tears that seemed to come from nowhere, spontaneous movements or shaking. These are not random. They are your body processing experience.

Somatic integration means working with these physical sensations and movements rather than ignoring them or trying to think your way through them. Many people are highly skilled at cognitive processing (analyzing, understanding, making meaning) but much less practiced at listening to what their body is telling them. This module aims to close that gap.

---

Lesson 3.2: Breath as a Bridge

If you only learn one somatic integration tool, let it be breathwork. Breath is the bridge between your voluntary and involuntary nervous system. It is the one autonomic function you can consciously control, which makes it a uniquely powerful tool for influencing your physiological state.

The Basics: Diaphragmatic Breathing

Place one hand on your chest and one on your belly. Breathe in through your nose for a count of four. Your belly should rise more than your chest. Hold for a count of two. Exhale through your mouth for a count of six. The exhale is longer than the inhale. This is intentional. A longer exhale activates your parasympathetic nervous system, the rest-and-digest response, signaling to your body that it is safe to relax and process.

Practice this for five minutes. Notice what happens in your body. Do certain areas relax? Do emotions surface? Do memories from your experience arise? Just notice without needing to do anything about it.

Integration Breathwork: The 4-7-8 Pattern

Inhale through your nose for 4 counts. Hold for 7 counts. Exhale through your mouth for 8 counts. This pattern, developed by Dr. Andrew Weil, creates a pronounced parasympathetic shift. It is particularly useful when you feel activated, anxious, or emotionally flooded during integration work.

Use this as a reset button. If journaling brings up intense emotion, if a memory from your experience triggers anxiety, or if you simply feel overwhelmed, three to five rounds of 4-7-8 breathing can bring you back to a centered state from which you can continue processing.

---

Lesson 3.3: Movement Practices

Your body may need to move to process what it experienced. This is natural. Animals in the wild shake, tremble, and move after a stressful experience to discharge the activation from their nervous system. Humans tend to suppress this impulse because it feels socially inappropriate, but that suppressed energy does not just disappear. It gets stored.

Intuitive Movement

Find a private space. Put on music that resonates with your current emotional state (not necessarily the music from your experience, though that can work too). Close your eyes. And let your body move however it wants to.

This might feel awkward at first, especially if you are not someone who dances or moves expressively. That is fine. Start small. Sway. Rock. Let your arms hang and swing. Roll your neck. The movements might start gentle and become more intense. They might bring up emotion. Let them.

The only instruction is: do not choreograph it. Let your body lead and your mind follow. Five to ten minutes of intuitive movement can release tension that hours of talking or thinking cannot touch.

Yoga for Integration

Yoga, particularly slow, restorative styles like Yin yoga, is exceptionally well-suited for psychedelic integration. Yin yoga involves holding passive stretches for three to five minutes, which creates a gentle sustained opening in the connective tissue (fascia) that often holds tension and emotional residue.

If you have a yoga practice, lean toward gentler, more introspective styles during your integration period. This is not the time for power vinyasa or hot yoga. The goal is not to work hard. The goal is to create space in your body where experience can be processed.

Specific poses that are particularly helpful for integration: child's pose (safety, surrender), pigeon pose (hip opening, emotional release), supine twist (wringing out tension), legs up the wall (nervous system reset), and savasana (allowing everything to settle).

---

Lesson 3.4: Working with Stuck Sensations

Sometimes, after a psychedelic experience, you may notice a physical sensation that persists. A knot in your stomach. Tightness in your throat. A weight on your chest. A buzzing or restlessness in your legs. These stuck sensations are often the body's way of signaling unprocessed material.

Here is a simple but powerful technique for working with them:

Step 1: Notice. Bring your attention to the sensation. Where exactly is it? What does it feel like? Give it specific qualities. Is it hot or cold? Heavy or light? Sharp or dull? Does it have a shape? A color?

Step 2: Breathe into it. This sounds abstract, but try it. As you inhale, imagine sending your breath directly to the area of sensation. You are not trying to make it go away. You are giving it attention and space.

Step 3: Ask it. This might feel silly, but ask the sensation what it needs. What are you trying to tell me? What do you need? Then listen. Not for words necessarily, but for impressions, images, emotions, or impulses.

Step 4: Allow. Whatever arises, let it be there. Tears, anger, sadness, memories. You do not have to do anything with it. Just allow it to move through you. The sensation often shifts, changes, or releases on its own when it is given genuine, non-judgmental attention.

Step 5: Ground. After working with a stuck sensation, spend a few minutes grounding. Feel your feet on the floor. Notice the temperature of the air. Take a few slow breaths. Have a glass of water. Let your nervous system settle.

---

Module 3 Reflection

Take a Moment

Where in your body do you notice sensation right now?

Is there a physical sensation from your psychedelic experience that persists?

Try the 5-step technique above with whatever sensation is present.

Which movement practice appeals to you most: intuitive movement, yoga, walking, or something else?

Schedule one somatic practice session this week.`,
    },
    {
      title: 'Module 4: Working with Difficult Experiences',
      slug: 'working-with-difficult-experiences',
      description:
        'Reframing challenging experiences, common difficult themes, and five strategies for processing difficult material.',
      is_free_preview: false,
      sort_order: 3,
      is_published: true,
      duration_seconds: 5400,
      content: `Lesson 4.1: Reframing Difficult Experiences

Let me say something that might be controversial in some psychedelic circles: there is no such thing as a bad trip. There are, however, difficult, challenging, and sometimes terrifying experiences. And those experiences often carry the most valuable material for integration.

The language we use matters. Calling an experience bad implies it was a mistake, that something went wrong, that the experience should not have happened. This framing makes it harder to integrate because you are starting from a position of resistance rather than curiosity.

A more useful framing: the experience showed me something I did not want to see. It confronted me with material I have been avoiding. It was painful in the way that surgery is painful, not because something went wrong, but because something needed to be addressed.

This does not mean every difficult experience is automatically meaningful. Sometimes a challenging experience is just the result of a dose that was too high, a setting that was not right, or timing that was off. Context matters. But more often than not, the difficult parts of a psychedelic experience are where the growth is hiding.

---

Lesson 4.2: Common Difficult Experience Themes

Difficult psychedelic experiences tend to cluster around a few recurring themes. Knowing what they are can help you feel less alone if you encountered them.

Ego Death and Loss of Control: The sensation that you are dissolving, dying, or losing your grip on reality. This is one of the most commonly reported difficult experiences and also one of the most commonly reported catalysts for positive change after the fact. The terror of losing control often reveals how tightly you grip control in your daily life and what would happen if you loosened that grip.

Confrontation with Mortality: Vividly experiencing your own death or the impermanence of everything you love. This is deeply unsettling in the moment but often leads to a profound reorientation of priorities. People who have faced mortality in a psychedelic experience frequently report that it reduced their fear of death and increased their appreciation for the time they have.

Surfacing of Trauma: Psychedelics can bring buried traumatic memories and emotions to the surface with startling clarity. If this happened to you, it is important to understand that the psychedelic did not create the trauma. It revealed what was already there. This material was affecting you whether you were conscious of it or not. Now that it is in the open, it can be addressed.

Overwhelming Emotion: Waves of grief, rage, terror, or sadness that felt like they would never end. The intensity of emotion in a psychedelic experience can be orders of magnitude greater than what we normally allow ourselves to feel. If this was your experience, know that the emotions did end. And the fact that you could feel them means your emotional system is working, not broken.

Paranoia and Fear: The conviction that something terrible is happening or about to happen. A sense that you are in danger, that you have broken your brain, or that you will never return to normal. These experiences, while extremely unpleasant, almost always resolve. If you are reading this course, you returned to normal. Your brain is intact.

---

Lesson 4.3: Integration Strategies for Difficult Material

Strategy 1: Name It to Tame It. Research by Dan Siegel shows that simply naming an emotion reduces its intensity. When you are processing difficult material from an experience, be specific in your language. Not just I felt bad, but I felt a heavy sadness in my chest, connected to a memory of my mother leaving when I was seven. Precision creates distance, and distance creates space for processing.

Strategy 2: Pendulation. This is a somatic technique from Peter Levine's work. Rather than diving fully into the difficult material (which can be retraumatizing), you pendulate between the difficult sensation and a resource, something that feels safe, pleasant, or grounding. Feel the tightness in your chest for a moment, then shift your attention to the warmth in your hands. Back and forth, gently. This teaches your nervous system that it can touch difficult material without getting stuck there.

Strategy 3: Resourcing. Before you do any deep processing of difficult material, build your resources. Resources are anything that helps you feel safe, grounded, and capable. A memory of a place where you felt completely at peace. The sensation of warm sunlight on your skin. A person who makes you feel unconditionally loved. Build a library of these resources so you can access them when the integration work gets heavy.

Strategy 4: Titration. Do not try to process everything at once. Work with difficult material in small doses, like slowly turning up the volume rather than blasting it at full volume. Spend ten minutes with the material, then step back. Go for a walk. Have a cup of tea. Then return when you are ready. This is especially important for material that involves trauma.

Strategy 5: Seek Support. Some material is too big to process alone. And that is not a weakness. It is wisdom. If your psychedelic experience brought up trauma, persistent anxiety, depersonalization, or anything that feels beyond your ability to process, please seek professional support. A therapist trained in psychedelic integration can be invaluable. Organizations like the Psychedelic Support Network maintain directories of integration-trained therapists.

When to Seek Professional Help

If you are experiencing persistent anxiety or panic that has not resolved in the weeks after your experience.

If you are having intrusive thoughts or flashbacks.

If you feel disconnected from reality or from yourself (depersonalization or derealization).

If the experience brought up traumatic material that feels overwhelming.

If you are having thoughts of self-harm.

These are not signs of failure. They are signs that your experience touched something deep, and you deserve support in working with it.

---

Module 4 Reflection

Take a Moment

Is there difficult material from a psychedelic experience that you have been avoiding?

Which processing strategy resonates most with where you are right now?

What are your resources? Name three things that help you feel safe and grounded.

Do you need professional support? Be honest with yourself.

If you are processing difficult material, please be gentle with yourself today.`,
    },
    {
      title: 'Module 5: Building a Daily Practice',
      slug: 'building-a-daily-practice',
      description:
        'Designing your daily practice with three anchors, community integration, and knowing when to journey again.',
      is_free_preview: false,
      sort_order: 4,
      is_published: true,
      duration_seconds: 5400,
      content: `Lesson 5.1: From Event to Practice

There is a critical shift that separates people who have psychedelic experiences from people who are transformed by them. It is the shift from event to practice.

An event is something that happens to you. A practice is something you do. A psychedelic experience is an event. Integration is a practice. And like any practice, it works best when it becomes part of your daily life rather than something you only do for a few days after an experience.

Think about people who go on meditation retreats. They spend a week in silence, have profound insights, feel deeply peaceful, and then return to their normal lives. Within a few weeks, most of them are right back where they started. But the ones who maintain a daily meditation practice, even for just ten minutes a day, sustain and build on what they experienced on retreat.

Integration works the same way. The intensive processing you do in the days and weeks after an experience is important. But the daily practice you maintain afterward is what turns temporary insights into permanent change.

---

Lesson 5.2: Designing Your Daily Practice

Your daily integration practice does not need to be elaborate. In fact, simpler is better. The goal is something sustainable, something you will actually do every day, not something impressive that you abandon after two weeks.

I recommend building your practice around three anchors:

Morning Anchor: Intention Setting (5 minutes)

Before you check your phone, before you scroll through anything, take five minutes. Sit quietly. Take three deep breaths. Then ask yourself: What do I want to bring into this day? What quality, what way of being, what intention?

This is not goal-setting. It is not about productivity. It is about choosing how you want to show up. Maybe today it is patience. Maybe it is curiosity. Maybe it is the courage to have a difficult conversation you have been avoiding.

Write your intention in a single sentence. Keep it visible throughout the day. A sticky note, a note on your phone, whatever works.

Midday Anchor: The Pause (2 minutes)

Sometime in the middle of your day, stop. Just stop. Close your eyes if you can. Take three breaths. Check in with your body. Notice what you are feeling. Notice any tension, any emotion, any thought that has been running in the background.

Then recall your morning intention. Are you living it? Have you forgotten it? Have circumstances made it irrelevant? Adjust if needed.

This midday pause is a micro-integration practice. It interrupts the autopilot mode that most of us operate in and creates a moment of conscious awareness. Over time, these moments add up to a fundamentally different way of moving through your day.

Evening Anchor: Reflection (10 minutes)

Before bed, journal for ten minutes. You do not need to follow the full Three-Layer Framework every day. A simpler format for daily reflection: What did I notice today? What am I grateful for today? What do I want to carry into tomorrow?

The power of this practice is cumulative. Day by day, it might feel insignificant. But over weeks and months, you are building a detailed record of your inner life and creating consistent space for processing whatever arises.

---

Lesson 5.3: Community and Relational Integration

Integration does not happen in isolation. Relationships are where your insights get tested, challenged, and refined. The compassion you felt for yourself during your experience, can you extend it to your partner when they irritate you? The connection you felt to all living things, does it change how you treat the barista at your coffee shop? The clarity you gained about your priorities, can you act on it when your boss piles more work on your plate?

These are the real integration moments. Not the ones in your journal or on your meditation cushion (though those matter too), but the ones that happen in real-time, in real relationships, in the messy complexity of actual life.

Finding community is an important part of sustained integration practice. The Psilosopher community forum is one option. Integration circles, where people meet regularly to share and support each other's integration work, are another. Some cities have in-person groups. Online options are increasingly available.

The point is not to find people who agree with you about psychedelics. It is to find people who take the work of inner transformation seriously. People who will both celebrate your growth and call you out when you are avoiding something. People who understand that this is a long game, not a quick fix.

---

Lesson 5.4: When to Journey Again

This is a question that comes up a lot, and there is no universal answer. But here are some guidelines:

Not until you have integrated the last experience. If you are still processing significant material from your most recent experience, another journey is premature. Stacking experiences without integrating them is like taking on new debt before paying off the old. The insights accumulate, but so does the unprocessed material.

Not to escape. If your motivation for another experience is to feel good again, to escape your current emotional state, or to avoid the hard work of integration, that is a red flag. The psychedelic is not the medicine. The integration is the medicine. The psychedelic is just the catalyst.

Not on a fixed schedule. Some people set arbitrary timelines: I will do this every three months, or I will journey once a year. Arbitrary schedules ignore the reality that different experiences require different amounts of integration time. Let readiness, not the calendar, determine your timing.

You know you are ready for another experience when: you have fully processed the last one and the insights have been translated into concrete life changes. You have a clear, specific intention for the next experience, one that could not be addressed through other means. You are emotionally stable and not using the psychedelic to fix or escape anything. You feel pulled toward the experience by curiosity, not pushed by desperation.

---

Module 5 Reflection

Take a Moment

What will your three daily anchors look like? Morning intention, midday pause, evening reflection.

What is one small change you can make to your daily routine starting tomorrow?

Who in your life could be part of your integration community?

If you have been considering another psychedelic experience, check it against the readiness criteria above.

Write down your personal integration practice plan. Make it specific and achievable.`,
    },
  ];

  for (const lesson of c2Lessons) {
    const { error } = await supabase
      .from('lessons')
      .upsert({ ...lesson, course_id: course2.id }, { onConflict: 'course_id,slug' });
    if (error) console.error('Error creating lesson:', lesson.title, error);
    else console.log('  + Lesson:', lesson.title);
  }

  console.log('\nSeeding complete!');
}

seed().catch(console.error);
