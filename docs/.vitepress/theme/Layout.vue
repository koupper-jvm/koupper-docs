<script setup>
import DefaultTheme from "vitepress/theme";
import { ref, onMounted } from "vue";

const particles = ref([]);

onMounted(() => {
  // Generate floating particles for the hero background
  const p = [];
  for (let i = 0; i < 40; i++) {
    p.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 3,
      dur: 12 + Math.random() * 20,
      delay: Math.random() * -20,
      opacity: 0.15 + Math.random() * 0.25,
    });
  }
  particles.value = p;
});
</script>

<template>
  <DefaultTheme.Layout>
    <template #layout-top>
      <!-- Ambient glow orbs -->
      <div class="kpr-ambient kpr-ambient-a" aria-hidden="true"></div>
      <div class="kpr-ambient kpr-ambient-b" aria-hidden="true"></div>
    </template>

    <template #home-hero-before>
      <section class="kpr-home-shell">
        <!-- Floating particles -->
        <div class="kpr-particles" aria-hidden="true">
          <svg width="100%" height="100%" style="position:absolute;inset:0;pointer-events:none">
            <circle
              v-for="p in particles"
              :key="p.id"
              :cx="`${p.x}%`"
              :cy="`${p.y}%`"
              :r="p.size"
              fill="currentColor"
              class="kpr-particle"
              :style="{
                color: p.id % 3 === 0 ? 'var(--kpr-accent)' : p.id % 3 === 1 ? 'var(--kpr-accent-2)' : 'var(--vp-c-brand-2)',
                opacity: p.opacity,
                animationDuration: `${p.dur}s`,
                animationDelay: `${p.delay}s`,
              }"
            />
          </svg>
        </div>

        <div class="kpr-hero-columns">
          <div class="kpr-hero-copy">
            <p class="kpr-eyebrow">Koupper Runtime</p>
            <h1 class="kpr-title">
              Build production<br>
              <span class="kpr-title-accent">automation</span> that scales
            </h1>
            <p class="kpr-subtitle">
              Ship workers, runtime routes, and infra automations using a Kotlin-first CLI,
              an Octopus daemon, and a provider catalog designed for real operations.
            </p>
            <div class="kpr-cta-row">
              <a class="kpr-cta kpr-cta-primary" href="/getting-started">
                <span class="kpr-cta-icon">→</span>
                Get Started
              </a>
              <a class="kpr-cta" href="/commands/">Commands</a>
              <a class="kpr-cta" href="/architecture/">Architecture</a>
            </div>
            <ol class="kpr-flow-list">
              <li><span>01</span>Scaffold locally with templates</li>
              <li><span>02</span>Run through the Octopus daemon</li>
              <li><span>03</span>Wire providers & deploy to production</li>
            </ol>
          </div>

          <aside class="kpr-orbit-panel" aria-label="Runtime architecture preview">
            <div class="kpr-orbit-ring kpr-orbit-ring-1" aria-hidden="true"></div>
            <div class="kpr-orbit-ring kpr-orbit-ring-2" aria-hidden="true"></div>
            <div class="kpr-orbit-center">
              <div class="kpr-orbit-center-inner">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
                </svg>
                <span>Octopus</span>
              </div>
            </div>
            <div class="kpr-orbit-node kpr-orbit-node-a">
              <span class="kpr-orbit-node-dot"></span>
              CLI
            </div>
            <div class="kpr-orbit-node kpr-orbit-node-b">
              <span class="kpr-orbit-node-dot"></span>
              Modules
            </div>
            <div class="kpr-orbit-node kpr-orbit-node-c">
              <span class="kpr-orbit-node-dot"></span>
              Providers
            </div>
            <div class="kpr-orbit-node kpr-orbit-node-d">
              <span class="kpr-orbit-node-dot"></span>
              Deploy
            </div>
          </aside>
        </div>
      </section>
    </template>

    <template #home-features-before>
      <section class="kpr-marquee">
        <span>run</span>
        <span>new</span>
        <span>module</span>
        <span>job</span>
        <span>deploy</span>
        <span>provider</span>
        <span class="kpr-marquee-highlight">30+ providers</span>
      </section>
    </template>
  </DefaultTheme.Layout>
</template>

<style scoped>
.kpr-particles {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: inherit;
  pointer-events: none;
  z-index: 0;
}

.kpr-particle {
  animation: kpr-particle-drift linear infinite;
}

@keyframes kpr-particle-drift {
  0% { transform: translate(0, 0); }
  25% { transform: translate(12px, -18px); }
  50% { transform: translate(-8px, -30px); }
  75% { transform: translate(16px, -14px); }
  100% { transform: translate(0, 0); }
}

/* Orbit rings */
.kpr-orbit-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  border: 1px solid rgba(56, 189, 248, 0.10);
  border-radius: 50%;
  pointer-events: none;
}

.kpr-orbit-ring-1 {
  width: 180px;
  height: 180px;
  transform: translate(-50%, -50%);
  animation: kpr-ring-pulse 4s ease-in-out infinite;
}

.kpr-orbit-ring-2 {
  width: 280px;
  height: 280px;
  transform: translate(-50%, -50%);
  animation: kpr-ring-pulse 4s 1s ease-in-out infinite;
}

@keyframes kpr-ring-pulse {
  0%, 100% {
    opacity: 0.3;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0.7;
    transform: translate(-50%, -50%) scale(1.04);
  }
}

/* Center inner */
.kpr-orbit-center-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: var(--vp-c-text-1);
}

.kpr-orbit-center-inner svg {
  color: var(--kpr-accent);
}

.kpr-orbit-center-inner span {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

/* Node dots */
.kpr-orbit-node-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--kpr-accent);
  display: inline-block;
  margin-right: 6px;
  animation: kpr-pulse 2s ease-in-out infinite;
}

/* Title accent */
.kpr-title-accent {
  background: linear-gradient(135deg, var(--kpr-accent), var(--kpr-accent-2));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* CTA icon */
.kpr-cta-icon {
  display: inline-flex;
  font-size: 16px;
  transition: transform 0.2s;
}

.kpr-cta-primary:hover .kpr-cta-icon {
  transform: translateX(3px);
}

/* Marquee highlight */
.kpr-marquee-highlight {
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.12), rgba(99, 102, 241, 0.08)) !important;
  border-color: rgba(56, 189, 248, 0.25) !important;
  color: var(--kpr-accent);
  font-weight: 700 !important;
}
</style>
