<script setup>
import { ref, onMounted, watch } from "vue";
import { useData } from "vitepress";
import { minimalSetup, EditorView } from "codemirror";
import { EditorState } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";
import { espresso, dracula } from "thememirror";
import { java } from "@codemirror/lang-java";

const { page, frontmatter } = useData();
const isDarkMode = ref(false);
const darkEditorContainer = ref(null);
const lightEditorContainer = ref(null);
const installCommand = ref("kotlinc koupper-installer.kts");
const versionCommand = ref("koupper -v");
const newCommand = ref("koupper new example.kts");
const runCommand = ref("koupper run example.kts");
const srcCopy = ref("/copy.svg");
const srcCopied = ref("/copied.svg");
const srcImage = srcCopy;
const copyInstallCommandRef = ref(null);
const copyVersionCommandRef = ref(null);
const copyNewCommandRef = ref(null);
const copyRunCommandRef = ref(null);
const isLoading = ref(false);
const result = ref(null);
const editorDark = ref(null);
const editorLight = ref(null);
const sunIcon = ref("/sun.svg");
const moonIcon = ref("/moon.svg");

const getExtensions = (darkMode) => {
  return [minimalSetup, darkMode ? dracula : espresso, java()];
};

function toggleDarkMode() {
  document.documentElement.classList.toggle("dark", isDarkMode.value);

  if (isDarkMode.value) {
    document.body.style.backgroundColor = "#121212";
    document.body.style.color = "#FFFFFF";
  } else {
    document.body.style.backgroundColor = "";
    document.body.style.color = "";
  }
}

function copyInstallCommand() {
  copyToClipboard(installCommand.value);
  copyInstallCommandRef.value.src = srcCopied.value;
  setTimeout(() => (copyInstallCommandRef.value.src = srcCopy.value), 1500);
}
function copyVersionCommand() {
  copyToClipboard(versionCommand.value);
  copyVersionCommandRef.value.src = srcCopied.value;
  setTimeout(() => (copyVersionCommandRef.value.src = srcCopy.value), 1500);
}
function copyNewCommand() {
  copyToClipboard(newCommand.value);
  copyNewCommandRef.value.src = srcCopied.value;
  setTimeout(() => (copyNewCommandRef.value.src = srcCopy.value), 1500);
}
function copyRunCommand() {
  copyToClipboard(runCommand.value);
  copyRunCommandRef.value.src = srcCopied.value;
  setTimeout(() => (copyRunCommandRef.value.src = srcCopy.value), 1500);
}

function executeTry() {
  isLoading.value = true;

  result.value = "Hello world!";
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error("Error al copiar el código:", error);
  }
}

onMounted(() => {
  isDarkMode.value = document.documentElement.classList.contains("dark");

  document.documentElement.classList.toggle("dark", isDarkMode.value);

  if (isDarkMode.value) {
    document.body.style.backgroundColor = "#121212";
    document.body.style.color = "#FFFFFF";
  }

  const initialText = `
import com.koupper.container.interfaces.Container

val execute: () -> String = { 
    "Hello world!"
}
`;

  editorDark.value = new EditorView({
    state: EditorState.create({
      doc: initialText,
      extensions: getExtensions(true),
    }),
    parent: darkEditorContainer.value,
  });

  editorLight.value = new EditorView({
    state: EditorState.create({
      doc: initialText,
      extensions: getExtensions(false),
    }),
    parent: lightEditorContainer.value,
  });
});

watch(isDarkMode, (newVal) => {
  document.documentElement.classList.toggle("dark", newVal);
  if (newVal) {
    document.body.style.backgroundColor = "#121212";
    document.body.style.color = "#FFFFFF";
  } else {
    document.body.style.backgroundColor = "";
    document.body.style.color = "";
  }
});
</script>

