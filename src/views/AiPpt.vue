<template>
  <div class="ai-ppt">
    <div class="ppt-container">
      <div class="ppt-header">
        <h2>PPT生成器</h2>
        <p>输入主题，穆老师将为你生成专业的PPT内容</p>
      </div>

      <div class="ppt-form">
        <div class="form-group">
          <label>PPT主题</label>
          <input
            v-model="pptTopic"
            type="text"
            placeholder="例如：人工智能发展趋势"
            class="topic-input"
          />
        </div>

        <div class="form-group">
          <label>PPT页数</label>
          <select v-model="pptPages" class="pages-select">
            <option value="5">5页</option>
            <option value="10">10页</option>
            <option value="15">15页</option>
            <option value="20">20页</option>
          </select>
        </div>

        <div class="form-group">
          <label>风格偏好</label>
          <div class="style-options">
            <label class="style-option">
              <input type="radio" v-model="pptStyle" value="professional" />
              <span>专业商务</span>
            </label>
            <label class="style-option">
              <input type="radio" v-model="pptStyle" value="creative" />
              <span>创意设计</span>
            </label>
            <label class="style-option">
              <input type="radio" v-model="pptStyle" value="minimal" />
              <span>简约现代</span>
            </label>
          </div>
        </div>

        <button
          @click="generatePpt"
          :disabled="!pptTopic.trim() || generating"
          class="generate-btn"
        >
          {{ generating ? '生成中...' : '生成PPT' }}
        </button>
      </div>

      <div v-if="generatedPpt" class="ppt-result">
        <h3>生成的PPT大纲</h3>
        <div class="ppt-outline">
          <div v-for="(slide, index) in generatedPpt.slides" :key="index" class="slide-item">
            <div class="slide-number">第{{ index + 1 }}页</div>
            <div class="slide-title">{{ slide.title }}</div>
            <div class="slide-content">{{ slide.content }}</div>
          </div>
        </div>

        <div class="ppt-actions">
          <button class="action-btn download-btn">下载PPT</button>
          <button class="action-btn edit-btn">编辑内容</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref } from 'vue'
  export default {
    name: 'AiPptPage',
    setup() {
      const pptTopic = ref('')
      const pptPages = ref(10)
      const pptStyle = ref('professional')
      const generating = ref(false)
      const generatedPpt = ref(null)
      const pptOpen = ref(false)

      const generatePpt = async () => {
        if (!pptOpen.value) {
          alert('PPT生成服务正在测试阶段，暂未开放，敬请期待！')
          return
        }

        if (!pptTopic.value.trim() || generating.value) return

        generating.value = true

        // 模拟AI生成PPT
        setTimeout(() => {
          const slides = []
          const topic = pptTopic.value

          // 生成封面页
          slides.push({
            title: `${topic}`,
            content: '副标题：专业分析与深度洞察',
          })

          // 生成目录页
          slides.push({
            title: '目录',
            content: '1. 背景介绍\n2. 核心内容\n3. 数据分析\n4. 结论建议',
          })

          // 生成内容页
          for (let i = 3; i <= Math.min(pptPages.value, 20); i++) {
            slides.push({
              title: `${topic} - 第${i - 2}部分`,
              content: `这里是关于${topic}的第${i - 2}部分内容，包含详细的分析和见解。`,
            })
          }

          generatedPpt.value = {
            topic: topic,
            style: pptStyle.value,
            pages: pptPages.value,
            slides: slides,
            generatedAt: new Date(),
          }

          generating.value = false
        }, 2000)
      }

      return {
        pptTopic,
        pptPages,
        pptStyle,
        generating,
        generatedPpt,
        generatePpt,
      }
    },
  }
</script>

<style scoped>
  .ai-ppt {
    height: 100%;
  }

  .ppt-container {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }

  .ppt-header {
    padding: 32px;
    text-align: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  .ppt-header h2 {
    margin: 0 0 8px;
    font-size: 28px;
    font-weight: 600;
  }

  .ppt-header p {
    margin: 0;
    opacity: 0.9;
    font-size: 16px;
  }

  .ppt-form {
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .form-group label {
    font-weight: 500;
    color: #374151;
    font-size: 14px;
  }

  .topic-input {
    padding: 12px 16px;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.2s;
  }

  .topic-input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  .pages-select {
    padding: 12px 16px;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 16px;
    background: white;
    cursor: pointer;
  }

  .style-options {
    display: flex;
    gap: 16px;
  }

  .style-option {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding: 8px 12px;
    border: 2px solid #e5e7eb;
    border-radius: 6px;
    transition: all 0.2s;
  }

  .style-option:hover {
    border-color: #667eea;
  }

  .style-option input[type='radio'] {
    margin: 0;
  }

  .generate-btn {
    padding: 16px 32px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    margin-top: 16px;
  }

  .generate-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }

  .generate-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .ppt-result {
    padding: 32px;
    border-top: 1px solid #e5e7eb;
    background: #f9fafb;
  }

  .ppt-result h3 {
    margin: 0 0 20px;
    color: #1f2937;
    font-size: 20px;
  }

  .ppt-outline {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
  }

  .slide-item {
    background: white;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
  }

  .slide-number {
    font-size: 12px;
    color: #6b7280;
    margin-bottom: 8px;
    font-weight: 500;
  }

  .slide-title {
    font-size: 16px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 8px;
  }

  .slide-content {
    color: #4b5563;
    line-height: 1.5;
    white-space: pre-line;
  }

  .ppt-actions {
    display: flex;
    gap: 12px;
  }

  .action-btn {
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .download-btn {
    background: #10b981;
    color: white;
  }

  .download-btn:hover {
    background: #059669;
  }

  .edit-btn {
    background: #f59e0b;
    color: white;
  }

  .edit-btn:hover {
    background: #d97706;
  }
</style>
