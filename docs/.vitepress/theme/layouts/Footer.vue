<template>
    <div class="footer d-flex justify-content-center">
        <a href="/">
            <img src="/koupper-footer.svg" alt="Footer logo" width="30" height="30" />
        </a>
    </div>
</template>

<script>
export default {
    name: "FooterComponent",
    props: {
        isDarkMode: {
            type: Boolean,
            required: true,
        },
    },
};
</script>

<style scoped></style>