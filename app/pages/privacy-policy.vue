<script setup lang="ts">
const { t, tm, te, rt } = useI18n()

useHead({
  title: computed(() => t('privacy.title')),
})

const sectionOrder = [
  'collect',
  'use',
  'share',
  'security',
  'choices',
  'retention',
  'children',
  'transfers',
  'changes',
  'contact',
] as const

function sectionList(key: string) {
  return tm(`privacy.sections.${key}.list`) as unknown as string[]
}

function tableHeaders(key: string) {
  return tm(`privacy.sections.${key}.table.headers`) as unknown as string[]
}

function tableRows(key: string) {
  return tm(`privacy.sections.${key}.table.rows`) as unknown as string[][]
}
</script>

<template>
  <div class="page">
    <div class="card">
      <h1>{{ t('privacy.title') }}</h1>
      <p class="subtitle">{{ t('privacy.subtitle') }}</p>

      <p class="effective-date">
        {{ t('privacy.effectiveDateLabel') }}
        <span class="placeholder">{{ t('privacy.effectiveDate') }}</span>
        &nbsp;·&nbsp;
        {{ t('privacy.lastUpdatedLabel') }}
        <span class="placeholder">{{ t('privacy.lastUpdated') }}</span>
      </p>

      <p>{{ t('privacy.intro') }}</p>

      <template v-for="(key, index) in sectionOrder" :key="key">
        <h2>
          <span class="num">{{ index + 1 }}.</span>{{ t(`privacy.sections.${key}.heading`) }}
        </h2>

        <p v-if="te(`privacy.sections.${key}.intro`)">
          {{ t(`privacy.sections.${key}.intro`) }}
        </p>

        <p v-if="te(`privacy.sections.${key}.body`)">
          {{ t(`privacy.sections.${key}.body`) }}
        </p>

        <div v-if="key === 'collect'" class="table-scroll">
          <table>
            <tr>
              <th v-for="(header, headerIndex) in tableHeaders(key)" :key="headerIndex">{{ rt(header) }}</th>
            </tr>
            <tr v-for="(row, rowIndex) in tableRows(key)" :key="rowIndex">
              <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ rt(cell) }}</td>
            </tr>
          </table>
        </div>

        <ul v-if="te(`privacy.sections.${key}.list`)">
          <li v-for="(item, itemIndex) in sectionList(key)" :key="itemIndex">{{ rt(item) }}</li>
        </ul>

        <ul v-if="key === 'contact'">
          <li>{{ t('privacy.sections.contact.email') }} <span class="placeholder">hupernex@gmail.com</span></li>
        </ul>
      </template>

      <footer class="policy-footer">
        <p>{{ t('privacy.footerNote') }}</p>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.subtitle {
  color: var(--text-secondary);
  margin: 0;
}

.effective-date {
  color: var(--text-secondary);
  font-size: 0.85rem;
  margin: 16px 0 28px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border);
}

.policy-footer {
  margin-top: 36px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
  color: var(--text-secondary);
  font-size: 0.85rem;
}
</style>
