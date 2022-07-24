<template>
  <div class="form-textfield">
    <label class="form-textfield-label" :for="`${name}_id`"> {{ textFieldLabel }}: </label>
    <input :ref="name" v-model="model" class="form-textfield-input" type="text" :id="`${name}_id`" :name="`${name}`" />
    <p v-if="validationError" class="form-textfield-message error">Validation error</p>
  </div>
</template>

<script>
export default {
  name: "RealDigitalTextfield",
  props: {
    name: {
      type: String,
      required: true,
    },
    validation: {
      type: String,
    },
  },
  computed: {
    textFieldLabel() {
      return this.name.substring(0, 1).toUpperCase() + this.name.substring(1);
    },
    validatorExpression() {
      return this.validation && new RegExp(this.validation);
    },
  },
  data() {
    return {
      model: "",
      validationError: false,
    };
  },
  mounted() {
    this.$parent.$on("submit-form", () => {
      let isModelValid = this.isValid(this.model);

      this.exportModel();

      if (!isModelValid) {
        this.validationError = true;
        return;
      }

      this.validationError = false;
      this.$parent.preSubmitHandler();
    });

    this.$parent.$on("clear-form", () => {
      this.model = "";
      this.validationError = false;
    });

    this.exportModel();
  },
  methods: {
    isValid(value) {
      return this.validatorExpression ? this.validatorExpression.test(value) : true;
    },
    exportModel() {
      this.$parent.setChildModel(this.name, {
        name: this.name,
        value: this.model,
        isValid: this.isValid(this.model),
      });
    },
  },
};
</script>

<style scoped>
.form-textfield {
  text-align: left;
  margin-bottom: 20px;
  width: 300px;
}
.form-textfield-message {
  margin-top: 5px;
  font-size: 0.88em;
}
.form-textfield-input {
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 5px;
  border: #888 1px solid;
  border-radius: 3px;
}
.error {
  color: red;
}
</style>
