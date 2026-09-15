<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: computed(() => t('feedback.title')),
})

type Category = 'bug' | 'feature' | 'general'
type Status = 'idle' | 'submitting' | 'success' | 'error'

const name = ref('')
const email = ref('')
const category = ref<Category>('general')
const message = ref('')
const status = ref<Status>('idle')
const validationError = ref('')

async function submitFeedback() {
  validationError.value = ''

  if (!message.value.trim()) {
    validationError.value = t('feedback.validationMessage')
    return
  }

  status.value = 'submitting'

  try {
    const supabase = useSupabase()
    const { error } = await supabase.from('feedback').insert({
      name: name.value.trim() || null,
      email: email.value.trim() || null,
      category: category.value,
      message: message.value.trim(),
    })

    if (error) throw error

    status.value = 'success'
  } catch (err) {
    console.error('Failed to submit feedback', err)
    status.value = 'error'
  }
}

function resetForm() {
  name.value = ''
  email.value = ''
  category.value = 'general'
  message.value = ''
  status.value = 'idle'
  validationError.value = ''
}
</script>

<template>
  <div class="page">
    <div class="card">
      <h1>{{ t('feedback.title') }}</h1>
      <p class="subtitle">{{ t('feedback.subtitle') }}</p>

      <div v-if="status === 'success'" class="result result-success">
        <h2>{{ t('feedback.successTitle') }}</h2>
        <p>{{ t('feedback.successBody') }}</p>
        <button type="button" class="btn btn-secondary" @click="resetForm">
          {{ t('feedback.sendAnother') }}
        </button>
      </div>

      <form v-else class="feedback-form" @submit.prevent="submitFeedback">
        <div class="field">
          <label for="fb-name">{{ t('feedback.nameLabel') }}</label>
          <input
            id="fb-name"
            v-model="name"
            type="text"
            :placeholder="t('feedback.namePlaceholder')"
            autocomplete="name"
          >
        </div>

        <div class="field">
          <label for="fb-email">{{ t('feedback.emailLabel') }}</label>
          <input
            id="fb-email"
            v-model="email"
            type="email"
            :placeholder="t('feedback.emailPlaceholder')"
            autocomplete="email"
          >
          <p class="hint">{{ t('feedback.emailHint') }}</p>
        </div>

        <div class="field">
          <label for="fb-category">{{ t('feedback.categoryLabel') }}</label>
          <select id="fb-category" v-model="category">
            <option value="bug">{{ t('feedback.categoryOptions.bug') }}</option>
            <option value="feature">{{ t('feedback.categoryOptions.feature') }}</option>
            <option value="general">{{ t('feedback.categoryOptions.general') }}</option>
          </select>
        </div>

        <div class="field">
          <label for="fb-message">{{ t('feedback.messageLabel') }}</label>
          <textarea
            id="fb-message"
            v-model="message"
            rows="5"
            :placeholder="t('feedback.messagePlaceholder')"
          />
        </div>

        <p v-if="validationError" class="form-message error">{{ validationError }}</p>
        <p v-if="status === 'error'" class="form-message error">
          <strong>{{ t('feedback.errorTitle') }}</strong> — {{ t('feedback.errorBody') }}
        </p>

        <button type="submit" class="btn btn-primary" :disabled="status === 'submitting'">
          {{ status === 'submitting' ? t('feedback.submitting') : t('feedback.submit') }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.subtitle {
  color: var(--text-secondary);
  margin: 0 0 24px;
}

.feedback-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-weight: 600;
  font-size: 0.88rem;
}

input,
select,
textarea {
  font: inherit;
  color: var(--text);
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 10px 12px;
  width: 100%;
}

textarea {
  resize: vertical;
}

.hint {
  margin: 0;
  font-size: 0.78rem;
  color: var(--text-secondary);
}

.form-message {
  margin: 0;
  font-size: 0.88rem;
}

.form-message.error {
  color: var(--danger);
}

.btn {
  display: inline-block;
  align-self: flex-start;
  padding: 12px 22px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.92rem;
  text-decoration: none;
  border: none;
  cursor: pointer;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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

.result-success h2 {
  margin-top: 0;
  color: var(--success);
}
</style>
