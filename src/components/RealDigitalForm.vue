<template>
  <div class="form-container">
    <div v-if="Object.keys(responseFromServer).length" class="form-response">
      <code>
        Reponse from {{ action }}:
        <br />
        {{ responseFromServer }}
      </code>
    </div>
    <form id="real-digital-form" :action="action" :method="method" @submit="onSubmitEvent">
      <slot></slot>
    </form>
  </div>
</template>

<script>
import { postRequest } from "@/api";

export default {
  name: "RealDigitalForm",
  props: {
    action: {
      type: String,
      default: "#",
    },
    method: {
      type: String,
      default: "GET",
    },
  },
  data() {
    return {
      model: {},
      submitsCount: 0,
      responseFromServer: {},
    };
  },
  methods: {
    onSubmitEvent(e) {
      e.preventDefault();
      this.$emit("submit-form");
    },
    setChildModel(key, child) {
      this.model[key] = child;
    },
    preSubmitHandler() {
      for (let prop in this.model) {
        if (!this.model[prop].isValid) {
          this.submitsCount = 0;
        }
      }

      this.submitsCount += 1;

      if (Object.keys(this.model).length === this.submitsCount) {
        this.onSubmitHandler(this.model);
        this.submitsCount = 0;
      }
    },
    onSubmitHandler(model) {
      let body = {};

      for (let key in model) {
        body[key] = model[key].value;
      }

      postRequest(this.action, body).then((data) => {
        this.responseFromServer = data.json;
        this.$emit("clear-form");
      });
    },
  },
};
</script>

<style scoped>
.form-response {
  width: 100%;
  max-width: 300px;
  margin-bottom: 10px;
}
</style>
