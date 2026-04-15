<template>
    <div class="container d-flex justify-content-center">
        <div class="main-container mt-5 pt-4">
            <h1>{{ $frontmatter.title }}</h1>
            <div v-for="(block, index) in contentBlocks" :key="index">
                <p v-if="block.type === 'paragraph'" v-html="block.content"></p>
                <h2 v-if="block.type === 'heading'" v-html="block.content"></h2>
                <div v-if="block.type === 'image'" class="d-flex justify-content-center my-5">
                    <img :src="getImageSrc(block.src)" :alt="block.alt" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import MarkdownIt from 'markdown-it';

const props = defineProps({
    isDarkMode: {
        type: Boolean,
        required: true,
    },
});

const md = new MarkdownIt();

import markdownContent from '../../../how-a-web-script-works.md?raw';

function removeFrontmatter(content) {
    const frontmatterRegex = /^---[\s\S]*?---/;
    return content.replace(frontmatterRegex, '').trim();
}

const cleanContent = removeFrontmatter(markdownContent);

function parseMarkdown(content) {
    const blocks = [];
    const lines = content.split('\n');
    let currentBlock = { type: '', content: '' };

    lines.forEach(line => {
        if (line.startsWith('## ')) {
            if (currentBlock.content) blocks.push(currentBlock);
            currentBlock = { type: 'heading', content: line.replace('## ', '') };
        } else if (line.startsWith('![')) {
            if (currentBlock.content) blocks.push(currentBlock);
            const src = line.match(/\(([^)]+)\)/)[1];
            const alt = line.match(/\[([^\]]+)\]/)[1];
            blocks.push({ type: 'image', src, alt });
            currentBlock = { type: '', content: '' };
        } else if (line.trim() !== '') {
            if (currentBlock.content) {
                currentBlock.content += `\n${line}`;
            } else {
                currentBlock = { type: 'paragraph', content: line };
            }
        } else {
            if (currentBlock.content) blocks.push(currentBlock);
            currentBlock = { type: '', content: '' };
        }
    });

    if (currentBlock.content) blocks.push(currentBlock);
    return blocks;
}

const contentBlocks = computed(() => parseMarkdown(cleanContent));

function getImageSrc(src) {
    if (!props.isDarkMode) {
        const baseName = src.replace(/\.(?=[^\.]+$)/, '-white.');
        return baseName;
    }
    return src;
}
</script>