<template>
  <div class="d-flex justify-content-center fixed-top">
    <nav class="custom-navbar px-3 py-3 w-75">
      <div class="px-4">
        <img v-if="isDarkMode" src="/koupper-logo.svg" alt="Logo" />
        <img v-else src="/koupper-white-mode-logo.svg" alt="Logo" />
      </div>
      <div class="d-flex align-items-center">
        <div class="px-3 me-3">
          <button
            :class="{ 'doc-btn-white-mode': !isDarkMode, 'doc-btn': isDarkMode }"
            class="btn"
          >
            Documentation
          </button>
        </div>
        <div>
          <label class="switch">
            <input type="checkbox" v-model="isDarkMode" @change="toggleDarkMode" />
            <span class="slider">
              <span class="icon sun"
                ><img src="/sun.svg" alt="" class="pointer" width="20" height="20"
              /></span>
              <span class="icon moon"><img src="/moon.svg" alt="" class="pointer" width="20" height="20"
                /></span>
            </span>
          </label>
        </div>
      </div>
    </nav>
  </div>

  <div v-if="page.isNotFound">Custom 404 page!</div>

  <div v-if="frontmatter.layout === 'home'" class="mt-5">
    <div class="container d-flex justify-content-center">
      <div class="w-75">
        <Content class="mt-5 pt-4" />
        <div class="d-flex justify-content-start mt-4">
          <button class="btn download-btn text-white">Download koupper installer</button>
        </div>
        <div class="pt-3">
          <div class="row">
            <div class="col-6">
              <div class="mt-5">
                <h4>Installation and Setup</h4>
                <ul class="list-unstyled mt-5">
                  <li class="mt-4">
                    <div>
                      <h6 class="mt-3 fw-bold">1.- Download and Install Kotlin:</h6>
                      <p
                        :style="{ color: isDarkMode ? '#c2c2c2' : '#6e6e6e' }"
                        class="mt-2"
                      >
                        Download Kotlin from the official repository.
                      </p>
                    </div>
                  </li>
                  <li class="mt-4">
                    <div>
                      <h6 class="mt-3 fw-bold">2.- Install Koupper:</h6>
                      <p
                        :style="{ color: isDarkMode ? '#c2c2c2' : '#6e6e6e' }"
                        class="mt-2"
                      >
                        Download the Koupper installer script and execute it:
                      </p>
                      <div
                        :class="{ 'terminal-light': !isDarkMode, terminal: isDarkMode }"
                        class="mt-2 d-flex justify-content-between"
                      >
                        <div class="input-command">
                          <span class="prompt">$</span> {{ installCommand }}
                        </div>
                        <img
                          :src="srcImage"
                          alt=""
                          class="pointer"
                          width="20"
                          height="20"
                          @click="copyInstallCommand"
                          ref="copyInstallCommandRef"
                        />
                      </div>
                    </div>
                  </li>
                  <li class="mt-4">
                    <div>
                      <h6 class="mt-3 fw-bold">3.- Verify installation</h6>
                      <div
                        :class="{ 'terminal-light': !isDarkMode, terminal: isDarkMode }"
                        class="mt-2 d-flex justify-content-between"
                      >
                        <div class="input-command">
                          <span class="prompt">$</span> {{ versionCommand }}
                        </div>
                        <img
                          :src="srcImage"
                          alt=""
                          class="pointer"
                          width="20"
                          height="20"
                          @click="copyVersionCommand"
                          ref="copyVersionCommandRef"
                        />
                      </div>
                    </div>
                  </li>
                  <li class="mt-4">
                    <div>
                      <h6 class="mt-3 fw-bold">4.- Environment Setup</h6>
                      <p
                        :style="{ color: isDarkMode ? '#c2c2c2' : '#6e6e6e' }"
                        class="mt-2"
                      >
                        Add <span :class="{'koupper-variable-light-mode': !isDarkMode, 'koupper-variable': isDarkMode}">KOUPPER_HOME</span> to your
                        environment variables.
                      </p>
                    </div>
                  </li>
                  <li class="mt-4">
                    <div>
                      <h6 class="mt-3 fw-bold">Create</h6>
                      <p
                        :style="{ color: isDarkMode ? '#c2c2c2' : '#6e6e6e' }"
                        class="mt-2"
                      >
                        Start creating scripts with Koupper:
                      </p>
                      <div
                        :class="{ 'terminal-light': !isDarkMode, terminal: isDarkMode }"
                        class="mt-2 d-flex justify-content-between"
                      >
                        <div class="input-command">
                          <span class="prompt">$</span> {{ newCommand }}
                        </div>
                        <img
                          :src="srcImage"
                          alt=""
                          class="pointer"
                          width="20"
                          height="20"
                          @click="copyNewCommand"
                          ref="copyNewCommandRef"
                        />
                      </div>
                      <h6 class="mt-3 fw-bold">Run</h6>
                      <p
                        :style="{ color: isDarkMode ? '#c2c2c2' : '#6e6e6e' }"
                        class="mt-2"
                      >
                        Run the created script:
                      </p>
                      <div
                        :class="{ 'terminal-light': !isDarkMode, terminal: isDarkMode }"
                        class="mt-2 d-flex justify-content-between"
                      >
                        <div class="input-command">
                          <span class="prompt">$</span> {{ runCommand }}
                        </div>
                        <img
                          :src="srcImage"
                          alt=""
                          class="pointer"
                          width="20"
                          height="20"
                          @click="copyRunCommand"
                          ref="copyRunCommandRef"
                        />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-6 d-flex flex-column justify-content-center">
              <span>example.kts</span>
              <div v-show="isDarkMode" class="mt-2">
                <div id="editor-dark" ref="darkEditorContainer"></div>
              </div>
              <div v-show="!isDarkMode" class="mt-2">
                <div id="editor-light" ref="lightEditorContainer"></div>
              </div>
              <div class="w-100 d-flex justify-content-end mt-3">
                <button
                  class="btn d-flex justify-content-center align-items-center try-it-white-mode"
                  @click="executeTry"
                  :disabled="isLoading"
                >
                  <span v-if="!isLoading">¡Try it!</span>
                  <span v-else class="fw-normal loading"
                    >Loading<img
                      src="/loading.gif"
                      alt="Cargando..."
                      class="loading-gif d-inline ms-2"
                      width="20"
                      height="20"
                  /></span>
                </button>
              </div>
              <div v-if="result" class="mt-3">
                <h6>Result:</h6>
                <div class="result">
                  {{ result }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-5">
          <h4>Integrations:</h4>
          <div class="row mt-5">
            <div class="col-6">
              <div class="d-flex flex-column p-3 web-integration">
                <img src="/web.svg" alt="" width="35" height="35" />
                <h6 class="mt-3 fw-bold">WEB</h6>
                <p :style="{ color: isDarkMode ? '#c2c2c2' : '#6e6e6e' }" class="mt-2">
                  industry. Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took.
                </p>
              </div>
            </div>
            <div class="col-6">
              <div class="d-flex flex-column p-3 db-integration">
                <img src="/database.svg" alt="" width="35" height="35" />
                <h6 class="mt-3 fw-bold">DATABASE</h6>
                <p :style="{ color: isDarkMode ? '#c2c2c2' : '#6e6e6e' }" class="mt-2">
                  industry. Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took.
                </p>
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-6">
              <div class="d-flex flex-column p-3 aws-integration">
                <img src="/aws.svg" alt="" width="35" height="35" />
                <h6 class="mt-3 fw-bold">AWS</h6>
                <p :style="{ color: isDarkMode ? '#c2c2c2' : '#6e6e6e' }" class="mt-2">
                  industry. Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took.
                </p>
              </div>
            </div>
            <div class="col-6">
              <div class="d-flex flex-column p-3 docker-integration">
                <img src="/docker.svg" alt="" width="35" height="35" />
                <h6 class="mt-3 fw-bold">DOCKER</h6>
                <p :style="{ color: isDarkMode ? '#c2c2c2' : '#6e6e6e' }" class="mt-2">
                  industry. Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-5">
          <h4>Used by:</h4>
          <div class="row mt-5">
            <div class="col d-flex justify-content-center align-items-center">
              <img v-if="isDarkMode" src="/tdn.svg" alt="" width="120" height="120" class="p-2" />
              <img v-else src="/tdn-light-mode.svg" alt="" width="120" height="120" class="p-2" />
            </div>
            <div class="col d-flex justify-content-center align-items-center">
              <img v-if="isDarkMode" src="/ztreamers.svg" alt="" width="120" height="120" class="p-2" />
              <img v-else src="/ztreamers-light-mode.svg" alt="" width="120" height="120" class="p-2" />
            </div>
            <div class="col d-flex justify-content-center align-items-center">
              <img v-if="isDarkMode" src="/mediaflow.svg" alt="" width="120" height="120" class="p-2" />
              <img v-else src="/mediaflow-light-mode.svg" alt="" width="120" height="120" class="p-2" />
            </div>
            <div class="col d-flex justify-content-center align-items-center">
              <img v-if="isDarkMode" src="/igly.svg" alt="" width="120" height="120" class="p-2" />
              <img v-else src="/igly-light-mode.svg" alt="" width="120" height="120" class="p-2" />
            </div>
            <div class="col d-flex justify-content-center align-items-center">
              <img v-if="isDarkMode" src="/quiztea.svg" alt="" width="120" height="120" class="p-2" />
              <img v-else src="/quiztea-light-mode.svg" alt="" width="120" height="120" class="p-2" />
            </div>
          </div>
        </div>
        <div class="footer d-flex justify-content-center py-5">
          <img
            v-if="isDarkMode"
            src="/koupper-footer.svg"
            alt=""
            width="90"
            height="90"
          />
          <img
            v-else
            src="/koupper-footer-white-mode.svg"
            alt=""
            width="90"
            height="90"
          />
        </div>
      </div>
    </div>
  </div>

  <Content v-else />
</template>

<style scoped>
.custom-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--vp-c-bg, #fff);
  padding: 10px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 70px;
  height: 34px;
  margin-left: auto;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f3f3f3;
  border-radius: 34px;
  transition: background-color 0.4s;
}

