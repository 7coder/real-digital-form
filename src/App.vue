<template>
  <div id="app">
    <div class="wrapper">
      <img alt="Vue logo" width="50" src="./assets/logo.png" />
      <h3>Some Vue form</h3>
      <real-digital-form action="http://httpbin.org/post" method="POST">
        <real-digital-textfield name="name" validation="[a-z]+"></real-digital-textfield>
        <real-digital-textfield name="phone" validation="[0-9]+"></real-digital-textfield>
        <real-digital-textfield name="subject"></real-digital-textfield>
        <real-digital-button>Send</real-digital-button>
      </real-digital-form>
    </div>
  </div>
</template>

<script>
import RealDigitalForm from "@/components/RealDigitalForm.vue";
import RealDigitalTextfield from "@/components/RealDigitalTextfield.vue";
import RealDigitalButton from "@/components/RealDigitalButton.vue";

export default {
  name: "App",
  components: {
    RealDigitalForm,
    RealDigitalTextfield,
    RealDigitalButton,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  justify-content: center;
}
</style>
