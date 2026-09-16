<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t('home.title'),
})
</script>

<template>
  <div class="page hero">
    <div class="card hero-card">
      <div class="hero-icon" aria-hidden="true">☾</div>
      <h1>{{ t('home.title') }}</h1>
      <p class="tagline">{{ t('home.tagline') }}</p>
      <p class="description">{{ t('home.description') }}</p>
      <div class="cta-row">
        <NuxtLink to="/privacy-policy" class="btn btn-primary">
          {{ t('home.privacyCta') }}
        </NuxtLink>
        <NuxtLink to="/feedback" class="btn btn-secondary">
          {{ t('home.feedbackCta') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 160px);
}

.hero-card {
  text-align: center;
  max-width: 560px;
}

.hero-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 16px;
  border-radius: 14px;
  background: var(--accent-dark);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
}

.tagline {
  color: var(--text-secondary);
  font-size: 1rem;
  margin-bottom: 16px;
}

.description {
  margin-bottom: 28px;
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.btn {
  display: inline-block;
  padding: 12px 22px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.92rem;
  text-decoration: none;
}

.btn-primary {
  background: var(--accent);
  color: var(--accent-contrast);
}

.btn-secondary {
  background: var(--bg);
  color: var(--text);
  border: 1px solid var(--border);
}
</style>
