---
theme: default
title: "Djangonaut Space, Session 7"
info: |
  Linda Angulo Lopez. Eight weeks in Djangonaut Space, Session 7, 12 October to 6 December 2026, told week by week. Written with the help of Claude (Anthropic).
author: Linda Angulo Lopez
colorSchema: light
aspectRatio: 16/9
transition: fade
mdc: true
exportFilename: Djangonaut_Session7
class: accent-cover
---

<div class="kicker">Djangonaut Space · Session 7 · Team Accessibility</div>

# Contributing to Django, one weekend at a time

<p class="lead" style="color:#fff; opacity:1; max-width:70%">For eight weeks, from 12 October to 6 December 2026, I joined a group mentoring programme for new Django contributors. I had four hours a weekend, a new codebase, and one small bug on a contact form.</p>

<div class="foot"><span>Linda Angulo Lopez</span><span>lindangulopez.github.io/djangonaut-session7</span></div>

<!--
Mirror of the IOSP Leiden 2026 recap: an intro, an agenda, then one section per stage, each with a "See it for yourself" link to the live page.
-->

---

<div class="kicker">The programme</div>

## Eight weeks, in five stages

<div class="grid grid-cols-5 gap-3 mt-6">
<div class="card"><div class="head"><div class="when">Week 1</div><h3>Assigned</h3></div><div class="body">Issue #2904: the contact form's e-mail field.</div></div>
<div class="card"><div class="head"><div class="when">Weeks 2–4</div><h3>Reviewed</h3></div><div class="body">Pull request #2924, two reviews, one test removed.</div></div>
<div class="card"><div class="head"><div class="when">Weeks 2–5</div><h3>Learned</h3></div><div class="body">The tutorial, Orca, and PR #21173 on the ORM.</div></div>
<div class="card"><div class="head warm-bg"><div class="when warm">Weeks 6–8</div><h3>Proposed</h3></div><div class="body">Issue #2929: <code>CONTRIBUTING.md</code> and <code>codemeta.json</code>.</div></div>
<div class="card"><div class="head warm-bg"><div class="when warm">From 19 Dec</div><h3>Next</h3></div><div class="body">GeoDjango, PostGIS and QGIS.</div></div>
</div>

<p class="muted mt-6">Weekends only since 23 October, about 4 hours each. Every weekend ends on one output.</p>

---

<div class="kicker">Week 1, Assigned</div>

## A plain text box where an e-mail box should be

<div class="grid grid-cols-[3fr_2fr] gap-6 mt-2">
<div>

On the Django Software Foundation's [contact form](https://www.djangoproject.com/contact/foundation/), a phone showed the ordinary keyboard for the E-mail field, and neither field told the browser what it was for. Assigned to me on 15 October.

The field was right, the widget was wrong:

```python
email = forms.EmailField(
    widget=forms.TextInput(attrs={"class": "required"}),  # line 28
```

An `EmailField` draws `<input type="email">` by default. An explicit `TextInput` overrides it. The field validates; the widget is what gets drawn.

</div>
<div>
<div class="panel soft">
<div class="big">2016</div>
<p class="small">The year the field became an <code>EmailField</code> but kept its <code>TextInput</code>. Nothing checked the input type until 2025.</p>
</div>
<div class="panel mt-3">
<div class="kicker">The standard</div>
<p class="small">WCAG 2.2, success criterion 1.3.5, Identify Input Purpose, level AA.</p>
</div>
</div>
</div>

---

<div class="kicker">Weeks 2–4, Reviewed</div>

## Pull request #2924: smaller each time

<div class="grid grid-cols-[3fr_2fr] gap-6 mt-2">
<div class="dots">

- **23 Oct.** Opened, with a test that failed before the fix and passed after it. All 15 tests in the `contact` app pass.
- **24 Oct.** First review: take the AI agent out of the commit's co-authors. AI use stays disclosed in the pull request. Amended and force-pushed.
- **26 Oct.** Approved by a contributor, with read-only permissions. The merge needs a maintainer.
- **29 Oct.** A maintainer asks whether the test is needed. I offer two options, then remove it.

<div class="flex gap-8 mt-5">
<div><div class="big">1</div><div class="small muted">file changed</div></div>
<div><div class="big">+2 −2</div><div class="small muted">lines</div></div>
<div><div class="big">3</div><div class="small muted">forms fixed</div></div>
</div>

</div>
<SeeIt href="https://lindangulopez.github.io/djangonaut-session7/reading-list/guide-2904/" img="djangonaut/guide2904.png" />
</div>

---

<div class="kicker">Week 4, the test question</div>

<div class="flex flex-col justify-center h-4/5">
<div style="border-left:5px solid var(--c-accent); padding-left:1.2rem; font-size:1.9rem; line-height:1.3; font-weight:600">
"I wonder if the test is needed since it's kind of just testing built-in Django features. The form changes are declarative."
</div>
<p class="muted mt-2" style="padding-left:1.4rem">Adam, maintainer of djangoproject.com, 29 October 2026</p>

<div class="panel warm-soft mt-8">
<b>What I learned.</b> A test for declarative code has to earn its place: it should fail only if the fix is undone, not if Django changes. And when a maintainer asks if a test is needed, the question is often the answer.
</div>
</div>

