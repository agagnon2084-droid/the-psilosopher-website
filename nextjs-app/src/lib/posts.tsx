import React from 'react';

export type Post = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  heroGradient: string;
  excerpt: string;
  content: () => React.ReactNode;
  references: { text: string; source: string }[];
};

export const posts: Post[] = [
  {
    slug: 'default-mode-network',
    title: 'The Default Mode Network: How Psilocybin Rewires Thought Patterns',
    category: 'Neuroscience',
    date: 'March 18, 2026',
    readTime: '8 min read',
    heroGradient: 'from-earth-900 via-mystic-900 to-forest-900',
    excerpt:
      "There's a part of your brain that never shuts up. Neuroscientists call it the Default Mode Network. And psilocybin is one of the few things that can make it quiet.",
    content: () => (
      <>
        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`There's a part of your brain that never shuts up. It's running when you're lying in bed at 3am replaying a conversation from six years ago. It's running when you're driving and suddenly realize you've been on autopilot for the last twenty minutes, lost in a loop about something that hasn't happened yet. It's the narrator, the voice that stitches together your memories, your anxieties, and your sense of who you are into something that feels continuous and solid.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          Neuroscientists call it the Default Mode Network.
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          And psilocybin, it turns out, is one of the few things that can make it quiet.
        </p>

        <h2 className="font-serif text-2xl font-bold text-earth-900 mt-12 mb-4">
          What the Default Mode Network Actually Is
        </h2>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`The DMN isn't a single region of the brain. It's a network, a set of interconnected areas that fire in concert when you're not focused on the external world. The medial prefrontal cortex, the posterior cingulate cortex, the inferior parietal lobule, sections of the medial temporal lobe. When these regions sync up, you get what most of us experience as "thinking about yourself." Daydreaming. Ruminating. Planning. Worrying. Constructing the ongoing story of who you are and what it all means.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`The DMN was first identified in the early 2000s by Marcus Raichle and his team at Washington University. What they noticed was counterintuitive: the brain doesn't go quiet when you stop doing tasks. It gets more active in specific regions. There's a baseline hum, a default state, and it's almost entirely self-referential. Your brain, left to its own devices, talks to itself about itself.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`For most people, most of the time, this is fine. It's how you maintain a continuous sense of identity. It's how you remember who you are when you wake up in the morning.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`But for people stuck in depression, anxiety, or obsessive thought patterns, the DMN becomes a prison. The narrator won't stop, and the story it's telling is almost always the same: something is wrong with you, something bad is coming, and there's no way out.`}
        </p>

        <h2 className="font-serif text-2xl font-bold text-earth-900 mt-12 mb-4">
          What Happens When Psilocybin Enters the Picture
        </h2>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`In 2012, Robin Carhart-Harris and his team at Imperial College London published a study in PNAS that surprised almost everyone in the field. They gave participants intravenous psilocybin, put them in an fMRI scanner, and expected to see the brain light up: more activity, more noise, more signal. What they found was the opposite. Psilocybin decreased blood flow and activity in the brain's highest-level association cortices, particularly within the DMN. The narrator didn't get louder. It got quieter.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`This was a pivotal finding because it reframed what psychedelics actually do. The popular assumption, reinforced by decades of "your brain on drugs" propaganda, was that psychedelics flood the brain with chaos. The reality is more precise: they selectively disrupt the networks that maintain your habitual sense of self.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Two years later, Carhart-Harris published what he called the "Entropic Brain Hypothesis" in Frontiers in Human Neuroscience. The argument was elegant: consciousness exists on a spectrum of entropy, from rigid and constrained on one end to flexible and disordered on the other. Depression, he proposed, sits at the rigid end. The DMN is overactive, locked into repetitive patterns, recycling the same bleak narrative. Psychedelics push the brain toward the other end: higher entropy, greater flexibility, more possible states.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          The clinical implications of this are significant. If depression is, at least in part, a disorder of excessive neural rigidity, then a compound that temporarily loosens those patterns might create an opening for change that months of talk therapy or SSRIs cannot.
        </p>

        <h2 className="font-serif text-2xl font-bold text-earth-900 mt-12 mb-4">
          The Connectivity Shift
        </h2>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Here's where it gets interesting. Under normal conditions, the DMN operates in relative isolation from other brain networks. It does its self-referential thing while the task-positive networks handle the external world. These systems mostly stay in their lanes.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          Psilocybin breaks down those barriers.
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          The fMRI data shows that while within-network connectivity in the DMN decreases (the narrator fragmenting, losing its grip) between-network connectivity increases dramatically. Regions that normally never communicate are suddenly exchanging information. The visual cortex starts talking to the prefrontal cortex in novel ways. The emotional processing centers interact with sensory areas they normally ignore.
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`This is why people report synesthesia, or the feeling that they're "seeing" music, or that emotions have texture and weight. The normal boundaries the brain maintains between categories of experience dissolve. And this dissolution isn't just perceptual; it's cognitive. Thoughts connect in ways they usually can't. Perspectives shift. The ruts that normally channel your thinking get flooded.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`If you've ever had the experience, during or after a session, of suddenly seeing a problem in your life from an entirely different angle, understanding something about yourself that you've been circling for years, this is likely why. The neural architecture that kept you locked into one perspective was temporarily rearranged.`}
        </p>

        <h2 className="font-serif text-2xl font-bold text-earth-900 mt-12 mb-4">
          {`What Persists and What Doesn't`}
        </h2>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          One of the most honest questions in this field is: how long do these changes actually last?
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`The answer is complicated, and I think it's important not to oversell it.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`The acute effects \u2014 the dramatic DMN disruption, the cross-network communication, the high entropy state \u2014 normalize within about 24 hours. The brain goes back to its habitual patterns relatively quickly.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`But not entirely. A 2024 study published in Nature showed that functional connectivity between the anterior hippocampus and the DMN remained altered for at least three weeks after a single 25mg dose of psilocybin. That's not permanent rewiring, but it's not nothing. And a study published in Cell later that year found evidence of actual structural remodeling: dendritic spines in the medial frontal cortex physically changed shape and density after a single dose, suggesting that psilocybin isn't just temporarily rearranging the furniture. It's renovating.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`The clinical outcomes tell a consistent story. In the Johns Hopkins trials led by Roland Griffiths and Alan Davis, roughly 50% of participants with major depressive disorder achieved full remission after psilocybin-assisted therapy, and follow-up data at 12 months showed those gains largely held. Griffiths's earlier work with cancer patients showed sustained reductions in anxiety and depression at six-month follow-up, with 80% of participants reporting continued benefits.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`But here's what I think the data actually tells us: the psilocybin experience creates a window, a period of heightened neuroplasticity where the brain is more receptive to change than it normally is. What you do with that window matters enormously. The people in these studies who maintained their gains had something the compound alone doesn't provide: structured integration support, therapeutic guidance, and a deliberate effort to translate the insights from the experience into behavioral and cognitive change.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          The compound opens the door. You still have to walk through it.
        </p>

        <h2 className="font-serif text-2xl font-bold text-earth-900 mt-12 mb-4">
          {`What the Research Doesn't Say`}
        </h2>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          I want to be direct about the limitations because this space is already full of people overselling the science.
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`First, the DMN theory is compelling but incomplete. Psilocybin doesn't only affect the DMN; it acts on serotonin 2A receptors throughout the cortex, and its therapeutic effects likely involve multiple mechanisms: neuroplasticity changes, emotional processing, the quality of the subjective experience itself, and the therapeutic relationship. Reducing everything to "it quiets the DMN" is a useful shorthand but an oversimplification.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Second, the studies I've cited are real and rigorous, but the sample sizes are still small. We're talking about dozens of participants, not thousands. The effect sizes are impressive, often dramatically so, but replication across larger and more diverse populations is still ongoing. The FDA granted breakthrough therapy designation to psilocybin for depression, which accelerates the review process, but we don't have the kind of large-scale data that exists for established treatments.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          Third, the fMRI methodology itself has limitations. Functional connectivity measures show correlations between brain regions, not causal relationships. We can see that the DMN behaves differently under psilocybin, but the precise mechanism by which this translates to weeks-long mood improvement is still being worked out.
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`I say all of this not to undermine the research; I think it's among the most promising work in psychiatry right now. But intellectual honesty is part of what I'm trying to do here. The data is strong enough to take seriously. It's not strong enough to treat as gospel.`}
        </p>

        <h2 className="font-serif text-2xl font-bold text-earth-900 mt-12 mb-4">
          Why This Matters
        </h2>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`If you're reading this because you're depressed, or anxious, or stuck in patterns you can't seem to break, here's what I want you to take from this:`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`The voice in your head that tells you the same story over and over: you're not making it up, and it's not a character flaw. It's a neural pattern. It has a measurable signature in the brain. And there is now credible, growing evidence that it can be disrupted.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          Not permanently, not magically, not without effort. But the rigidity that keeps you circling the same thoughts can be loosened. The default mode can be interrupted. And in that interruption, in the silence where the narrator pauses, something new can emerge.
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`That's what the research actually shows. Not that psilocybin fixes you. But that it creates the conditions under which you might be able to fix yourself.`}
        </p>
      </>
    ),
    references: [
      {
        text: 'Carhart-Harris, R.L., et al. (2012). Neural correlates of the psychedelic state as determined by fMRI studies with psilocybin.',
        source: 'PNAS',
      },
      {
        text: 'Carhart-Harris, R.L., et al. (2014). The entropic brain: a theory of conscious states informed by neuroimaging research with psychedelic drugs.',
        source: 'Frontiers in Human Neuroscience',
      },
      {
        text: 'Davis, A.K., et al. (2021). Effects of psilocybin-assisted therapy on major depressive disorder.',
        source: 'JAMA Psychiatry',
      },
      {
        text: 'Griffiths, R.R., et al. (2016). Psilocybin produces substantial and sustained decreases in depression and anxiety in patients with life-threatening cancer.',
        source: 'Journal of Psychopharmacology',
      },
      {
        text: 'Gukasyan, N., et al. (2022). Efficacy and safety of psilocybin-assisted treatment for major depressive disorder: Prospective 12-month follow-up.',
        source: 'Journal of Psychopharmacology',
      },
    ],
  },
  {
    slug: 'set-and-setting',
    title: 'Set and Setting: The Two Variables That Shape Every Psychedelic Experience',
    category: 'Integration',
    date: 'March 12, 2026',
    readTime: '9 min read',
    heroGradient: 'from-forest-900 via-forest-800 to-earth-900',
    excerpt:
      'The same compound can produce the most meaningful experience of your life, or six hours of white-knuckle terror. The molecule is identical. The difference is everything else.',
    content: () => (
      <>
        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`There's a reason the same compound can produce, in one person, the most meaningful experience of their life, and in another, six hours of white-knuckle terror. The molecule is identical. The dose is identical. The difference is everything else.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Timothy Leary called it "set and setting" in the early 1960s, and for all the legitimate criticism you can level at Leary (and there's plenty) he got this one right. Maybe it's the single most important idea in the entire psychedelic lexicon, and it's deceptively simple: what you bring to the experience (your mindset) and where you have it (your environment) matter as much as, and often more than, the substance itself.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`This isn't mysticism. It's research.`}
        </p>

        <h2 className="font-serif text-2xl font-bold text-earth-900 mt-12 mb-4">
          Where the Concept Comes From
        </h2>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Leary formalized the language in The Psychedelic Experience in 1964, drawing on Tibetan Buddhist frameworks to argue that the trajectory of a psychedelic trip is shaped by psychological preparation and environmental context. But the idea itself is far older than Leary, and it's worth acknowledging that.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Indigenous cultures that have worked with psychoactive plants for centuries the Mazatec with psilocybin mushrooms, Amazonian traditions with ayahuasca, the Native American Church with peyote, built elaborate ceremonial structures around these substances long before any Harvard psychologist showed up. The rituals, the songs, the fasting, the specific physical arrangements: these aren't decorative. They are, in modern terms, set and setting technologies. They're protocols designed to shape the experience toward healing rather than chaos.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          What Leary did was take an idea that indigenous people had operationalized for generations and give it a name that Western psychology could work with. Whether that constitutes insight or appropriation probably depends on who you ask.
        </p>

        <h2 className="font-serif text-2xl font-bold text-earth-900 mt-12 mb-4">
          Set: What You Bring
        </h2>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`"Set" refers to mindset: your psychological state going into the experience. It includes your mood, your intentions, your expectations, your mental health history, your unresolved emotional material, and the degree to which you've actually prepared versus just decided to wing it.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`The clinical research programs take this seriously. At Johns Hopkins, the psilocybin protocols developed under Roland Griffiths and now continued by Matthew Johnson involve multiple preparatory sessions before participants ever take the compound. These aren't casual check-ins. Participants spend hours with their facilitators building rapport, discussing their life history, articulating their intentions, and working through anxiety about the upcoming experience. The facilitators aren't there to guide the trip; they're there to build a therapeutic alliance strong enough that the participant feels safe surrendering to whatever arises.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`MAPS took a similar approach with their MDMA-assisted therapy for PTSD. Their Phase 3 protocols included three preparatory sessions before each dosing session. The preparation isn't incidental to the treatment. It is the treatment, or at least a critical component of it. The therapists at MAPS describe their role as creating a container: establishing enough psychological safety that the participant can approach their trauma without being overwhelmed by it.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`There's a meaningful body of data supporting this. A 2018 analysis by Haijen et al. published in Journal of Psychopharmacology found that psychological variables measured before a psychedelic experience, particularly absorption (the tendency toward immersive experience) and intention clarity, predicted both the quality of the acute experience and the lasting psychological outcomes. People who went in with clear, articulated intentions had better experiences and more durable benefits. This held even after controlling for dose and substance type.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`This doesn't mean you can think your way into a good trip. It means that the psychological substrate you bring, your readiness, your openness, your honesty about what you're actually dealing with, creates the conditions in which the compound operates. The molecule doesn't arrive in a vacuum. It arrives in you, with all your accumulated history and emotional architecture.`}
        </p>

        <h2 className="font-serif text-2xl font-bold text-earth-900 mt-12 mb-4">
          Setting: Where You Are
        </h2>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`"Setting" is the physical, social, and sensory environment in which the experience takes place. And if set is what you bring, setting is what meets you.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`The Johns Hopkins psilocybin research suite is deliberately designed to look nothing like a hospital. It's a living room: a couch, soft lighting, curated art on the walls, a carefully selected music playlist. Participants lie on the couch with eyeshades and headphones, and the two facilitators sit nearby, present but unobtrusive. The entire design philosophy is to create an environment that says, without words, "you are safe here."`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          This matters more than it might seem. Imperial College London ran a comparison that highlighted the difference. Their early psilocybin studies were conducted in a standard clinical research facility: white walls, fluorescent lighting, an fMRI scanner. Functional, but sterile. Later, they shifted toward a more relaxed, naturalistic setting. The subjective reports changed. Participants in the warmer environment reported more mystical-type experiences, greater emotional openness, and fewer anxiety responses. The compound was the same. The dose was the same. The room was different.
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          Music is a particularly potent element of setting. The Hopkins playlist, developed by Bill Richards, who has been working in psychedelic therapy since the 1960s, is a carefully sequenced journey of classical and world music designed to support the emotional arc of the experience. Mendel Kaelen at Imperial College published research in Psychopharmacology showing that the perceived quality of the music during a psilocybin session predicted therapeutic outcomes weeks later. The music {`isn't`} background noise. {`It's`} a structural element of the experience, providing a kind of emotional scaffolding when the {`ego's`} usual organizing functions go offline.
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`The social dimension of setting is equally important. Who is in the room? Do you trust them? Are they sober? Are they paying attention? The presence of a grounded, attentive facilitator, or even just a trusted friend, can be the difference between a difficult experience that produces growth and a difficult experience that produces trauma. The research consistently shows that the quality of the therapeutic relationship is one of the strongest predictors of outcome in psychedelic-assisted therapy, which should surprise no one who has ever been vulnerable in front of another person.`}
        </p>

        <h2 className="font-serif text-2xl font-bold text-earth-900 mt-12 mb-4">
          The Interaction Problem
        </h2>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Here's where most discussions of set and setting fall short: they treat these as independent variables. They're not.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`A pristine setting can't compensate for a mind in crisis. You can have the most beautiful retreat center in the world, the most experienced facilitators, the most perfectly curated playlist, and if someone is in acute psychological distress, carrying unprocessed trauma they're not ready to face, or fundamentally unwilling to surrender control, the setting becomes irrelevant. The compound will find the fault lines regardless.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          A strong mindset can be undermined by a chaotic or unsafe environment. Someone who has done deep preparatory work, set clear intentions, and feels psychologically ready can still have that foundation pulled out from under them by a noisy room, an unreliable sitter, or an environment that feels threatening.
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`The clinical programs understand this, which is why they invest heavily in both. The MAPS protocol doesn't just prepare the participant or optimize the room. It does both, because the interaction between the two is where the actual experience takes shape.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`What the research suggests, and what experienced practitioners will tell you, is that set and setting function as a system. They create the field within which the psychedelic experience unfolds. Get both right, and the compound has the best possible chance of doing what it does. Get one or both wrong, and you're rolling dice with your nervous system.`}
        </p>

        <h2 className="font-serif text-2xl font-bold text-earth-900 mt-12 mb-4">
          Integration: The Third Variable No One Talks About Enough
        </h2>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Leary's original formulation was set and setting. Two variables. But there's a third that the modern clinical programs have identified as equally important, and it's the one most people in recreational contexts ignore entirely: integration.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Integration is what happens after. It's the process of making sense of the experience, translating its insights into lasting change, and metabolizing whatever emotional material came up during the session. Without it, even the most profound experience can evaporate within weeks: a beautiful memory with no practical impact on how you actually live.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Rosalind Watts, who led the psilocybin for depression trial at Imperial College London, developed what she calls the "Accept, Connect, Embody" framework for integration. The model recognizes that the insights generated during a psychedelic experience are fragile. They exist in a kind of liminal space, vivid and felt during the session, but easily overwritten by the brain's default patterns if they're not actively reinforced.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`The data supports this. In the Imperial College depression trial, participants who received structured integration support maintained their improvements at six-month follow-up at significantly higher rates than those who didn't. A 2019 study by Bathje et al. in the Journal of Humanistic Psychology found that the single strongest predictor of lasting benefit from a psychedelic experience wasn't dose, wasn't the intensity of the acute experience, and wasn't even the occurrence of a mystical-type experience. It was the quality and consistency of post-experience integration practices.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`This is why I think "set and setting" is actually an incomplete framework. It should be "set, setting, and integration." The preparation shapes the experience. The environment holds the experience. The integration gives the experience somewhere to land.`}
        </p>

        <h2 className="font-serif text-2xl font-bold text-earth-900 mt-12 mb-4">
          What This Means Outside the Clinic
        </h2>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Most of the research I've cited comes from controlled clinical settings: screened participants, trained facilitators, carefully designed environments, structured protocols. The real world doesn't work like that.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`I think it's important to be honest about this gap. The vast majority of psychedelic experiences happen outside clinical trials, and they happen in conditions that range from thoughtful and intentional to completely haphazard. The kid at a festival who eats a handful of mushrooms because his friend said they were fun is not operating in the same universe as a Johns Hopkins participant who has spent twelve hours in preparatory therapy.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`And yet the principles still apply. Set and setting aren't clinical inventions; they're descriptions of how psychedelics actually work in any context. The question isn't whether your mindset and environment shape the experience. They do, every time. The question is whether you've been intentional about them.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`You don't need a clinical research suite. You don't need a licensed therapist. But you do need to ask yourself some honest questions before you sit down with a powerful psychoactive compound: Why am I doing this? What am I carrying right now? Where am I, and do I feel safe? Who is with me, and do I trust them? And the question most people forget: what happens tomorrow?`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`I'm not here to tell you what to do. I'm here to tell you that the research is clear: these variables aren't nice-to-haves. They're the architecture of the experience itself.`}
        </p>
      </>
    ),
    references: [
      {
        text: 'Leary, T., Metzner, R., & Alpert, R. (1964). The Psychedelic Experience: A Manual Based on the Tibetan Book of the Dead.',
        source: 'University Books',
      },
      {
        text: 'Haijen, E.C.H.M., et al. (2018). Predicting responses to psychedelics: A prospective study.',
        source: 'Journal of Psychopharmacology',
      },
      {
        text: 'Kaelen, M., et al. (2018). The hidden therapist: Evidence for a central role of music in psychedelic therapy.',
        source: 'Psychopharmacology',
      },
      {
        text: 'Watts, R., et al. (2017). Patients\' accounts of increased "connectedness" and "acceptance" after psilocybin for treatment-resistant depression.',
        source: 'Journal of Humanistic Psychology',
      },
      {
        text: 'Bathje, G.J., Majeski, E., & Kudowor, M. (2022). Psychedelic integration: An analysis of the concept and its practice.',
        source: 'Frontiers in Psychology',
      },
      {
        text: 'Mithoefer, M.C., et al. (2019). MDMA-assisted psychotherapy for treatment of PTSD: Study design and rationale for Phase 3 trials.',
        source: 'Psychopharmacology',
      },
      {
        text: 'Johnson, M.W., Richards, W.A., & Griffiths, R.R. (2008). Human hallucinogen research: Guidelines for safety.',
        source: 'Journal of Psychopharmacology',
      },
    ],
  },
  {
    slug: 'ego-dissolution',
    title: 'Ego Dissolution: What Happens When the Self Disappears',
    category: 'Philosophy',
    date: 'March 5, 2026',
    readTime: '10 min read',
    heroGradient: 'from-earth-900 via-mystic-900 to-earth-800',
    excerpt:
      "Take everything you think of as 'you' and imagine it dissolving. This isn't a metaphor. It's a measurable, reproducible phenomenon called ego dissolution.",
    content: () => (
      <>
        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Here's a thought experiment. Take everything you think of as "you": your name, your memories, your opinions, the running narrative in your head that tells you who you are and what you want, and imagine it dissolving. Not going away forever. Just loosening. The boundary between where you end and the world begins getting soft, then transparent, then gone.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`This isn't a metaphor. It's a measurable, reproducible phenomenon that occurs reliably under high-dose psychedelics, and it's been reported across cultures and centuries. Researchers now have a name for it, a validated scale to measure it, and a growing body of neuroimaging data showing what the brain looks like when it happens.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          They call it ego dissolution. And it might be the most important, and most misunderstood, aspect of the psychedelic experience.
        </p>

        <h2 className="font-serif text-2xl font-bold text-earth-900 mt-12 mb-4">
          The Phenomenon
        </h2>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Ego dissolution isn't feeling spacey. It's not confusion, and it's not simply "losing your mind," though it can feel like that if you're not prepared for it. What it actually involves is the temporary dissolution of the cognitive structure that generates your sense of being a separate, bounded self, an "I" that exists distinct from everything else.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`In practice, people describe it in remarkably consistent ways across studies and across cultures. The boundaries of the body feel like they're expanding or disappearing. The distinction between self and environment breaks down. The internal monologue, the narrator I wrote about in the DMN piece, goes quiet or vanishes entirely. What remains is awareness without a center. Experience without an experiencer.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Nour et al. developed the Ego Dissolution Inventory (EDI) in 2016, published in Frontiers in Human Neuroscience, to actually quantify this. The scale captures the core features: "I experienced a dissolution of my 'self' or ego," "I felt at one with the universe," "I lost all sense of self." They validated it across multiple substances and doses, and found that ego dissolution scales reliably with dose intensity. More compound, more dissolution. It also correlates strongly with mystical-type experience ratings, but the two aren't identical: you can have mystical experience without complete ego dissolution, and you can have ego dissolution that feels more terrifying than transcendent.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`That last point matters. I'll come back to it.`}
        </p>

        <h2 className="font-serif text-2xl font-bold text-earth-900 mt-12 mb-4">
          The Philosophers Got There First
        </h2>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Western philosophy has been circling this territory for centuries, even if it didn't have the pharmacological tools to induce it on demand.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`David Hume, writing in the 1730s, proposed what he called the "bundle theory" of self. He argued that when he looked inward, he never found a unified "self": just a stream of perceptions, feelings, and thoughts bundled together. The self, he suggested, is a fiction the mind constructs to give that bundle coherence. There is no permanent "I" hiding behind the experiences. There are just the experiences.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`That's a remarkably good description of what people report during ego dissolution. The bundle unpacks.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Buddhists, of course, had this figured out roughly two thousand years before Hume. The concept of anatta (no-self) is one of the foundational insights of Buddhist philosophy. The self is not a thing that exists. It's a process, a construction, something the mind is doing rather than something the mind is. Meditation practices, particularly vipassana and certain Zen traditions, are designed to reveal this directly, to create the experiential conditions under which the practitioner can see through the illusion of selfhood.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`The overlap between deep meditation and psychedelic experience isn't coincidental. Both disrupt the same neural infrastructure. But where meditation typically takes years of disciplined practice to produce ego dissolution, psilocybin can do it in about forty minutes.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Whether that's a feature or a bug depends entirely on the context.`}
        </p>

        <h2 className="font-serif text-2xl font-bold text-earth-900 mt-12 mb-4">
          {`Huxley's Reducing Valve`}
        </h2>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Aldous Huxley, writing about his mescaline experience in The Doors of Perception in 1954, proposed an idea that has aged remarkably well. The brain, he suggested, doesn't generate consciousness so much as filter it. It functions as a "reducing valve," narrowing the enormous scope of potential awareness down to the thin trickle of perception necessary for biological survival. You don't need to experience cosmic unity while running from a predator. You need to see the predator and know which direction to run.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Psychedelics, in Huxley's framework, open the valve. They reduce the brain's filtering capacity, allowing more of reality (or at least more of the mind's potential experience of reality) to flood in. The self dissolves because the self was always a product of the filter. Remove the constraints, and the boundaries of identity become arbitrary.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Modern neuroscience hasn't proven Huxley right in a literal sense; the "reducing valve" is a metaphor, not a mechanism. But the neuroimaging data is consistent with his intuition. The brain under psilocybin doesn't show more organized activity. It shows less filtering, less hierarchical control, less top-down constraint. The default mode network, which as I discussed in the previous post is the primary neural correlate of self-referential processing, decreases in activity and internal coherence. The gatekeeper steps aside.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Alan Watts, working in a parallel tradition, made a related but distinct argument. The ego, Watts proposed, isn't just a cognitive structure; it's a social one. We construct a sense of separate selfhood not because the universe is actually divided into "me" and "everything else," but because our culture requires it. The ego is a performance, a role we learn to play so seamlessly that we forget it's a role. Psychedelics, in Watts's view, reveal the performance for what it is.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`I think Watts was onto something important, and I think it partially explains why ego dissolution is so destabilizing for people raised in Western cultures that treat individual selfhood as the foundational unit of reality. More on that shortly.`}
        </p>

        <h2 className="font-serif text-2xl font-bold text-earth-900 mt-12 mb-4">
          What the Brain Is Doing
        </h2>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`The neuroscience of ego dissolution has gotten considerably more precise since Huxley was writing. Lebedev et al. published a key study in Human Brain Mapping in 2015 showing that the degree of ego dissolution reported by participants under psilocybin correlated directly with the degree of disintegration within the default mode network. The more the DMN fell apart, the more the sense of self dissolved. This wasn't a loose association; it was a tight, dose-dependent relationship.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`What's happening, as best we can currently model it, is that the DMN normally maintains a coherent pattern of self-referential processing, the ongoing narrative of "I." When psilocybin disrupts this network, the narrative loses its structural integrity. The brain regions that normally coordinate to produce your sense of being a continuous, bounded self stop coordinating. And the subjective result is exactly what you'd expect: the self comes apart.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Simultaneously, and this is the part I find most interesting, connectivity between networks increases. The brain doesn't just lose its sense of self. It enters a state of radically increased communication between regions that normally operate independently. Tagliazucchi et al. (2016) described this as a state of "increased global connectivity," the brain talking to itself in ways it normally can't or doesn't.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`So ego dissolution isn't just a subtraction. It's a reorganization. The dissolution of the normal self-structure coincides with the emergence of a much broader, more interconnected mode of processing. This may be why people don't just report "losing the self"; they report a sense of unity, of connectedness, of being continuous with everything around them. The borders come down, and what was previously separated flows together.`}
        </p>

        <h2 className="font-serif text-2xl font-bold text-earth-900 mt-12 mb-4">
          The Paradox at the Center
        </h2>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Here's what makes ego dissolution so strange as a therapeutic phenomenon: it is consistently rated as both one of the most challenging and one of the most meaningful aspects of high-dose psychedelic experiences.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Griffiths et al., in their 2006 landmark psilocybin study and subsequent follow-ups, found that participants who reported complete mystical experiences (which include ego dissolution as a core feature) rated the experience among the top five most personally meaningful events of their lives, alongside things like the birth of a child or the death of a parent. At 14-month follow-up, 67% of participants still rated it in their top five.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`And yet, in the same studies, participants also frequently describe intense fear during the dissolution itself. The experience of losing your self, even temporarily, even in a safe environment, is often terrifying. Because as long as you are identified with the ego, its dissolution feels exactly like dying.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`This is the paradox: the thing that produces the greatest therapeutic benefit is also the thing that produces the greatest psychological challenge. The studies on psilocybin for depression, addiction, and end-of-life anxiety consistently show that the depth of ego dissolution correlates with the magnitude of therapeutic outcome. The more completely the self dissolves, the more lasting the improvement.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Which means you can't get the benefit without going through the difficulty. There's no way to cherry-pick the insight while avoiding the terror. The terror is part of the insight. You learn that the self can come apart and you don't actually die. And that learning, that visceral, not-intellectual, full-body understanding that you are not your narrative, appears to be what produces lasting change.`}
        </p>

        <h2 className="font-serif text-2xl font-bold text-earth-900 mt-12 mb-4">
          The Dark Side
        </h2>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`I'm not going to pretend this is all upside.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Ego dissolution without proper support, without adequate preparation, without a safe environment, without someone grounded nearby, can be genuinely destabilizing. The clinical trials screen out people with psychotic spectrum disorders, personal or family history of schizophrenia, and other risk factors for a reason. For some people, dissolving the ego doesn't produce insight. It produces a crisis that can take months to recover from.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Even for psychologically healthy individuals, an unexpected or forced ego dissolution (which is what can happen when someone takes a higher dose than they intended, or has an experience in an unsafe environment) can result in lasting anxiety, derealization, and difficulty reintegrating. The self comes apart, and if the conditions aren't right, it doesn't go back together cleanly.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`The clinical programs mitigate this through careful screening, preparation, dosing protocols, and integration support. The recreational world mostly doesn't. And I think anyone who writes about ego dissolution has an obligation to say clearly: this is not something to pursue casually. The depth of the experience is exactly proportional to the risk if things go wrong.`}
        </p>

        <h2 className="font-serif text-2xl font-bold text-earth-900 mt-12 mb-4">
          Why the West Has a Particular Problem
        </h2>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          Western culture is built on a very specific model of selfhood. You are an individual. You have rights, preferences, goals, a personal brand. Your success or failure is yours. Your identity is yours. The entire economic and social infrastructure assumes a discrete, bounded self as the basic unit.
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          Ego dissolution is a direct challenge to that entire framework.
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`I think this is why the psychedelic renaissance provokes such polarized reactions. For some people, often those who feel trapped by their own self-narrative, imprisoned by patterns of rumination and self-criticism, the dissolution of the ego is liberation. The prison door opens. For others, those whose identity is tightly bound to their achievements, their control, their story, it's an existential threat.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Both reactions are valid. And both tell you something about the relationship between the person and their ego, which is to say, the relationship between the person and the story they've been telling themselves about who they are.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          The Eastern contemplative traditions have been working with this for millennia, and they generally agree on one thing: the self is not what it appears to be. Whether you arrive at that understanding through twenty years of meditation or twenty milligrams of psilocybin, the insight is the same. The question is what you do with it afterward.
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`And that question, the integration question, the "so now what?", is where the real work begins.`}
        </p>
      </>
    ),
    references: [
      {
        text: 'Nour, M.M., Evans, L., Nutt, D., & Carhart-Harris, R.L. (2016). Ego-dissolution and psychedelics: Validation of the Ego-Dissolution Inventory (EDI).',
        source: 'Frontiers in Human Neuroscience',
      },
      {
        text: 'Lebedev, A.V., et al. (2015). Finding the self by losing the self: Neural correlates of ego-dissolution under psilocybin.',
        source: 'Human Brain Mapping',
      },
      {
        text: 'Tagliazucchi, E., et al. (2016). Increased global functional connectivity correlates with LSD-induced ego dissolution.',
        source: 'Current Biology',
      },
      {
        text: 'Griffiths, R.R., et al. (2006). Psilocybin can occasion mystical-type experiences having substantial and sustained personal meaning and spiritual significance.',
        source: 'Psychopharmacology',
      },
      {
        text: 'Griffiths, R.R., et al. (2008). Mystical-type experiences occasioned by psilocybin mediate the attribution of personal meaning and spiritual significance 14 months later.',
        source: 'Journal of Psychopharmacology',
      },
      {
        text: 'Huxley, A. (1954). The Doors of Perception.',
        source: 'Chatto & Windus',
      },
      {
        text: 'Watts, A. (1962). The Joyous Cosmology: Adventures in the Chemistry of Consciousness.',
        source: 'Pantheon Books',
      },
      {
        text: 'Hume, D. (1739). A Treatise of Human Nature.',
        source: '',
      },
    ],
  },
  {
    slug: 'sacred-mushrooms',
    title: 'Sacred Mushrooms Through the Ages: A History That Was Almost Erased',
    category: 'History',
    date: 'Feb 26, 2026',
    readTime: '12 min read',
    heroGradient: 'from-gold-800 via-earth-800 to-mystic-900',
    excerpt:
      'The real history spans at least nine thousand years, crosses four continents, involves an act of cultural erasure that took centuries, and was nearly complete before a banker went to Oaxaca.',
    content: () => (
      <>
        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`The story most people know goes something like this: in the 1960s, Timothy Leary discovered psychedelics, everyone got high, Nixon got angry, and the government banned everything. Then, around 2006, some brave researchers at Johns Hopkins brought it all back.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`That story is wrong in almost every way that matters. It centers the wrong people, skips the most important chapters, and conveniently erases the fact that human beings have been using psychoactive mushrooms for somewhere between seven and nine thousand years, and that the cultures who carried that knowledge were systematically ignored, exploited, and damaged in the process.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          The real history is longer, darker, and more interesting. Let me try to tell it honestly.
        </p>

        <h2 className="font-serif text-2xl font-bold text-earth-900 mt-12 mb-4">
          The Oldest Evidence
        </h2>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`In the Tassili n'Ajjer plateau of southeastern Algeria, there are cave paintings dating to roughly 7,000\u20139,000 BCE. Among the images of animals and hunters, there's one figure that has generated decades of academic debate: a humanoid form with mushroom-shaped objects sprouting from its body and hands, sometimes called the "mushroom shaman" or the "bee-faced man."`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Ethnobotanist Giorgio Samorini and later Terence McKenna pointed to this figure as evidence that humans were using psychoactive mushrooms in North Africa thousands of years before recorded history. The identification is contested; some archaeologists argue the shapes could represent plants, ritual objects, or artistic abstractions that have nothing to do with fungi. The rock art is ambiguous by nature, and projecting modern psychedelic culture backward onto Neolithic images is a real methodological risk.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`But the broader point stands even without Tassili: humans have been seeking altered states of consciousness for as long as we've been human. Every culture on every continent has developed technologies for this, fermentation, plant medicines, breathwork, fasting, drumming, dance. The idea that consciousness alteration is a modern invention, or a uniquely Western one, or a product of the 1960s counterculture, is historically illiterate.`}
        </p>

        <h2 className="font-serif text-2xl font-bold text-earth-900 mt-12 mb-4">
          Mesoamerica: Flesh of the Gods
        </h2>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`The most extensive documented history of ceremonial mushroom use comes from Mesoamerica, and it's not ambiguous at all.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`The Aztecs called psilocybin mushrooms teonan\u00e1catl, literally "flesh of the gods" or "divine mushroom." Spanish colonial accounts from the 16th century, particularly those of Bernardino de Sahag\u00fan, describe elaborate ceremonies in which mushrooms were consumed for divination, healing, and communion with the divine. Sahag\u00fan's Florentine Codex, written in the 1570s, describes participants eating mushrooms with honey, then experiencing visions, weeping, and states of ecstasy or terror.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          The archaeological record goes much deeper. Mushroom stones, carved stone figures depicting mushroom forms, often combined with human or animal features, have been found throughout Guatemala and southern Mexico, dating as far back as 1000 BCE. More than 200 of these have been recovered. Whatever they represent, they indicate that mushrooms held significant cultural and spiritual weight in pre-Columbian Mesoamerica for at least three thousand years.
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`The Spanish colonizers, predictably, tried to stamp it out. Mushroom ceremonies were declared idolatry and suppressed under the Inquisition. The practices didn't disappear; they went underground, preserved in remote indigenous communities, particularly among the Mazatec people of Oaxaca, Mexico. They survived for four hundred years in secret.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          And then a banker from New York showed up.
        </p>

        <h2 className="font-serif text-2xl font-bold text-earth-900 mt-12 mb-4">
          The Wasson Problem
        </h2>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`R. Gordon Wasson was a vice president at J.P. Morgan and an amateur mycologist. In 1955, he traveled to the village of Huautla de Jim\u00e9nez in Oaxaca, where he participated in a velada, a mushroom healing ceremony, led by a Mazatec curandera named Mar\u00eda Sabina. He became, by his own account, the first known outsider to participate in such a ceremony.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Two years later, Wasson published an article in Life magazine titled "Seeking the Magic Mushroom." It was a sensation. The article introduced psilocybin mushrooms to mainstream Western culture and triggered a wave of interest that would eventually bring tourists, hippies, researchers, and opportunists flooding into Huautla de Jim\u00e9nez.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`The consequences for Mar\u00eda Sabina and her community were devastating. The influx of outsiders disrupted the village. The sacred ceremonies were commodified and trivialized. Sabina herself was ostracized by her community, who blamed her for revealing the mushrooms to foreigners. Her house was burned down. She spent her final years in poverty, saying that the mushrooms had lost their power because they had been profaned.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`This is the part of the history that psychedelic enthusiasts often skip. The Western "discovery" of psilocybin mushrooms came at a direct cost to the people who had been stewarding that knowledge for centuries. Wasson didn't intend to cause harm; by most accounts he had genuine respect for the Mazatec tradition. But intent doesn't undo impact.`}
        </p>

        <h2 className="font-serif text-2xl font-bold text-earth-900 mt-12 mb-4">
          The Laboratory
        </h2>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`While Wasson was publishing in Life, the chemistry was moving forward independently. Albert Hofmann, the Swiss chemist who had accidentally discovered LSD in 1943, received samples of Psilocybe mexicana from Wasson and, in 1958, successfully isolated and synthesized psilocybin and psilocin. For the first time, the active compounds could be produced in a laboratory, measured in precise doses, and administered in controlled settings.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`This opened the door to clinical research. Between 1960 and 1970, hundreds of studies were published on psychedelics. The work was wide-ranging: psychedelic-assisted psychotherapy for alcoholism, depression, anxiety in terminal cancer patients, and the study of consciousness itself. Some of it was rigorous. Some of it was sloppy. Some of it was ethically horrifying; the CIA's MK-Ultra program being the most notorious example.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`And then there was Leary. Timothy Leary, a psychology lecturer at Harvard, launched the Harvard Psilocybin Project in 1960 with Richard Alpert (later Ram Dass). The project began as legitimate research and ended as spectacle. Leary's increasingly public advocacy for psychedelic use, his confrontational style, and his famous exhortation to "turn on, tune in, drop out" made him a counterculture icon and a political liability. He was fired from Harvard in 1963. Nixon would later call him "the most dangerous man in America."`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Whether Leary helped or hurt the cause of psychedelic science is still debated, and I'm genuinely not sure there's a clean answer. His advocacy brought awareness. It also brought backlash. And the backlash was nuclear.`}
        </p>

        <h2 className="font-serif text-2xl font-bold text-earth-900 mt-12 mb-4">
          The Shutdown
        </h2>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          The Controlled Substances Act of 1970 classified psilocybin, LSD, mescaline, and DMT as Schedule I substances, defined as having high potential for abuse, no currently accepted medical use, and no accepted safety for use under medical supervision.
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          Every part of that classification was wrong, and it was wrong on purpose.
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`The scheduling wasn't driven by science. It was driven by politics. The Nixon administration explicitly targeted psychedelics as part of a broader campaign to criminalize and marginalize the counterculture and the anti-war movement. John Ehrlichman, Nixon's domestic policy advisor, said it plainly in a 1994 interview: "We knew we couldn't make it illegal to be either against the war or Black, but by getting the public to associate the hippies with marijuana and Blacks with heroin, and then criminalizing both heavily, we could disrupt those communities."`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Psychedelics got swept into this political operation. The Schedule I designation didn't just make possession a crime; it made research effectively impossible. To study a Schedule I substance, you needed DEA approval, an FDA investigational new drug application, institutional review board clearance, and a willingness to build your career on a topic that would make you professionally radioactive.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          Almost nobody was willing. For thirty years, from roughly 1970 to 2000, psychedelic research in the United States essentially stopped. Three decades of potential scientific progress, erased by political calculation.
        </p>

        <h2 className="font-serif text-2xl font-bold text-earth-900 mt-12 mb-4">
          The Long Silence and the Return
        </h2>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          The renaissance, when it came, was quiet.
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          In the 1990s, a small number of researchers began the painstaking process of navigating the regulatory obstacles. Rick Doblin, who had founded the Multidisciplinary Association for Psychedelic Studies (MAPS) in 1986, spent years building relationships with the FDA and DEA. Franz Vollenweider in Zurich published careful neuroimaging studies of psilocybin in the late 1990s. The groundwork was being laid by people with enormous patience and a long-term vision.
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`The breakthrough came in 2006, when Roland Griffiths at Johns Hopkins published "Psilocybin can occasion mystical-type experiences having substantial and sustained personal meaning and spiritual significance" in Psychopharmacology. It was the first rigorously designed, placebo-controlled study of psilocybin in healthy volunteers in nearly four decades. The results were remarkable: over 60% of participants rated the experience as among the most meaningful of their lives, and the effects persisted at 14-month follow-up.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`The Griffiths study didn't just produce data. It produced credibility. Here was Johns Hopkins, one of the most prestigious medical institutions in the world, publishing in a peer-reviewed journal that psilocybin could produce profound, lasting, positive psychological changes. The door cracked open.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          What followed was an accelerating cascade. Imperial College London launched its own psilocybin research program under David Nutt and Robin Carhart-Harris. NYU began studying psilocybin for end-of-life anxiety. MAPS advanced MDMA-assisted therapy for PTSD through Phase 3 clinical trials. The FDA granted breakthrough therapy designation to psilocybin for treatment-resistant depression in 2018 and to MDMA for PTSD in 2017.
        </p>

        <h2 className="font-serif text-2xl font-bold text-earth-900 mt-12 mb-4">
          The New Landscape
        </h2>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          The legal and regulatory landscape is now shifting faster than most people in the field expected. Oregon became the first state to legalize regulated psilocybin services through Measure 109 in 2020, with the first licensed service centers opening in 2023. Colorado followed with Proposition 122, which decriminalized psilocybin and created a framework for regulated therapeutic use. Cities across the country, Denver, Oakland, Santa Cruz, Seattle, Ann Arbor, Washington D.C., have decriminalized or deprioritized enforcement of psychedelic possession.
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Australia became the first country to reschedule psilocybin and MDMA for therapeutic use in 2023. Canada has granted exemptions for psilocybin-assisted therapy in palliative care. The global momentum is real, and it's not slowing down.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`But there's a tension at the center of this momentum, and I think it's one that deserves more honest attention than it usually gets.`}
        </p>

        <h2 className="font-serif text-2xl font-bold text-earth-900 mt-12 mb-4">
          The Appropriation Question
        </h2>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`The modern psychedelic renaissance is, in large part, a story of Western science "discovering" what indigenous cultures have known and practiced for millennia. The knowledge that psilocybin mushrooms can produce profound healing experiences isn't new. It's ancient. And the people who preserved that knowledge, often at great personal cost, through centuries of colonial suppression, have received very little of the credit, recognition, or financial benefit from the current boom.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          The psychedelic industry is now projected to be worth billions. Pharmaceutical companies are patenting synthetic psilocybin formulations. Retreat centers charge thousands of dollars for guided mushroom experiences. Venture capital flows into psychedelic startups. And the Mazatec communities who kept this knowledge alive through four hundred years of colonial repression are still, by and large, poor and marginalized.
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`This is not a comfortable thing to sit with, and I don't think there are easy answers. The clinical research is genuinely important; it's producing treatments for depression, PTSD, addiction, and end-of-life distress that could help millions of people. I don't think the response is to stop the research or shut down the clinical programs. But I do think the response includes acknowledging the debt, centering indigenous voices in conversations about psychedelic policy, and building reciprocity into the economic structures that are being created.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          Organizations like the Indigenous Peyote Conservation Initiative and the Chacruna Institute are doing important work in this space, advocating for indigenous rights and pushing back against the extractive dynamics of the psychedelic industry. Whether the industry listens remains to be seen.
        </p>

        <h2 className="font-serif text-2xl font-bold text-earth-900 mt-12 mb-4">
          What the History Teaches
        </h2>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`If there's one thing I take from this long, tangled history, it's this: every era gets the relationship with psychedelics it deserves.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          Indigenous cultures embedded these substances in frameworks of community, ceremony, and reciprocity. They treated them as sacred. And the practices endured for thousands of years.
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          The 1960s West approached them with a combination of genuine curiosity and spectacular recklessness. The result was extraordinary creativity and devastating political backlash.
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          The current moment is approaching them through the lens of clinical science and commercial opportunity. Whether that produces lasting benefit or just another cycle of enthusiasm and prohibition depends on whether we learn from the previous chapters.
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`The mushrooms have been here longer than any of our institutions. They'll be here after we're gone. The question is whether we can be smarter this time about how we relate to them, and to the people who understood them long before we did.`}
        </p>
      </>
    ),
    references: [
      {
        text: 'Samorini, G. (1992). The oldest representations of hallucinogenic mushrooms in the world (Sahara Desert, 9000\u20137000 B.P.).',
        source: 'Integration: Journal of Mind-Moving Plants and Culture',
      },
      {
        text: 'Wasson, R.G. (1957). Seeking the magic mushroom.',
        source: 'Life Magazine',
      },
      {
        text: 'Hofmann, A. (1958). Psilocybin and psilocin, two psychotropic tryptamines of Mexican origin.',
        source: 'Helvetica Chimica Acta',
      },
      {
        text: 'Sahag\u00fan, B. de (1577). Historia General de las Cosas de Nueva Espa\u00f1a (Florentine Codex).',
        source: '',
      },
      {
        text: 'Griffiths, R.R., et al. (2006). Psilocybin can occasion mystical-type experiences having substantial and sustained personal meaning and spiritual significance.',
        source: 'Psychopharmacology',
      },
      {
        text: 'Schultes, R.E. & Hofmann, A. (1979). Plants of the Gods: Their Sacred, Healing, and Hallucinogenic Powers.',
        source: 'McGraw-Hill',
      },
      {
        text: 'Guzm\u00e1n, G. (2008). Hallucinogenic mushrooms in Mexico: An overview.',
        source: 'Economic Botany',
      },
      {
        text: "Ehrlichman, J. (1994). Interview with Dan Baum. Published in Baum, D. (2016). Legalize it all.",
        source: "Harper's Magazine",
      },
      {
        text: 'Doblin, R. (2001). Regulation of the medical use of psychedelics and marijuana.',
        source: 'Doctoral dissertation, Harvard University',
      },
    ],
  },
  {
    slug: 'body-keeps-the-trip',
    title: 'The Body Keeps the Trip: Somatic Approaches to Psychedelic Integration',
    category: 'Wellness',
    date: 'Feb 19, 2026',
    readTime: '9 min read',
    heroGradient: 'from-forest-700 via-forest-900 to-earth-900',
    excerpt:
      'Most psychedelic integration happens from the neck up. The problem is that we treat the mind as if it exists independently of the body.',
    content: () => (
      <>
        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          Most psychedelic integration happens from the neck up. You sit in a room (or on a Zoom call) and you talk about what happened. You narrate the visions, try to articulate the insights, wrestle the ineffable into language. And then you go home and wonder why, three weeks later, you feel like nothing has changed.
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`I think there's a reason for that, and it has to do with a fundamental oversight in how Western psychology approaches both psychedelics and healing in general: we treat the mind as if it exists independently of the body. As if insight is sufficient. As if understanding something intellectually is the same as processing it.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`It's not. And a growing body of work, from trauma research, somatic psychology, and the neuroscience of embodiment, suggests that what happens in the body during and after a psychedelic experience may matter as much as what happens in the mind.`}
        </p>

        <h2 className="font-serif text-2xl font-bold text-earth-900 mt-12 mb-4">
          The Mind-Body Split
        </h2>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          Western psychology inherited a problem from Descartes. The idea that mind and body are separate substances (res cogitans and res extensa) has shaped how we think about healing for four hundred years. Therapy is talk. Insight is cognitive. The body is the thing you transport your brain around in.
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`This framework has produced enormous achievements. Cognitive behavioral therapy works. Psychopharmacology works. I'm not dismissing any of it. But the framework has a blind spot, and that blind spot becomes a canyon when you're trying to integrate a psychedelic experience.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Psychedelic experiences are not primarily cognitive events. Ask anyone who's had a significant psilocybin or MDMA session and they'll describe it in the language of the body long before they describe it in the language of the mind. Waves of sensation. Energy moving through the chest. Shaking. Crying. Nausea that feels emotional rather than physical. The sense that something is being released from the muscles, the gut, the jaw. The body doesn't just observe the psychedelic experience; it participates in it, stores it, and processes it through channels that talking alone can't access.`}
        </p>

        <h2 className="font-serif text-2xl font-bold text-earth-900 mt-12 mb-4">
          What Trauma Research Tells Us
        </h2>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Bessel van der Kolk's The Body Keeps the Score, published in 2014, made a simple argument that upended a lot of clinical assumptions: trauma is stored in the body, not just the mind. Traumatic experiences leave physiological imprints, chronic tension patterns, dysregulated autonomic responses, disrupted interoception. You can understand your trauma intellectually and still be held hostage by it physically. The body hasn't gotten the memo that the threat is over.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Van der Kolk's work draws on decades of research showing that traumatic memories are encoded differently than normal memories. They're stored not as coherent narratives but as fragmented sensory and somatic impressions, flashes, sounds, body states. This is why trauma survivors often can't "think" their way out of a flashback. The memory isn't in the thinking brain. It's in the nervous system.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`The implications for psychedelic integration are significant. If psychedelics surface traumatic material (and they frequently do, particularly at higher doses) that material often emerges somatically. People don't just remember difficult experiences during a psilocybin session. They re-experience them in the body. Muscle tension, constricted breathing, pain in specific areas, trembling, waves of heat or cold. These aren't side effects. They're the body's way of processing what it's been holding.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`And if the integration process is purely verbal, if the whole protocol is "let's talk about what happened," then the somatic dimension of the experience goes unprocessed. The insights may fade because they were never fully embodied.`}
        </p>

        <h2 className="font-serif text-2xl font-bold text-earth-900 mt-12 mb-4">
          Somatic Experiencing and the Wisdom of Shaking
        </h2>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Peter Levine developed Somatic Experiencing (SE) in the 1970s based on an observation from animal behavior: wild animals experience potentially traumatic events constantly, being chased by predators, fighting for territory, but they don't develop PTSD. After a threat, an animal will literally shake, tremor, and discharge the survival energy, then return to baseline. The stress cycle completes.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Humans, Levine argued, have the same discharge mechanisms. But our neocortex, our thinking brain, overrides them. We suppress the shaking because it feels weird. We "hold it together" because that's what our culture demands. And so the survival energy stays stuck. The stress cycle never completes. The body remains in a state of chronic, low-grade activation.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`SE works by helping people track and complete these interrupted body processes. Through a practice Levine calls "pendulation," moving attention slowly between areas of activation and areas of calm in the body, the stuck energy can gradually release. It's not dramatic. It's not cathartic in the Hollywood sense. It's a slow, careful process of teaching the nervous system that it's safe to let go.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          The relevance to psychedelic integration is direct. Psychedelics often activate exactly the kind of body-level processing that SE is designed to support. The trembling, the emotional release, the waves of sensation: these are the body completing stress cycles that may have been interrupted for years or decades. A somatic approach to integration {`doesn't`} just honor these processes. It actively supports them.
        </p>

        <h2 className="font-serif text-2xl font-bold text-earth-900 mt-12 mb-4">
          The Polyvagal Lens
        </h2>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Stephen Porges's Polyvagal Theory, introduced in 1994 and developed extensively since, offers another framework for understanding the body's role in psychedelic experience.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          The theory centers on the vagus nerve, the longest cranial nerve in the body, running from the brainstem through the heart, lungs, and gut. Porges identified three distinct autonomic states mediated by different branches of the vagus: the ventral vagal state (social engagement, safety, connection), the sympathetic state (fight or flight, mobilization), and the dorsal vagal state (freeze, collapse, shutdown).
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          Most people cycle through these states throughout the day without awareness. But trauma can lock people into chronic sympathetic activation (hypervigilance, anxiety) or dorsal vagal collapse (numbness, dissociation, depression). The system gets stuck.
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Psychedelics appear to move people through these autonomic states rapidly and unpredictably. This is partly why the experience can feel like an emotional roller coaster; you're not just having thoughts and visions. Your autonomic nervous system is cycling through states it may have been avoiding for years. The terror you feel might be sympathetic activation. The peaceful dissolution might be a shift into ventral vagal safety. The heaviness or paralysis might be dorsal vagal.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Understanding this doesn't require accepting Polyvagal Theory uncritically; there are legitimate critiques of some of Porges's specific neuroanatomical claims. But the broad framework, that the autonomic nervous system plays a central role in emotional experience and that psychedelics engage this system directly, is well-supported and practically useful.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          For integration, the polyvagal lens suggests that practices which help regulate the autonomic nervous system, breathing techniques, gentle movement, co-regulation with a trusted other, might be as important as cognitive processing in stabilizing the gains from a psychedelic experience.
        </p>

        <h2 className="font-serif text-2xl font-bold text-earth-900 mt-12 mb-4">
          Breathwork: The Overlap
        </h2>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`The connection between breathwork and psychedelic states isn't a metaphor. It's a physiological overlap.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          Stanislav Grof, one of the pioneers of psychedelic research in the 1960s, developed Holotropic Breathwork specifically as a non-pharmacological method for accessing altered states of consciousness after psychedelics were banned. The technique, extended periods of accelerated breathing combined with evocative music, produces experiences that participants frequently describe in terms virtually identical to psychedelic reports: ego dissolution, emotional catharsis, visionary content, somatic energy release.
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`The mechanism isn't entirely clear, but it likely involves changes in blood CO2 levels, altered cerebral blood flow, and engagement of the autonomic nervous system. Whatever the mechanism, the phenomenological overlap is striking enough to suggest that the body has its own pathways to altered states, and that breathwork during the integration period might help consolidate and extend the opening that psychedelics create.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          Even simpler practices matter. Slow, diaphragmatic breathing activates the ventral vagal pathway, promoting the sense of safety that is foundational to processing difficult material. Box breathing, coherent breathing, and basic pranayama techniques all shift autonomic tone toward parasympathetic dominance, the {`"rest and digest"`} state in which the body is most able to heal and integrate.
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`I'm not claiming that breathwork is equivalent to psilocybin. It's not. But I am saying that the body already knows how to process intensity, and conscious breathing is one of the most accessible ways to support that process.`}
        </p>

        <h2 className="font-serif text-2xl font-bold text-earth-900 mt-12 mb-4">
          Tremoring and TRE
        </h2>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`David Berceli's Tension and Trauma Release Exercises (TRE) are based on a straightforward premise: the human body has a natural tremoring mechanism for discharging stress, and most of us have suppressed it.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`TRE uses a series of simple exercises to fatigue specific muscle groups, particularly the psoas, the deep hip flexor that Berceli and others have called the "muscle of the soul" for its role in the fight-flight response. Once fatigued, these muscles begin to tremor spontaneously. The practitioner then allows the tremoring to spread through the body, releasing stored tension without cognitive processing.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`The evidence base for TRE is still developing; we're talking about pilot studies and clinical observations rather than large RCTs. But the anecdotal reports from practitioners who combine TRE with psychedelic integration are consistent: the tremoring seems to help discharge physical tension that arises during psychedelic sessions, and regular TRE practice during the integration period appears to support the consolidation of changes.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`This connects back to Levine's observation about animals completing the stress cycle. The shake is the discharge. And if psychedelics are activating old survival energy, releasing it from the muscles and tissues where it's been stored, then giving the body a way to complete that release might be a critical piece of the integration puzzle.`}
        </p>

        <h2 className="font-serif text-2xl font-bold text-earth-900 mt-12 mb-4">
          The Neuroplasticity Window
        </h2>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Here's where the timing question becomes interesting.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`There's growing evidence that psychedelics open a window of heightened neuroplasticity, a period after the acute experience during which the brain is more receptive to structural and functional change. A 2024 study in Cell found evidence of dendritic spine remodeling in the medial frontal cortex following a single dose of psilocybin, with changes persisting for weeks. BDNF (brain-derived neurotrophic factor), a protein critical for neural growth and plasticity, appears to be upregulated in the days following psychedelic experience.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`This window, conservatively 24 to 72 hours, possibly extending for weeks, is when the brain is most amenable to forming new patterns. And here's what I find fascinating: physical activity, particularly aerobic exercise, is one of the most potent natural stimulators of BDNF production. The neuroplasticity window opened by psilocybin may overlap synergistically with the neuroplasticity effects of exercise.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`This is largely theoretical at this point. No one has run a controlled trial specifically examining whether exercise during the post-psychedelic neuroplasticity window amplifies therapeutic outcomes. But the mechanistic logic is sound, and the practical implication is worth considering: what you do with your body in the days and weeks after a psychedelic experience might matter more than we currently appreciate.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Movement practices, yoga, dance, even walking in nature; these aren't just "nice to do" during integration. They may be actively capitalizing on a biological window of opportunity that the psychedelic has opened.`}
        </p>

        <h2 className="font-serif text-2xl font-bold text-earth-900 mt-12 mb-4">
          {`What I'm Not Saying`}
        </h2>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          I want to be clear about the limitations here because this space is drowning in people who present theoretical frameworks as established fact.
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`Most of the somatic integration literature is based on clinical observation, case studies, and theoretical extrapolation from adjacent research domains. We have strong evidence that psychedelics increase neuroplasticity. We have strong evidence that trauma is stored somatically. We have strong evidence that physical practices affect autonomic regulation. What we don't have yet is a robust body of controlled trials specifically examining somatic approaches to psychedelic integration versus talk-based approaches.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`The logic is compelling. The anecdotal evidence is consistent. The mechanistic rationale is sound. But "compelling logic" and "consistent anecdotes" are not the same as "proven." I think somatic integration practices are almost certainly important. I'm not prepared to say we know exactly how important, or which specific practices are most effective, or what the optimal protocols look like.`}
        </p>

        <p className="text-lg leading-relaxed text-earth-800 mb-6">
          {`What I will say is this: if your integration practice is entirely verbal, if the whole process is sitting in a chair and narrating your experience, you're probably leaving something on the table. The body had the experience too. It deserves to be part of the conversation.`}
        </p>
      </>
    ),
    references: [
      {
        text: 'Van der Kolk, B. (2014). The Body Keeps the Score: Brain, Mind, and Body in the Healing of Trauma.',
        source: 'Viking',
      },
      {
        text: 'Levine, P.A. (1997). Waking the Tiger: Healing Trauma.',
        source: 'North Atlantic Books',
      },
      {
        text: 'Porges, S.W. (2011). The Polyvagal Theory: Neurophysiological Foundations of Emotions, Attachment, Communication, and Self-Regulation.',
        source: 'W.W. Norton',
      },
      {
        text: 'Grof, S. (1988). The Adventure of Self-Discovery: Dimensions of Consciousness and New Perspectives in Psychotherapy.',
        source: 'SUNY Press',
      },
      {
        text: 'Berceli, D. (2005). Trauma Releasing Exercises: A Revolutionary New Method for Stress/Trauma Recovery.',
        source: 'BookSurge',
      },
      {
        text: 'Ly, C., et al. (2018). Psychedelics promote structural and functional neural plasticity.',
        source: 'Cell Reports',
      },
      {
        text: 'Shao, L.X., et al. (2021). Psilocybin induces rapid and persistent growth of dendritic spines in frontal cortex in vivo.',
        source: 'Neuron',
      },
      {
        text: 'Sleiman, S.F., et al. (2016). Exercise promotes the expression of brain derived neurotrophic factor (BDNF) through the action of the ketone body \u03B2-hydroxybutyrate.',
        source: 'eLife',
      },
    ],
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug);
}
