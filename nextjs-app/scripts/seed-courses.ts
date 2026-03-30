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

  // Course 1: Essentials tier
  const { data: course1, error: c1err } = await supabase
    .from('courses')
    .upsert(
      {
        title: 'Foundations of Psychedelic Integration',
        slug: 'foundations-of-psychedelic-integration',
        description:
          'A comprehensive introduction to the science and practice of psychedelic integration. Learn how to prepare for, navigate, and meaningfully incorporate insights from expanded states of consciousness into everyday life.',
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
      title: 'What Is Integration?',
      slug: 'what-is-integration',
      description: 'Understanding the concept of integration and why it matters for lasting transformation.',
      content: `Integration is the process of taking insights, emotions, and experiences from an expanded state of consciousness and weaving them into the fabric of your daily life. It is not simply about having a powerful experience — it is about what you do with that experience afterward.

Many people approach psychedelic experiences expecting a single session to transform their lives. While these experiences can indeed be profound and catalytic, lasting change requires intentional effort. Integration is that effort.

In this lesson, we will explore:

- The difference between experience and integration
- Why integration is considered the most important part of the psychedelic journey
- The three phases of integration: preparation, experience, and incorporation
- Common challenges people face when trying to integrate insights
- How to create a supportive environment for integration work

Think of integration as building a bridge between two worlds: the world of expanded awareness and the world of everyday life. Without this bridge, even the most profound insights can fade like dreams upon waking.

The research supports this view. Studies from Johns Hopkins, Imperial College London, and NYU have consistently shown that the therapeutic benefits of psychedelic experiences are strongly correlated with the quality of integration support participants receive.`,
      sort_order: 0,
      is_published: true,
      is_free_preview: true,
      duration_seconds: 900,
    },
    {
      title: 'The Neuroscience of Psychedelic Experiences',
      slug: 'neuroscience-of-psychedelics',
      description: 'How psychedelics interact with the brain and why this matters for integration.',
      content: `Understanding what happens in the brain during a psychedelic experience can profoundly inform your integration practice. When we understand the mechanisms at play, we can work with them more skillfully.

Psychedelics primarily work by interacting with the serotonin 2A receptor, which is densely concentrated in the default mode network (DMN) — the brain network associated with our sense of self, autobiographical memory, and future planning.

When psychedelics reduce activity in the DMN, several things happen:

1. The boundaries between brain networks become more fluid
2. Novel connections form between regions that don't typically communicate
3. The brain enters a state of increased entropy — more disorder, more possibility
4. Our habitual patterns of thought and perception temporarily dissolve

This is why psychedelic experiences often feel so novel and revelatory. The brain is literally making connections it has never made before.

For integration, this understanding is crucial. The period following a psychedelic experience — sometimes called the "afterglow" — represents a window of enhanced neuroplasticity. The brain is more malleable, more open to forming new patterns.

This window typically lasts days to weeks, and it is during this time that integration practices are most powerful. The new neural pathways formed during the experience are still fragile and need reinforcement through intentional practice.`,
      sort_order: 1,
      is_published: true,
      is_free_preview: false,
      duration_seconds: 1200,
    },
    {
      title: 'Preparation: Set and Setting',
      slug: 'preparation-set-and-setting',
      description: 'How to prepare your mindset and environment for a meaningful experience.',
      content: `The concepts of "set" and "setting" were popularized by Timothy Leary in the 1960s, but their importance has been validated by modern clinical research. Set refers to your mindset — your intentions, expectations, emotional state, and psychological readiness. Setting refers to your physical and social environment.

Together, these two factors are among the strongest predictors of the quality and therapeutic value of a psychedelic experience.

Preparing Your Set:
- Clarify your intentions without rigid expectations
- Address any significant anxiety or resistance beforehand
- Practice mindfulness or meditation to build familiarity with inner observation
- Journal about what you hope to explore or understand

Preparing Your Setting:
- Choose a safe, comfortable, and familiar environment
- Minimize potential interruptions or stressors
- Consider the presence of a trusted guide or sitter
- Prepare comforting items: blankets, music, art supplies, journal

The clinical research protocols at Johns Hopkins and NYU provide excellent models for optimal set and setting. Their careful attention to these factors is a major reason for their impressive therapeutic outcomes.`,
      sort_order: 2,
      is_published: true,
      is_free_preview: false,
      duration_seconds: 1100,
    },
    {
      title: 'Journaling and Reflection Practices',
      slug: 'journaling-and-reflection',
      description: 'Practical tools for capturing and processing insights from psychedelic experiences.',
      content: `Journaling is one of the most powerful and accessible integration tools available. The act of writing engages different cognitive processes than thinking alone, helping to crystallize insights and make them more concrete and actionable.

When to Journal:
- Before: Write about your intentions and current life situation
- During (if possible): Brief notes about key moments or insights
- Immediately after: Stream-of-consciousness writing while memories are fresh
- Days and weeks later: Reflective writing about how insights are landing

Effective Integration Journaling Prompts:
1. What did I see, feel, or understand that surprised me?
2. What patterns or habits did I become aware of?
3. What felt most important or meaningful?
4. How does this relate to my daily life?
5. What do I want to change or cultivate going forward?
6. What am I grateful for from this experience?

Beyond traditional journaling, consider:
- Drawing or creating art to express non-verbal experiences
- Voice recording for when writing feels too structured
- Letter writing to yourself or others (not necessarily sent)
- Creating a personal symbol or image that captures the essence of your experience

The key is consistency. Even five minutes of daily reflection can significantly enhance the integration process.`,
      sort_order: 3,
      is_published: true,
      is_free_preview: false,
      duration_seconds: 1000,
    },
    {
      title: 'Building a Long-Term Integration Practice',
      slug: 'long-term-integration',
      description: 'Creating sustainable habits and practices for ongoing growth and integration.',
      content: `Integration is not a destination but an ongoing practice. The insights from a single psychedelic experience can continue to unfold and deepen for months or even years — but only if you create the conditions for this to happen.

A sustainable integration practice typically includes:

Daily Practices (10-30 minutes):
- Morning meditation or mindfulness
- Journaling or reflection
- Movement practice (yoga, walking, dance)
- Gratitude practice

Weekly Practices (1-2 hours):
- Integration circle or peer support group
- Nature immersion
- Creative expression
- Review of intentions and progress

Monthly Practices:
- Deeper reflection on patterns and growth
- Adjusting practices based on what is working
- Connecting with a therapist or integration coach
- Community engagement

Remember that integration is deeply personal. What works for one person may not work for another. The most important thing is to find practices that feel authentic and sustainable for you.

Start small. It is better to maintain a simple five-minute daily practice than to create an ambitious routine that you abandon after two weeks. Build gradually, and let your practice evolve as your understanding deepens.`,
      sort_order: 4,
      is_published: true,
      is_free_preview: false,
      duration_seconds: 1300,
    },
  ];

  for (const lesson of c1Lessons) {
    const { error } = await supabase
      .from('lessons')
      .upsert({ ...lesson, course_id: course1.id }, { onConflict: 'course_id,slug' });
    if (error) console.error('Error creating lesson:', lesson.title, error);
    else console.log('  + Lesson:', lesson.title);
  }

  // Course 2: Premium tier
  const { data: course2, error: c2err } = await supabase
    .from('courses')
    .upsert(
      {
        title: 'Advanced Integration Practices',
        slug: 'advanced-integration-practices',
        description:
          'Deepen your integration practice with somatic techniques, relational approaches, and advanced frameworks for working with challenging experiences. For practitioners ready to go beyond the basics.',
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
      title: 'Somatic Integration: The Body Remembers',
      slug: 'somatic-integration',
      description: 'Working with the body to integrate psychedelic experiences and release stored tension.',
      content: `Psychedelic experiences are not just mental events — they are profoundly embodied. The body holds memories, emotions, and trauma patterns that often surface during expanded states of consciousness. Somatic integration addresses this reality directly.

During psychedelic experiences, many people report physical sensations: waves of energy, trembling, spontaneous movement, heat or cold, pressure in specific areas. These are not random — they often correspond to places where the body has stored unprocessed emotional material.

Key Somatic Integration Practices:

Body Scanning:
After an experience, practice systematic body scanning to notice where sensation lives. Areas of tension, numbness, or heightened sensitivity are all worth exploring.

Breath Work:
Conscious breathing can help process and move emotional energy. Techniques like diaphragmatic breathing, extended exhale breathing, and gentle circular breathing can all support integration.

Movement:
Unstructured, intuitive movement — sometimes called "authentic movement" — allows the body to complete interrupted responses and release stored tension. Put on music and let your body move without choreography or judgment.

Touch:
Self-massage, stretching, and somatic experiencing techniques can help ground insights in the body. Consider working with a somatic therapist who is psychedelic-aware.`,
      sort_order: 0,
      is_published: true,
      is_free_preview: true,
      duration_seconds: 1400,
    },
    {
      title: 'Working with Difficult Experiences',
      slug: 'working-with-difficult-experiences',
      description: 'Frameworks and practices for integrating challenging or overwhelming psychedelic experiences.',
      content: `Not all psychedelic experiences are blissful or immediately insightful. Some are confusing, frightening, or emotionally overwhelming. These "difficult" experiences are often the ones that carry the most potential for growth — but only if they are properly integrated.

Common Challenging Experiences:
- Ego dissolution or loss of sense of self
- Encounter with death or mortality
- Surfacing of repressed memories or trauma
- Intense fear, paranoia, or confusion
- Overwhelming emotional release
- Experiences that challenge one's worldview

Frameworks for Integration:

1. The Challenge vs. Crisis Distinction
A challenging experience is uncomfortable but manageable. A crisis feels unmanageable. Knowing the difference helps you determine when to seek professional support.

2. The Meaning-Making Process
Difficult experiences often need time before their meaning becomes clear. Resist the urge to immediately interpret or explain. Instead, sit with the experience and let understanding emerge gradually.

3. Titration
Don't try to process everything at once. Work with challenging material in small, manageable doses. This is especially important for trauma-related content.

4. Professional Support
There is no shame in seeking help. Integration therapists, psychedelic-informed counselors, and peer support groups can provide invaluable guidance for navigating difficult experiences.`,
      sort_order: 1,
      is_published: true,
      is_free_preview: false,
      duration_seconds: 1500,
    },
    {
      title: 'Relational Integration',
      slug: 'relational-integration',
      description: 'How psychedelic insights can transform your relationships and how to navigate relational shifts.',
      content: `Psychedelic experiences often bring profound insights about relationships — with partners, family members, friends, and communities. Integrating these insights into actual relationships requires skill, sensitivity, and patience.

Common Relational Insights:
- Deeper appreciation for loved ones
- Recognition of unhealthy relationship patterns
- Desire for more authentic communication
- Awareness of boundaries that need to be set or released
- Grief for relationships that have been lost
- Understanding of intergenerational patterns

Navigating Relational Shifts:

Communication:
Be thoughtful about what you share and with whom. Not everyone in your life will understand or be supportive of psychedelic experiences. Choose your confidants carefully.

Pacing:
Resist the urge to immediately overhaul all your relationships. Integration is a gradual process. Sudden dramatic changes can be destabilizing for both you and others.

Boundaries:
Some relationships may need new boundaries. Others may need to deepen. Let your integration insights guide you, but implement changes slowly and with care.

Community:
Seek out community with others who understand the psychedelic experience. Integration circles, online communities, and psychedelic societies can provide a sense of belonging and understanding.`,
      sort_order: 2,
      is_published: true,
      is_free_preview: false,
      duration_seconds: 1200,
    },
    {
      title: 'Spiritual Integration and Meaning-Making',
      slug: 'spiritual-integration',
      description: 'Navigating the spiritual dimensions of psychedelic experiences across traditions and frameworks.',
      content: `Many psychedelic experiences have a distinctly spiritual quality — encounters with the sacred, feelings of unity or cosmic significance, experiences of death and rebirth, or a profound sense of interconnection with all life.

Integrating these spiritual experiences presents unique challenges, especially for people who do not have an existing spiritual framework or whose experiences don't fit neatly into their current belief system.

Key Considerations:

Holding Multiple Frameworks:
You don't need to commit to a single spiritual interpretation. Many practitioners find value in holding multiple frameworks simultaneously — scientific, psychological, and spiritual — without needing to choose among them.

The Perennial Philosophy:
Aldous Huxley wrote about the common core of mystical experiences across traditions. Understanding this perennial philosophy can help you find context for your experiences without requiring allegiance to any single tradition.

Avoiding Spiritual Bypass:
Spiritual experiences can sometimes be used to avoid dealing with emotional or psychological material. True spiritual integration includes the difficult work of facing shadow material, not just basking in transcendent states.

Grounding the Transcendent:
The greatest challenge of spiritual integration is bringing the transcendent back to earth. How do you live from a place of interconnection in a world that often feels fragmented? This is the ongoing practice of spiritual integration.

Practices for Spiritual Integration:
- Contemplative prayer or meditation from any tradition
- Study of mystical literature across cultures
- Nature-based spiritual practices
- Creative expression as spiritual practice
- Service to others as embodiment of spiritual insight`,
      sort_order: 3,
      is_published: true,
      is_free_preview: false,
      duration_seconds: 1600,
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