.slider::before {
  content: "";
  position: absolute;
  top: 4px;
  left: 4px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: white;
  transition: transform 0.4s, background-color 0.4s;
}

.slider .icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: opacity 0.4s, left 0.4s;
  width: 16px;
}

.slider .sun {
  left: 8px;
  opacity: 1;
}

.slider .moon {
  right: 8px;
  opacity: 0;
}

input:checked + .slider .sun {
  opacity: 0;
}

input:checked + .slider .moon {
  opacity: 1;
}

input:checked + .slider::before {
  transform: translateX(36px);
  background-color: rgb(0, 0, 0);
}

.dark .custom-navbar {
  background-color: #121212;
  color: #fff;
}

.dark .slider {
  background-color: #2b2b2b;
}

.download-btn {
  background-color: #615dff;
  color: rgb(18, 18, 18);
  border: 1.5px solid #615dff;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.download-btn:hover {
  background-color: #6964ff;
  border-color: #6964ff;
  color: rgb(18, 18, 18);
}

.doc-btn {
  background-color: transparent;
  color: white;
  border: 1.5px solid white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.doc-btn:hover {
  background-color: #8480fd4a;
  border-color: #8480fd;
  color: rgba(255, 255, 255, 0.9);
}

.prompt {
  color: rgb(32, 255, 58);
}

#editor-dark {
  border: 3px dashed #303030;
}

