<script setup lang="ts">
const { locale, setLocale, t } = useI18n()
const localeCookie = useCookie<'en' | 'id'>('annur_locale', {
  default: () => 'en',
  maxAge: 60 * 60 * 24 * 365,
})

onMounted(() => {
  if (localeCookie.value && localeCookie.value !== locale.value) {
    setLocale(localeCookie.value)
  }
})

function toggleLocale(target: 'en' | 'id') {
  setLocale(target)
  localeCookie.value = target
}
</script>

<template>
  <div class="site">
    <header class="site-header">
      <NuxtLink to="/" class="brand">
        <span class="brand-icon" aria-hidden="true">☾</span>
        <span class="brand-name">Al-Nur Journey</span>
      </NuxtLink>

      <nav class="site-nav">
        <NuxtLink to="/privacy-policy">{{ t('nav.privacy') }}</NuxtLink>
        <NuxtLink to="/feedback">{{ t('nav.feedback') }}</NuxtLink>
        <div class="lang-toggle" role="group" aria-label="Language">
          <button
            type="button"
            :class="{ active: locale === 'en' }"
            @click="toggleLocale('en')"
          >
            EN
          </button>
          <button
            type="button"
            :class="{ active: locale === 'id' }"
            @click="toggleLocale('id')"
          >
            ID
          </button>
        </div>
      </nav>
    </header>

    <main>
      <slot />
    </main>

    <footer class="site-footer">
      <p>{{ t('footer.copyright', { year: new Date().getFullYear() }) }}</p>
    </footer>
  </div>
</template>

<style scoped>
.site {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
  background: var(--surface);
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--text);
  font-weight: 700;
}

.brand-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--accent-dark);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
}

.site-nav {
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
}

.site-nav a {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.92rem;
  font-weight: 600;
}

.site-nav a.router-link-active {
  color: var(--accent);
}

.lang-toggle {
  display: inline-flex;
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 3px;
  background: var(--bg);
}

.lang-toggle button {
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-size: 0.8rem;
  font-weight: 700;
  padding: 5px 12px;
  border-radius: 999px;
  cursor: pointer;
}

.lang-toggle button.active {
  background: var(--accent);
  color: var(--accent-contrast);
}

main {
  flex: 1;
}

.site-footer {
  text-align: center;
  padding: 24px 20px;
  color: var(--text-secondary);
  font-size: 0.82rem;
  border-top: 1px solid var(--border);
}
</style>