---

<div class="kicker">Weeks 2–5, Learned</div>

## Listening to the form with a screen reader

<div class="grid grid-cols-[2fr_3fr] gap-6 mt-2">
<div>

I tested the form with Orca, the screen reader that comes with Ubuntu, in Firefox, and wrote the steps as a 15-minute tutorial anyone can follow.

<div class="panel mt-3">
<div class="kicker">What Orca said, before the fix</div>
<p>Name: <i>"Name : entry required."</i></p>
<p>E-mail: <i>"E-mail : entry required."</i></p>
</div>

<p class="small muted mt-3">The two fields sound the same. <code>autocomplete</code> is usually not read aloud: it helps autofill, not speech. So I also check the developer tools and the phone keyboard.</p>

</div>
<SeeIt href="https://lindangulopez.github.io/djangonaut-session7/accessibility-track/" img="djangonaut/track.png" />
</div>

---

<div class="kicker">Weeks 5–6, Learned</div>

## Reading the ORM: pull request #21173

<div class="grid grid-cols-[2fr_3fr] gap-6 mt-2">
<div>

The new reference docs for `ForeignObject` say its `on_delete` "behaves the same as `ForeignKey.on_delete`".

Tests on Django's main branch, run on 12 November, show that `SET_NULL`, `SET_DEFAULT` and `SET()` raise a `FieldError` with a `ForeignObject`.

<div class="panel soft mt-3">
<b>Six sessions of about an hour</b> to understand why, before I say anything on the pull request. It ends on a decision: a comment, a new ticket, or a question for my Navigator.
</div>

</div>
<SeeIt href="https://lindangulopez.github.io/djangonaut-session7/reading-list/guide-21173/" img="djangonaut/guide21173.png" />
</div>

---

<div class="kicker">Weeks 6–8, Proposed</div>

## Issue #2929: one proposal, three small pull requests

<div class="grid grid-cols-[3fr_2fr] gap-6 mt-2">
<div>

I asked for a `CONTRIBUTING.md`, a `codemeta.json`, and maybe `AUTHORS` and `CITATION.cff`, in one pull request. On 19 November the answer came back smaller:

<div style="border-left:5px solid var(--c-warm); padding-left:1rem; margin:.6rem 0; font-size:1.15rem; font-weight:600">
"I think this will go smoother as a few small PRs instead of one big one, and the pyproject.toml bit is the nicest place to start."
</div>

| Step | What | Gate |
| --- | --- | --- |
| 1 | `license` and `[project.urls]` in `pyproject.toml` | None: "nothing to discuss there" |
| 2 | An outline of `CONTRIBUTING.md`, on the issue | None |
| 3 | `CONTRIBUTING.md` | The outline agreed |
| 4 | `codemeta.json`, from `pyproject.toml` | Step 1 merged |

</div>
<SeeIt href="https://lindangulopez.github.io/djangonaut-session7/accessibility-track/#plan-19-november-2026-follow-2904-do-2929" img="djangonaut/plan.png" />
</div>

---

<div class="kicker">From 19 December, Next</div>

## GeoDjango: the same table in Django and in QGIS

<div class="grid grid-cols-[2fr_3fr] gap-6 mt-2">
<div>

Six weekend sessions of 1.5 to 2 hours join Django to GIS, on a small register of trees in the Forest of Fontainebleau.

<div class="dots">

- A GeoDjango project on PostgreSQL and PostGIS
- The same table edited in QGIS
- A GeoJSON view, and a test
- A public repository with a `codemeta.json` and a SWHID

</div>
</div>
<SeeIt href="https://lindangulopez.github.io/djangonaut-session7/geodjango-track/" img="djangonaut/geo.png" />
</div>

---

<div class="kicker">What I take home</div>

## If … then …

<div class="grid grid-cols-2 gap-4 mt-4">
<div class="panel"><b>If</b> a contributor approves with read-only permissions, <b>then</b> it is a review, not a merge: a maintainer decides.</div>
<div class="panel"><b>If</b> a maintainer asks whether a test is needed, <b>then</b> the question is often the answer.</div>
<div class="panel"><b>If</b> I want to claim a Django ticket, <b>then</b> it is the owner field on Trac, not a comment on GitHub.</div>
<div class="panel"><b>If</b> a proposal is big, <b>then</b> splitting it makes each part easy to say yes to.</div>
<div class="panel"><b>If</b> Git knows nothing about the remote branch, <b>then</b> <code style="white-space:nowrap">--force-with-lease</code> needs the commit named.</div>
<div class="panel"><b>If</b> I only have weekends, <b>then</b> a review is a contribution too.</div>
</div>

---
class: accent-cover
---

<div class="kicker">Follow along</div>

# Every step, with the commands, is on the site

<div class="mt-8 text-lg" style="color:#fff">

lindangulopez.github.io/djangonaut-session7

</div>

<p class="mt-6" style="color:#e8f4f0">Pull request #2924 waits for a maintainer. Issue #2929 starts on 21–22 November.</p>

<div class="foot"><span>Linda Angulo Lopez · Djangonaut Space, Session 7</span><span>Written with the help of Claude (Anthropic)</span></div>
