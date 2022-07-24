import { shallowMount, mount } from "@vue/test-utils";
import RealDigitalForm from "@/components/RealDigitalForm.vue";
import RealDigitalTextfield from "@/components/RealDigitalTextfield.vue";
import RealDigitalButton from "@/components/RealDigitalButton.vue";

describe("RealDigitalForm.vue", () => {
  it("renders form with props", () => {
    const formComponent = shallowMount(RealDigitalForm, {
      propsData: {
        action: "/path",
        method: "POST",
      },
    });
    expect(formComponent).toBeDefined();
    expect(formComponent.find("#real-digital-form").attributes("action")).toBe("/path");
    expect(formComponent.find("#real-digital-form").attributes("method")).toBe("POST");
  });

  it("renders with slots", () => {
    const formComponent = shallowMount(RealDigitalForm, {
      propsData: {
        action: "/path",
        method: "POST",
      },
      slots: {
        default: ["<input name='name' />", "<input name='phone' />"],
      },
    });
    expect(formComponent.find("input[name='name']").exists()).toBe(true);
    expect(formComponent.find("input[name='phone']").exists()).toBe(true);
  });
});

describe("RealDigitalTextfield.vue", () => {
  it("renders component properly", () => {
    const textFieldComponent = shallowMount(RealDigitalTextfield, {
      propsData: {
        name: "some_name",
      },
      parentComponent: RealDigitalForm,
    });
    textFieldComponent.vm.$parent = jest.fn();
    expect(textFieldComponent.find(".form-textfield-input").element.tagName).toBe("INPUT");
  });

  it("renders attribute name when passed", () => {
    const textFieldComponent = shallowMount(RealDigitalTextfield, {
      propsData: {
        name: "some_name",
      },
      parentComponent: RealDigitalForm,
    });
    textFieldComponent.vm.$parent = jest.fn();
    expect(textFieldComponent.find(".form-textfield-input").attributes("name")).toBe("some_name");
  });

  it("validation criteria is active when passed", () => {
    const textFieldComponent = shallowMount(RealDigitalTextfield, {
      propsData: {
        name: "some_name",
        validation: "[a-z]+",
      },
      parentComponent: RealDigitalForm,
    });
    textFieldComponent.vm.$parent = jest.fn();
    expect(typeof textFieldComponent.vm.validatorExpression).toBe("object");
  });

  it("validation function works properly", () => {
    const textFieldComponent = shallowMount(RealDigitalTextfield, {
      propsData: {
        name: "some_name",
        validation: "[a-z]+",
      },
      parentComponent: RealDigitalForm,
    });
    expect(textFieldComponent.vm.isValid("some string")).toBeTruthy();
    expect(textFieldComponent.vm.isValid("123")).toBeFalsy();
  });
});

describe("RealDigitalButton.vue", () => {
  it("renders text when slot passed", () => {
    const buttonComponent = mount(RealDigitalButton, {
      slots: {
        default: "Some button text",
      },
    });
    expect(buttonComponent.text()).toMatch("Some button text");
  });
});