#editor-light {
  border: 3px dashed #e5e5e5;
}

.koupper-variable {
  color: #d3d2ff;
  font-weight: 400;
}

.koupper-variable-light-mode {
  color: #6e6bff;
  font-weight: 400;
}

.try-it {
  width: 120px;
  height: 40px;
  background-color: white;
  color: rgb(18, 18, 18);
  font-weight: bold;
}

.try-it:hover {
  background-color: #6964ff;
  color: white;
}

.integrations {
  background-image: url("bg-integrations.svg");
  background-size: cover;
  background-position: center;
}

.terminal {
  background-color: #000000;
  padding: 4px;
  width: 85%;
}

.terminal-light {
  background-color: #f5f5f5;
  padding: 4px;
  width: 85%;
}

.result {
  background-color: #000000;
  padding: 14px;
}

.web-integration {
  border: 1.5px solid #ff57a5;
}

.db-integration {
  border: 1.5px solid #6964ff;
}

.aws-integration {
  border: 1.5px solid #dea811;
}

.docker-integration {
  border: 1.5px solid #08adff;
}

.footer {
  margin-top: 220px;
  margin-bottom: 40px;
}

.text-white {
  color: white !important;
}

.doc-btn-white-mode {
  background-color: transparent;
  color: #6964ff;
  border: 1.5px solid #6964ff;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.doc-btn-white-mode:hover {
  background-color: #6964ff;
  border-color: #6964ff;
  color: rgba(255, 255, 255, 0.9);
}

.try-it-white-mode {
  width: 120px;
  height: 40px;
  background-color: #615dff;
  color: rgb(255, 255, 255);
}

.try-it-white-mode:hover {
  width: 120px;
  height: 40px;
  background-color: #6964ff;
  color: rgb(255, 255, 255);
}
</style>
